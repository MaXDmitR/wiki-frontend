import { create } from 'zustand';
import useSingleArticleStore from './useSingleArticleStore';
import useAuthStore from './useAuthStore';

// Допоміжна функція для парсингу HTML (Tiptap) у схему бекенду
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

  // --- ІНІЦІАЛІЗАЦІЯ ДАНИХ (Виправлено для відображення категорій) ---
  initArticleData: (article) => set({
    title: article.title,
    categories: article.categories || [],
    references: article.references || [],
  }),

  setCategories: (cats) => set({ categories: cats }),
  setReferences: (refs) => set({ references: refs }),
  setTextBlocks: (blocks) => set({ textBlocks: blocks }),
  setMediaBlocks: (blocks) => set({ mediaBlocks: blocks }),

  // --- ЗБЕРЕЖЕННЯ СТАТТІ ---
  saveArticle: async () => {
    const { categories, references, textBlocks, mediaBlocks } = get();
    
    // 1. Отримуємо дані про поточного користувача
    const currentUser = useAuthStore.getState().user;
    const originalArticle = useSingleArticleStore.getState().article;
    const finalTitle = originalArticle?.title || "Updated Article";

    // Визначаємо slug з URL
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const slug = pathParts[pathParts.length - 2];

    // Функція для завантаження зображень на Cloudinary
    const uploadImage = async (imgObject) => {
      if (imgObject.url && imgObject.url.startsWith('http') && !imgObject.url.startsWith('blob:')) {
        return { url: imgObject.url, publicId: imgObject.publicId };
      }

      const formData = new FormData();
      if (imgObject.file) {
        formData.append('file', imgObject.file);
      } else {
        const response = await fetch(imgObject.url);
        const blob = await response.blob();
        formData.append('file', blob, 'image.png');
      }

      const res = await fetch('https://wikipedianestjsbackend.onrender.com/media/upload-temp', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload image to Cloudinary");
      const result = await res.json();
      return result.data || result; // Артем повертає дані в полі data
    };

    try {
      console.log("=== STARTING MEDIA PREPARATION AND UPLOAD ===");

      // 1. Обробка медіа-блоків
      const cleanMediaBlocks = await Promise.all(mediaBlocks.map(async (block) => {
        if (block.type === 'slider') {
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
                console.error("SAVE ERROR - Slider upload failed:", e);
                return null;
              }
            })
          );
          const filtered = uploadedImages.filter(img => img !== null);
          return filtered.length > 0 ? { type: 'slider', images: filtered } : null;
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
            console.error("SAVE ERROR - Image upload failed:", e);
            return null;
          }
        }
        return null;
      }));

      // 2. Обробка текстових блоків
      const cleanTextBlocks = textBlocks.map(block => {
        const parsed = parseHtmlToBackendSchema(block.content);
        return {
          type: "section",
          sectionHeader: parsed.sectionHeader || "",
          sectionTexts: parsed.sectionTexts || []
        };
      });

      // 3. ФОРМУЄМО ПЕЙЛОАД (Додано editorId за вимогою Артема)
      const payload = {
        title: finalTitle,
        categories: categories.filter(c => c.trim() !== ""),
        references: references.filter(r => r.trim() !== ""),
        content: [
          ...cleanTextBlocks, 
          ...cleanMediaBlocks.filter(b => b !== null)
        ],
        // 👇 КЛЮЧОВЕ ОНОВЛЕННЯ: Тепер бекенд знає, хто редагує
        editorId: currentUser?.id 
      };

      console.log("SENDING PAYLOAD TO BACKEND:", payload);

      const response = await fetch(`https://wikipedianestjsbackend.onrender.com/article/update/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(Array.isArray(responseData.message) ? responseData.message.join("\n") : responseData.message);
      }

      alert("Article updated successfully! 🎉");
      window.location.href = `/article/${slug}`;

    } catch (error) {
      console.error("SAVE ERROR:", error);
      
      if (error.message.includes('401') || error.message.toLowerCase().includes('unauthorized')) {
          alert("you are not authorized to edit this article. You will be logged out.");
          useAuthStore.getState().logoutUser();
      } else {
          alert(`SAVE ERROR:\n${error.message}`);
      }
    }
  }
}));

export default useEditArticleStore;