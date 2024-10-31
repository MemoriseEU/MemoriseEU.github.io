"use client";

import { ReactNode, useContext } from "react";
import { PaintingContext } from "./painting.context";
import Image from "next/image";

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  imageIndex?: number;
  color?: "orange" | "red" | "blue";
}

export const buttonImages = [
  "/assets/orangeStroke.png",
  "/assets/orangeStroke2.png",
  "/assets/orangeStroke3.png",
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
      className="strokeButton p-1 px-4 rounded-md relative text-[#3d322b] stroke-animation"
      onClick={onClick}
    >
      <Image
        alt="orange brush smudge"
        src={buttonImages[imageIndex]}
        fill={true}
        className="z-[-1]"
        style={{ filter: colorTrans[color] }}
      />
      {children}
    </button>
  );
}

export default function ButtonRow() {
  const paintingContext = useContext(PaintingContext);

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex gap-6 p-2 flex-row">
        {paintingContext?.mode !== "default" && (
          <Button
            onClick={() => {
              paintingContext?.updateText("");
              if (paintingContext?.mode === "detail") {
                paintingContext?.updateMode("exploration");
                paintingContext?.updateText(
                  "Click on one of the shining elements in the painting to find out more about them!",
                  "Exploration Mode"
                );
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
              paintingContext?.updateText(
                "Click on one of the shining elements in the painting to find out more about them!",
                "Exploration Mode"
              );
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
              paintingContext?.updateText(
                "Click on the different layers of the painting to hide or show them and experience how they effect the painting!",
                "Composition Mode"
              );
              paintingContext?.updateMode("composition");
            }}
            imageIndex={1}
          >
            Composition
          </Button>
        )}
        {paintingContext?.mode === "default" && (
          <Button
            onClick={() => {
              paintingContext?.updateText("Scroll!", "Story Mode");
              paintingContext?.updateMode("story");
            }}
            imageIndex={1}
          >
            Story
          </Button>
        )}
        {paintingContext?.mode === "default" && (
          <Button
            imageIndex={0}
            onClick={() => {
              paintingContext?.updateText(
                "The interactive prisoner art explorer allows you to inspect details in Ervin Abadi‘s painting Bergen-Belsen View from Afar. You can choose between two modes. The compositional mode enables you to examine the different layers and helps to understand the spatial composition of the painting and the visual elements it contains. In the explorative mode you can touch certain elements of the painting and retrieve related information. Particular figures and objects refer to aspects of everyday life in Bergen-Belsen that shaped the situation and fate of the prisoners. Please note that not all elements are interactive. In addition, short digital videos explain other aspects of life and suffering in the Bergen-Belsen concentration camp in relation to prisoner art. Short digital videos provide a compelling way to communicate history by transforming sources like paintings, diaries, and letters into accessible, engaging content. This approach not only deepens engagement with the past but also ensures that complex narratives are presented in ways that resonate with today’s digitally-driven world, particularly for younger, digital-native generations.",
                "About"
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
