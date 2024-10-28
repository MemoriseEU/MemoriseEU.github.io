"use client";

import { useContext } from "react";
import { PaintingContext } from "./painting.context";

export default function ButtonRow() {
  const paintingContext = useContext(PaintingContext);

  return (
    <div className="flex justify-center">
      <div className="flex gap-2 p-2">
        {paintingContext?.mode !== "default" && (
          <button
            className="border border-gray-700 bg-red-500 p-1"
            onClick={() => {
              paintingContext?.updateText("");
              if (paintingContext?.mode === "detail") {
                paintingContext?.updateMode("exploration");
                paintingContext?.updateText("Exploration Mode");
              } else {
                paintingContext?.updateMode("default");
              }
            }}
          >
            Back
          </button>
        )}

        {paintingContext?.mode === "default" && (
          <button
            className="border border-gray-700 bg-orange-400 p-1"
            onClick={() => {
              paintingContext?.updateText("Exploration Mode");
              paintingContext?.updateMode("exploration");
            }}
          >
            Exploration
          </button>
        )}
        {paintingContext?.mode === "default" && (
          <button
            className="border border-gray-700 bg-orange-400 p-1"
            onClick={() => {
              paintingContext?.updateText("Composition Mode");
              paintingContext?.updateMode("composition");
            }}
          >
            Composition
          </button>
        )}
        {paintingContext?.mode === "default" && (
          <button
            className="border border-gray-700 bg-orange-400 p-1"
            onClick={() => {
              paintingContext?.updateText(
                "This is the long long long about text."
              );
              paintingContext?.updateMode("about");
            }}
          >
            About
          </button>
        )}
      </div>
    </div>
  );
}
