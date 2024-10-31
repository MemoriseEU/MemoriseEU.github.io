"use client";

import { useContext, useEffect, useMemo, useRef } from "react";
import MySVG from "../../../public/assets/people.svg";
import explorationData from "./explorationData";
import { PaintingContext } from "./painting.context";
import shortid from "shortid";

const pathMapping = [
  "path34",
  "path32",
  "path30",
  "path14",
  "path22",
  "path24",
  "path26",
  "path18",
  "path20",
  "path16",
  "path36",
  "path46",
  "path40",
  "path44",
  "path42",
  "path38",
  "path12",
  "path10",
];

const pathStoryMapping = {
  kitchen: "path30",
  fences: "path14",
  food: "path10",
  watchtower: "path38",
  guards: "path20",
  barracks: "path34",
  inmates: "path26",
} as Record<string, string>;

export default function Painting() {
  const svgRef = useRef(null);
  const paintingContext = useContext(PaintingContext);

  // Zoom function
  const zoomToElement = (elementId: string) => {
    if (svgRef.current != null) {
      const svg = (svgRef.current as SVGGraphicsElement).querySelector("svg");
      const element = document.getElementById(elementId) as unknown;

      if (element != null && svg) {
        const bbox = (element as SVGGraphicsElement).getBBox();
        const padding = 35;

        const x = bbox.x - padding;
        const y = bbox.y - padding;
        const width = bbox.width + 2 * padding;
        const height = bbox.height + 2 * padding;

        animateViewBox(svg, getViewBoxArray(svg), [x, y, width, height], 500);
      }
    }
  };

  const resetView = () => {
    if (svgRef.current != null) {
      const svg = (svgRef.current as SVGGraphicsElement).querySelector("svg");
      if (svg != null) {
        const width = svg.getBBox().width;
        const height = svg.getBBox().height;
        animateViewBox(svg, getViewBoxArray(svg), [0, 0, width, height], 500);
      }
    }
  };

  // Helper functions for viewBox animation
  const getViewBoxArray = (svg: SVGSVGElement) => {
    if (svg != null) {
      return svg.getAttribute("viewBox")!.split(" ").map(Number);
    }
  };

  const animateViewBox = (
    svg: SVGSVGElement,
    startViewBox: any,
    endViewBox: any,
    duration: any
  ) => {
    let startTime: number | null = null;

    const animateStep = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const currentViewBox = startViewBox.map(
        (start: number, i: number) => start + (endViewBox[i] - start) * progress
      );

      svg.setAttribute("viewBox", currentViewBox.join(" "));

      if (progress < 1) {
        requestAnimationFrame(animateStep);
      }
    };

    requestAnimationFrame(animateStep);
  };

  useEffect(() => {
    if (svgRef.current) {
      const circleElements = (svgRef.current as SVGSVGElement).querySelectorAll(
        ".cls-1"
      );

      const clickHandler = (e: Event) => {
        e.stopImmediatePropagation();
        if (
          paintingContext!.mode === "exploration" ||
          paintingContext!.mode === "detail"
        ) {
          if (e.target != null) {
            const clickedID = (e.target as HTMLElement).id;
            zoomToElement(clickedID);
            paintingContext?.updateMode("detail");

            if (pathMapping.includes(clickedID)) {
              paintingContext?.updateText(
                explorationData["inmates"].text,
                explorationData["inmates"].title
              );
            }
          }
        } else if (paintingContext?.mode === "default") {
          paintingContext.updateMode("exploration");
        }
      };

      if (circleElements) {
        circleElements.forEach((element) => {
          element.addEventListener("click", clickHandler);
        });
      }

      // Cleanup listeners on unmount
      return () => {
        if (circleElements) {
          circleElements.forEach((element) => {
            element.removeEventListener("click", clickHandler);
          });
        }
      };
    }
  }, [paintingContext?.mode]);

  useEffect(() => {
    if (paintingContext?.mode === "exploration") {
      resetView();
    } else if (
      paintingContext?.mode === "story" &&
      paintingContext?.storyElement != null
    ) {
      zoomToElement(pathStoryMapping[paintingContext?.storyElement as string]);
    }
  }, [paintingContext?.storyElement, paintingContext?.mode]);

  const getId = () => {
    const id = shortid.generate();
    return id;
  };

  const pointerLine = useMemo(() => {
    if (
      paintingContext?.mode === "detail" ||
      (paintingContext?.mode === "story" &&
        paintingContext?.storyElement != null)
    ) {
      return (
        <div
          key={`pointer-${getId()}`}
          className="absolute h-[2px] w-1/2 top-1/2 z-50 translate-x-[200%] reveal"
        ></div>
      );
    } else {
      return <></>;
    }
  }, [paintingContext?.mode, paintingContext?.storyElement]);

  return (
    <div ref={svgRef} className="size-full flex p-2 justify-center resize-none">
      <MySVG
        className={`h-full w-auto ${
          paintingContext?.mode === "default"
            ? "cursor-pointer"
            : "cursor-default"
        } ${paintingContext?.mode === "composition" ? "" : "animated"}`}
        onClick={() => {
          if (
            paintingContext?.mode === "default" ||
            paintingContext?.mode === "detail"
          ) {
            paintingContext?.updateMode("exploration");
            paintingContext?.updateText(
              "You are using the explorative mode of the 2D Prisoner Painting Explorer. You can touch the pulsating elements of the painting and retrieve related information. Particular figures and objects refer to aspects of everyday life in Bergen-Belsen that shaped the situation and fate of the prisoners. Please note that not all elements are interactive.",
              "Exploration Mode"
            );
          }
        }}
      />
      {pointerLine}
    </div>
  );
}
