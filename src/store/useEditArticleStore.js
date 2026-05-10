import { create } from 'zustand';
import useSingleArticleStore from './useSingleArticleStore';

const parseHtmlToBackendSchema = (htmlContent) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  let sectionHeader = "";
  const sectionTexts = [];
  const h2 = doc.querySelector('h2');
  if (h2) {
    sectionHeader = h2.textContent;
    h2.remove();
  }
  const elements = doc.body.children;
  Array.from(elements).forEach(el => {
    if (el.innerHTML.trim() !== "") {
      sectionTexts.push(el.innerHTML);
    }
  });
  return { type: "section", sectionHeader, sectionTexts };
};

const useEditArticleStore = create((set, get) => ({
  title: '',
  categories: [],
  references: [],
  textBlocks: [],
  mediaBlocks: [],

  initArticleData: (article) => set({
    title: article.title,
    categories: article.categories || [],
    references: article.references || [],
  }),

  setCategories: (cats) => set({ categories: cats }),
  setReferences: (refs) => set({ references: refs }),
  setTextBlocks: (blocks) => set({ textBlocks: blocks }),
  setMediaBlocks: (blocks) => set({ mediaBlocks: blocks }),

  saveArticle: async () => {
    const { categories, references, textBlocks, mediaBlocks } = get();
    const originalArticle = useSingleArticleStore.getState().article;
    const finalTitle = originalArticle?.title || "Оновлена стаття";

    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const slug = pathParts[pathParts.length - 2];

    // --- ФУНКЦІЯ ДЛЯ ЗАВАНТАЖЕННЯ ФАЙЛУ ---
    const uploadImage = async (imgObject) => {
      // Якщо це вже готове посилання на Cloudinary, просто повертаємо його
      if (imgObject.url && imgObject.url.startsWith('http') && !imgObject.url.startsWith('blob:')) {
        return { url: imgObject.url, publicId: imgObject.publicId };
      }

      // Якщо є файл (file) або blob-посилання — відправляємо на сервер
      const formData = new FormData();
      
      // Якщо в об'єкті лежить чистий File, беремо його. 
      // Якщо тільки blob-url, намагаємося перетворити назад у файл (або передати файл, якщо ти його зберіг)
      if (imgObject.file) {
        formData.append('file', imgObject.file);
      } else {
        // Спроба отримати файл з blob посилання, якщо об'єкт File не був переданий
        const response = await fetch(imgObject.url);
        const blob = await response.blob();
        formData.append('file', blob, 'image.png');
      }

      const res = await fetch('https://wikipedianestjsbackend.onrender.com/media/upload-temp', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error("Не вдалося завантажити зображення на Cloudinary");
      return await res.json();
    };

    try {
      console.log("=== ПОЧАТОК ПІДГОТОВКИ ТА ЗАВАНТАЖЕННЯ МЕДІА ===");

      // 1. ПЕРЕРОБЛЯЄМО МЕДІА-БЛОКИ (Завантажуємо нові картинки)
      const cleanMediaBlocks = await Promise.all(mediaBlocks.map(async (block) => {
        if (block.type === 'slider') {
          // Всі картинки в слайдері обробляємо через uploadImage
          const uploadedImages = await Promise.all(
            (block.images || []).map(async (img) => {
              try {
                const uploaded = await uploadImage(img);
                return {
                  url: uploaded.url,
                  publicId: String(uploaded.publicId || ""),
                  title: String(img.label || img.title || "")
                };
              } catch (e) {
                console.error("Помилка при завантаженні картинки слайдера:", e);
                return null;
              }
            })
          );

          const filteredImages = uploadedImages.filter(img => img !== null);
          return filteredImages.length > 0 ? { type: 'slider', images: filteredImages } : null;
        } 
        
        if (block.type === 'image') {
          try {
            const uploaded = await uploadImage(block);
            return {
              type: 'image',
              url: uploaded.url,
              publicId: String(uploaded.publicId || ""),
              title: String(block.title || ""),
              description: String(block.description || "")
            };
          } catch (e) {
            console.error("Помилка при завантаженні поодинокої картинки:", e);
            return null;
          }
        }
        return null;
      }));

      // 2. ЧИСТИМО ТЕКСТ
      const cleanTextBlocks = textBlocks.map(block => {
        const parsed = parseHtmlToBackendSchema(block.content);
        return {
          type: "section",
          sectionHeader: parsed.sectionHeader || "",
          sectionTexts: parsed.sectionTexts || []
        };
      });

      // 3. ФОРМУЄМО ПЕЙЛОАД
      const payload = {
        title: finalTitle,
        categories: categories.filter(c => c.trim() !== ""),
        references: references.filter(r => r.trim() !== ""),
        content: [
          ...cleanTextBlocks, 
          ...cleanMediaBlocks.filter(b => b !== null) // Викидаємо блоки, де не було картинок
        ]
      };

      console.log("ВІДПРАВЛЯЄМО ОНОВЛЕНІ ДАНІ:", payload);

      const response = await fetch(`https://wikipedianestjsbackend.onrender.com/article/update/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(Array.isArray(responseData.message) ? responseData.message.join("\n") : responseData.message);
      }

      alert("Статтю та зображення успішно оновлено! 🎉");
      window.location.href = `/article/${slug}`;

    } catch (error) {
      console.error("SAVE ERROR:", error);
      
      // Якщо бекенд каже, що ми не авторизовані
      if (error.message.includes('401') || error.message.toLowerCase().includes('unauthorized')) {
          alert("Ваша сесія закінчилася. Будь ласка, увійдіть знову.");
          useAuthStore.getState().logoutUser(); // 👈 Викидаємо юзера
      } else {
          alert(`Помилка:\n${error.message}`);
      }
    }
  }
}));

export default useEditArticleStore;