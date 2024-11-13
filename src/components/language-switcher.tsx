"use client";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import { useState } from "react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="z-[999] cursor-pointer">
      {i18n.language === "de" && (
        <ReactCountryFlag
          className="emojiFlag"
          countryCode="GB"
          style={{
            fontSize: "3em",
            lineHeight: "2em",
            opacity: 0.75,
            "-webkit-user-select": "none",
            "-ms-user-select": "none",
            "user-select": "none",
          }}
          onClick={() => changeLanguage("en")}
          aria-label="United Kingdom"
        />
      )}
      {i18n.language === "en" && (
        <ReactCountryFlag
          className="emojiFlag"
          countryCode="DE"
          style={{
            fontSize: "3em",
            lineHeight: "2em",
            opacity: 0.75,
            "-webkit-user-select": "none",
            "-ms-user-select": "none",
            "user-select": "none",
          }}
          onClick={() => changeLanguage("de")}
          aria-label="Germany"
        />
      )}
    </div>
  );
}
