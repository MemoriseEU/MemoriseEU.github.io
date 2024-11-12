import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import en from "./locales/en/translation.json";
import de from "./locales/de/translation.json";

i18n
  .use(initReactI18next) // Bind react-i18next to i18next
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
    lng: "de", // Default language
    fallbackLng: "de", // Fallback language if a key is missing
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;
