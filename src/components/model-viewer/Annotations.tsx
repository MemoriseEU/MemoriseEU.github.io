"use client";

/* Core */
import { useEffect, useRef, useState } from "react";
import React from "react";

interface AnnotationsProps {
  setSelectedAnnotation: (index: number) => void;
  selectedAnnotation: number;
}

export const Annotations = (props: AnnotationsProps) => {
  const { selectedAnnotation, setSelectedAnnotation } = props;

  return (
    <div className="annotations">
      <button
        onClick={() => {
          setSelectedAnnotation(selectedAnnotation - 1);
        }}
      >
        {"<"}
      </button>
      {selectedAnnotation}
      <button
        onClick={() => {
          setSelectedAnnotation(selectedAnnotation + 1);
        }}
      >
        {">"}
      </button>
    </div>
  );
};
