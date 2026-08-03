import { useRef, useEffect } from "react";
import styles from "./AutoTextarea.module.scss";

const AutoTextarea = ({ value, onChange, placeholder = "Напишіть щось..." }) => {
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // 1. Скидаємо висоту на "auto", щоб поле могло зменшитись, якщо користувач видалив текст
      textarea.style.height = "auto";
      
      // 2. Встановлюємо нову висоту, яка дорівнює висоті контенту (scrollHeight)
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Викликаємо функцію перерахунку щоразу, коли змінюється текст
  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      className={styles.autoTextarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={1} // Починаємо з одного рядка
    />
  );
};

export default AutoTextarea;