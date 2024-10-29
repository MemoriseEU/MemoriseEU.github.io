"use client";

import { ReactNode, useContext } from "react";
import { PaintingContext } from "./painting.context";
import Image from "next/image";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  imageIndex?: number;
  color?: "orange" | "red";
}

const buttonImages = [
  "/assets/orangeStroke.png",
  "/assets/orangeStroke2.png",
  "/assets/orangeStroke3.png",
];

function Button(props: ButtonProps) {
  const { children, onClick, imageIndex = 0, color = "orange" } = props;

  const colorTrans = { red: "hue-rotate(316deg)", orange: "none" };

  return (
    <button
      className="strokeButton p-1 px-4 rounded-md relative text-[#3d322b]"
      onClick={onClick}
    >
      <Image
        alt="orange brush smudge"
        src={buttonImages[imageIndex]}
        fill={true}
        className="z-[-1] opacity-75"
        style={{ filter: colorTrans[color] }}
      />
      {children}
    </button>
  );
}

export default function ButtonRow() {
  const paintingContext = useContext(PaintingContext);

  return (
    <div className="flex justify-center">
      <div className="flex gap-2 p-2">
        {paintingContext?.mode !== "default" && (
          <Button
            onClick={() => {
              paintingContext?.updateText("");
              if (paintingContext?.mode === "detail") {
                paintingContext?.updateMode("exploration");
                paintingContext?.updateText("Exploration Mode");
              } else {
                paintingContext?.updateMode("default");
              }
            }}
            color="red"
          >
            Back
          </Button>
        )}

        {paintingContext?.mode === "default" && (
          <Button
            onClick={() => {
              paintingContext?.updateText("Exploration Mode");
              paintingContext?.updateMode("exploration");
            }}
            imageIndex={2}
          >
            Exploration
          </Button>
        )}
        {paintingContext?.mode === "default" && (
          <Button
            onClick={() => {
              paintingContext?.updateText("Composition Mode");
              paintingContext?.updateMode("composition");
            }}
            imageIndex={1}
          >
            Composition
          </Button>
        )}
        {paintingContext?.mode === "default" && (
          <Button
            imageIndex={0}
            onClick={() => {
              paintingContext?.updateText(
                "This is the long long long about text."
              );
              paintingContext?.updateMode("about");
            }}
          >
            About
          </Button>
        )}
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
