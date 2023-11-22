"use client";

/* Core */
import { ReactElement, useEffect, useRef, useState } from "react";
import React from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";

interface AnnotationsProps {
  setSelectedAnnotation: (index: number) => void;
  selectedAnnotation: number;
  children?: ReactElement;
}

export const Annotations = (props: AnnotationsProps) => {
  const { selectedAnnotation, setSelectedAnnotation, children } = props;

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex justify-between w-72 bg-gray-200 rounded-full opacity-50">
        <button
          className="rounded-full bg-gray-300 text-white p-1 hover:bg-gray-500"
          onClick={() => {
            setSelectedAnnotation(selectedAnnotation - 1);
          }}
        >
          <ChevronLeftIcon className="h-6 w-6 stroke-[3px] stroke-white" />
        </button>
        <div className="flex items-center">
          {`${selectedAnnotation + 1}: `}
          {children}
        </div>
        <button
          className="rounded-full bg-gray-300 text-white p-1 hover:bg-gray-500"
          onClick={() => {
            setSelectedAnnotation(selectedAnnotation + 1);
          }}
        >
          <ChevronRightIcon className="h-6 w-6 stroke-[3px] stroke-white" />
        </button>
      </div>
    </div>
  );
};
