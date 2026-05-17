import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './ArticleHistoryModal.module.scss';
import { FiX, FiTerminal, FiChevronDown, FiChevronUp, FiRotateCcw } from 'react-icons/fi';

import useEditArticleStore from '@/store/useEditArticleStore';
import useSingleArticleStore from '@/store/useSingleArticleStore';

const ArticleHistoryModal = ({ isOpen, onClose, history = [] }) => {
    // Стейт для відкриття деталей конкретного коміту
    const [expandedId, setExpandedId] = useState(null);

    if (!isOpen) return null;

    const sortedHistory = [...history].sort(
        (a, b) => new Date(b.dataRedaction) - new Date(a.dataRedaction)
    );

    // 1. ОТРИМУЄМО ПОТОЧНИЙ СТАН СТАТТІ ЗІ СТОРА ОДИН РАЗ НА ПОЧАТКУ
    const currentArticleContent = useSingleArticleStore.getState().article?.content || [];
    const currentContentStr = JSON.stringify(currentArticleContent);

    // 2. 🔥 ШУКАЄМО ТІЛЬКИ ОДИН НАЙСВІЖІШИЙ КОМІТ, ЩО ЗБІГАЄТЬСЯ З ПОТОЧНИМ СТАНОМ
    const activeCommit = sortedHistory.find(
        (edit) => JSON.stringify(edit.contentAfter?.content) === currentContentStr
    );
    const currentVersionId = activeCommit ? activeCommit.id : null;

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleRestore = (edit) => {
        const confirmRestore = window.confirm(
            "[ SYSTEM_WARNING ]\nВи дійсно хочете відкотитися до цієї версії?\nУсі поточні незбережені зміни в редакторі будуть замінені."
        );

        if (confirmRestore) {
            const pastData = edit.contentAfter;

            // 1. Відновлюємо категорії та посилання у сторі редагування
            useEditArticleStore.getState().setCategories(pastData.categories || []);
            useEditArticleStore.getState().setReferences(pastData.references || []);

            // 2. Відновлюємо контент (текст/медіа) у головному "мозку" статті
            const currentArticle = useSingleArticleStore.getState().article;

            useSingleArticleStore.setState({
                article: {
                    ...currentArticle,
                    content: pastData.content || [],
                    categories: pastData.categories || [],
                    references: pastData.references || []
                }
            });

            alert("✅ ДАНІ ВІДНОВЛЕНО!\nПеревірте поля редактора. Щоб застосувати ці зміни назавжди, натисніть 'Save' на головній панелі.");

            // Закриваємо модалку, щоб юзер побачив відновлений текст
            onClose();
        }
    };

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

                <div className={styles.header}>
                    <h3 className={styles.title}>
                        <FiTerminal className={styles.icon} /> [ EDIT_HISTORY ]
                    </h3>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <FiX size={20} />
                    </button>
                </div>

                <div className={styles.content}>
                    {sortedHistory.length === 0 ? (
                        <div className={styles.empty}>// No previous found.</div>
                    ) : (

                        <div className={styles.timeline} >
                            {sortedHistory.map((edit, index) => {
                                const dateObj = new Date(edit.dataRedaction);
                                const formattedDate = dateObj.toLocaleDateString('uk-UA');
                                const formattedTime = dateObj.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
                                const avatarUrl = edit.redactedBy?.avatar?.url || `https://ui-avatars.com/api/?name=${edit.redactedBy?.name || 'U'}&background=00e87a&color=111114`;

                                const isExpanded = expandedId === edit.id;

                                // 3. 🎯 ЗМІНЕНО: Тепер перевірка йде строго за унікальним ID
                                const isCurrentVersion = edit.id === currentVersionId;

                                // === РАХУЄМО РІЗНИЦЮ ===
                                const titleChanged = edit.titleBefore !== edit.titleAfter;
                                const contentBefore = edit.contentBefore?.content || [];
                                const contentAfter = edit.contentAfter?.content || [];

                                const textBefore = contentBefore.filter(b => b.type === 'section');
                                const textAfter = contentAfter.filter(b => b.type === 'section');
                                const textChanged = JSON.stringify(textBefore) !== JSON.stringify(textAfter);

                                const mediaBefore = contentBefore.filter(b => b.type === 'image' || b.type === 'slider');
                                const mediaAfter = contentAfter.filter(b => b.type === 'image' || b.type === 'slider');
                                const mediaChanged = JSON.stringify(mediaBefore) !== JSON.stringify(mediaAfter);

                                const catsBefore = edit.contentBefore?.categories?.length || 0;
                                const catsAfter = edit.contentAfter?.categories?.length || 0;
                                const catsChanged = JSON.stringify(edit.contentBefore?.categories) !== JSON.stringify(edit.contentAfter?.categories);

                                const refsBefore = edit.contentBefore?.references?.length || 0;
                                const refsAfter = edit.contentAfter?.references?.length || 0;
                                const refsChanged = JSON.stringify(edit.contentBefore?.references) !== JSON.stringify(edit.contentAfter?.references);

                                return (
                                    <div key={edit.id} className={styles.timelineItem}>
                                        {/* 👇 Якщо коміт поточний — підсвічуємо саму точку на таймлайні */}
                                        <div className={`${styles.timelineDot} ${isCurrentVersion ? styles.currentDot : ''}`}></div>

                                        {/* 👇 Якщо коміт поточний — додаємо зелену рамку на всю картку */}
                                        <div className={`${styles.editCard} ${isExpanded ? styles.expandedCard : ''} ${isCurrentVersion ? styles.currentCard : ''}`}>

                                            <div className={styles.cardHeader} onClick={() => toggleExpand(edit.id)}>
                                                <img src={avatarUrl} alt={edit.redactedBy?.name} className={styles.avatar} />
                                                <div className={styles.editInfo}>
                                                    <p className={styles.authorName}>
                                                        {edit.redactedBy?.name}
                                                        {/* 👇 Поруч з іменем виводимо хакерський бейдж */}
                                                        {isCurrentVersion && <span className={styles.currentBadge}>[ CURRENT ]</span>}
                                                    </p>
                                                    <p className={styles.editDate}>{formattedDate} @ {formattedTime}</p>
                                                </div>
                                                <div className={styles.expandIcon}>
                                                    {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                                                </div>
                                            </div>

                                            {isExpanded && (
                                                <div className={styles.cardDetails}>
                                                    <div className={styles.diffSection}>
                                                        <p className={styles.diffLabel}>CHANGELOG:</p>
                                                        <ul className={styles.diffList}>
                                                            {titleChanged && (
                                                                <li>
                                                                    <span style={{ color: '#888' }}>TITLE:</span><br />
                                                                    <span className={styles.removed}>- {edit.titleBefore}</span><br />
                                                                    <span className={styles.added}>+ {edit.titleAfter}</span>
                                                                </li>
                                                            )}

                                                            {textChanged && (
                                                                <li>
                                                                    <span style={{ color: '#888' }}>TEXT BLOCKS:</span> {textBefore.length} <span className={styles.arrow}>→</span> {textAfter.length}
                                                                    {textBefore.length === textAfter.length && <span style={{ color: '#00e87a', marginLeft: '5px' }}>(modified)</span>}
                                                                </li>
                                                            )}

                                                            {mediaChanged && (
                                                                <li>
                                                                    <span style={{ color: '#888' }}>MEDIA BLOCKS:</span> {mediaBefore.length} <span className={styles.arrow}>→</span> {mediaAfter.length}
                                                                    {mediaBefore.length === mediaAfter.length && <span style={{ color: '#00e87a', marginLeft: '5px' }}>(modified)</span>}
                                                                </li>
                                                            )}

                                                            {catsChanged && (
                                                                <li>
                                                                    <span style={{ color: '#888' }}>CATEGORIES:</span> {catsBefore} <span className={styles.arrow}>→</span> {catsAfter}
                                                                </li>
                                                            )}

                                                            {refsChanged && (
                                                                <li>
                                                                    <span style={{ color: '#888' }}>REFERENCES:</span> {refsBefore} <span className={styles.arrow}>→</span> {refsAfter}
                                                                </li>
                                                            )}

                                                            {!titleChanged && !textChanged && !mediaChanged && !catsChanged && !refsChanged && (
                                                                <li>
                                                                    <span style={{ color: '#888' }}>MINOR FIXES</span> (formatting, invisible changes)
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>

                                                    {/* 👇 Кнопку Restore ховаємо, якщо ця версія вже активована в редакторі */}
                                                    {!isCurrentVersion ? (
                                                        <button
                                                            className={styles.restoreBtn}
                                                            onClick={() => handleRestore(edit)}
                                                        >
                                                            <FiRotateCcw /> RESTORE THIS VERSION
                                                        </button>
                                                    ) : (
                                                        <div className={styles.currentActiveLabel}>
                                                            // THIS VERSION IS CURRENTLY ACTIVE
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ArticleHistoryModal;