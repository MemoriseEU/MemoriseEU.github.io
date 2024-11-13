"use client";

import { ReactNode, useContext } from "react";
import { PaintingContext } from "./painting.context";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  imageIndex?: number;
  color?: "orange" | "red" | "blue";
}

export const buttonImages = [
  "/assets/menu stroke color.png",
  "/assets/menu stroke color1.png",
];

export function Button(props: ButtonProps) {
  const { children, onClick, imageIndex = 0, color = "orange" } = props;

  const colorTrans = {
    red: "hue-rotate(316deg)",
    orange: "none",
    blue: "hue-rotate(180deg)",
  };

  return (
    <button
      className="strokeButton p-2 px-6 rounded-md relative text-[#3d322b] stroke-animation text-lg"
      onClick={onClick}
    >
      <Image
        alt="orange brush smudge"
        src={buttonImages[imageIndex].replace("color", color)}
        fill={true}
        className="z-[-1] opacity-80"
      />
      {children}
    </button>
  );
}

export default function ButtonRow() {
  const paintingContext = useContext(PaintingContext);
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex gap-6 p-2 flex-row">
        {paintingContext?.mode !== "default" && (
          <Button
            onClick={() => {
              paintingContext?.updateText("");
              if (paintingContext?.mode === "detail") {
                paintingContext?.updateMode("exploration");
              } else {
                paintingContext?.updateMode("default");
              }
            }}
            color="red"
          >
            {t("reset")}
          </Button>
        )}
        <Button
          onClick={() => {
            paintingContext?.updateMode("exploration");
          }}
          imageIndex={0}
          color={
            paintingContext?.mode === "exploration" ||
            paintingContext?.mode === "detail"
              ? "blue"
              : "orange"
          }
        >
          {t("exploration")}
        </Button>
        <Button
          onClick={() => {
            paintingContext?.updateMode("composition");
          }}
          imageIndex={1}
          color={paintingContext?.mode === "composition" ? "blue" : "orange"}
        >
          {t("composition")}
        </Button>
        <Button
          onClick={() => {
            paintingContext?.updateText("Scroll!", "Story Mode");
            paintingContext?.updateMode("story");
          }}
          imageIndex={0}
          color={paintingContext?.mode === "story" ? "blue" : "orange"}
        >
          {t("story")}
        </Button>
        <Button
          imageIndex={1}
          color={paintingContext?.mode === "about" ? "blue" : "orange"}
          onClick={() => {
            paintingContext?.updateMode("about");
          }}
        >
          {t("about")}
        </Button>
      </div>
      <svg
        className="svg-filters hidden"
        width="0"
        height="0"
        viewBox="0 0 0 0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.5"
              numOctaves="1"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0"
            />
            <feBlend in="SourceGraphic" mode="overlay" />
            <feComposite in2="SourceAlpha" operator="in" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
