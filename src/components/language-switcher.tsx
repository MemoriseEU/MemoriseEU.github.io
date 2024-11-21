"use client";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import { useState } from "react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const [isGerman, setGerman] = useState(i18n.language === "de");

  const changeLanguage = () => {
    i18n.changeLanguage(isGerman ? "en" : "de");
    setGerman(!isGerman);
  };

  return (
    <div
      className="flex z-[999] cursor-pointer"
      onClick={() => changeLanguage()}
    >
      <ReactCountryFlag
        className="emojiFlag"
        countryCode="DE"
        style={{
          fontSize: "3em",
          lineHeight: "1em",
          opacity: i18n.language === "de" ? 0.75 : 0.25,
          WebkitUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
        }}
        aria-label="Germany"
      />
      <ReactCountryFlag
        className="emojiFlag"
        countryCode="GB"
        style={{
          fontSize: "3em",
          lineHeight: "1em",
          opacity: i18n.language === "en" ? 0.75 : 0.25,
          WebkitUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
        }}
        aria-label="United Kingdom"
      />
    </div>
  );
}
