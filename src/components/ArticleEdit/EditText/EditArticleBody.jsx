import React, { useState, useEffect, useRef } from 'react';
import styles from './EditArticleBody.module.scss';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import * as TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';

import { useOnClickOutside } from '../../../hooks/useOnClickOutside';

import { useNavigate, useParams } from 'react-router-dom'; // 👈 Додаємо роутер
import { FiX } from 'react-icons/fi'; // 👈 Додаємо іконку хрестика

const TextStyleExtension = TextStyle.TextStyle || TextStyle.default || TextStyle;

const SectionEditor = ({ block, setEditorInstance }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyleExtension,
      Color,
      FontFamily,
    ],
    content: block.content,
  });

  useEffect(() => {
    if (editor) setEditorInstance(editor);
  }, [editor]);

  return <EditorContent editor={editor} className={styles.editor} />;
};

const ReadOnlySection = ({ html, onClick }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyleExtension,
      Color,
      FontFamily,
    ],
    content: html,
    editable: false,
  });

  return (
    <div className={styles.section} onClick={onClick}>
      <EditorContent editor={editor} />
    </div>
  );
};

const EditArticleBody = ({ date, content = [], onChange }) => {

  const navigate = useNavigate();
  const { slug } = useParams();

  const handleCancelExit = () => {
    navigate(`/article/${slug}`);
  };

  const [blocks, setBlocks] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [editor, setEditor] = useState(null);
  const [open, setOpen] = useState(false);

  const fontRef = useRef(null);
  const colorTimeoutRef = useRef(null);

  useOnClickOutside(fontRef, () => {
    setOpen(false);
  });

  useEffect(() => {
    const normalized = content
      .map((b) => {
        const html =
          (b.sectionHeader?.trim()
            ? `<h2>${b.sectionHeader}</h2>`
            : '') +
          (b.sectionTexts || [])
            .map((t) => t?.trim())
            .filter(Boolean)
            .map((t) => `<p>${t}</p>`)
            .join('');

        return {
          id: crypto.randomUUID(),
          content: html,
        };
      })
      .filter((b) => b.content.trim() !== '');

    setBlocks(normalized);
  }, [content]);


  useEffect(() => {
    // Відправляємо тільки якщо blocks дійсно існують і ми маємо onChange
    if (onChange && blocks.length > 0) {
      onChange(blocks);
    }
  }, [blocks, onChange]); // 👈 ДОДАЙ onChange в масив залежностей

  const updateBlock = (id, html) => {
    setBlocks((prev) => {
      const newBlocks = prev.map((b) =>
        b.id === id ? { ...b, content: html } : b
      );




      return newBlocks;
    });
  };

  const addBlock = () => {
    const newBlock = {
      id: crypto.randomUUID(),
      content: '<h2>New title</h2><p>Start writing your text</p>',
    };

    setBlocks((prev) => {
      const updated = [...prev, newBlock];
      setActiveId(newBlock.id);
      return updated;
    });
  };

  const formattedDate = date ? new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '/') : '';

  const fonts = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Courier', value: 'Courier New' },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.dateWrapper}>
        <button 
          className={styles.cancelButtonExit} // 👈 Змінили клас
          onClick={handleCancelExit}          // 👈 Додали onClick
          title="Вийти без збереження"
        >
          <FiX size={18} />
        </button>
        <small className={styles.date}>{formattedDate}</small>
      </div>
      
      {blocks.map((block) => {
        const isActive = activeId === block.id;

        return (
          <div key={block.id} className={styles.sectionWrap}>
            {!isActive && (
              <>
                <ReadOnlySection
                  html={block.content}
                  onClick={() => setActiveId(block.id)}
                />

                <button
                  className={styles.deleteBtn}
                  onClick={() => {
                    setBlocks((prev) =>
                      prev.filter((b) => b.id !== block.id)
                    );

                    if (activeId === block.id) {
                      setActiveId(null);
                      setEditor(null);
                    }
                  }}
                >
                </button>
              </>
            )}

            {isActive && (
              <div className={styles.editorSection}>

                <div className={styles.toolbar}>
                  <button className={styles.prevBtn} onClick={() => editor?.chain().focus().undo().run()}></button>
                  <button className={styles.nextBtn} onClick={() => editor?.chain().focus().redo().run()}></button>

                  <div ref={fontRef} className={`${styles.fontWrapper} ${open ? styles.open : ''}`}>
                    <div
                      className={`${styles.customSelect} ${open ? styles.open : ''}`}
                      onClick={() => setOpen(!open)}
                    >
                      <div className={styles.selected} />

                      {open && (
                        <div className={styles.dropdown}>
                          {fonts.map((font) => (
                            <div
                              key={font.value}
                              className={styles.option}
                              style={{ fontFamily: font.value }}
                              onClick={() => {
                                editor?.chain().focus().setFontFamily(font.value).run();
                                setOpen(false);
                              }}
                            >
                              {font.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.colorWrapper}>
                    <input
                      type="color"
                      className={styles.colorPicker}
                      onChange={(e) => {
                        const newColor = e.target.value; // Зберігаємо колір

                        // Якщо користувач продовжує тягнути повзунок — скасовуємо попередній запис
                        if (colorTimeoutRef.current) {
                          clearTimeout(colorTimeoutRef.current);
                        }

                        // Встановлюємо новий таймер. Tiptap отримає команду лише через 300мс після того, як ти зупиниш мишку
                        colorTimeoutRef.current = setTimeout(() => {
                          editor?.chain().focus().setColor(newColor).run();
                        }, 300);
                      }}
                    />
                  </div>

                  <button className={styles.boldBtn} onClick={() => editor?.chain().focus().toggleBold().run()}></button>
                  <button className={styles.italicsBtn} onClick={() => editor?.chain().focus().toggleItalic().run()}></button>
                  <button className={styles.underLineBtn} onClick={() => editor?.chain().focus().toggleUnderline?.().run()}></button>

                  <button
                    className={styles.deleteBtn}
                    onClick={() => {
                      setBlocks(prev => prev.filter((b) => b.id !== block.id));
                      setActiveId(null);
                      setEditor(null);
                    }}
                  >
                  </button>
                </div>

                <SectionEditor
                  block={block}
                  setEditorInstance={setEditor}
                />

                <div className={styles.buttons}>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => {
                      setActiveId(null);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    className={styles.saveBtn}
                    onClick={() => {
                      updateBlock(block.id, editor.getHTML());
                      setActiveId(null);
                      console.log('HTML:', editor.getHTML());
                      console.log('JSON:', editor.getJSON());
                    }}
                  >
                    Save
                  </button>
                </div>

              </div>
            )}

          </div>
        );
      })}

      <div className={styles.addBlock} onClick={addBlock}>
        +
      </div>
    </div>
  );
};

export default EditArticleBody;