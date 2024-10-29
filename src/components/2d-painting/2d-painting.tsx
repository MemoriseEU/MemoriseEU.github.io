"use client";

import { useContext, useEffect, useRef } from "react";
import MySVG from "../../../public/assets/people.svg";
import explorationData from "./explorationData";
import { PaintingContext } from "./painting.context";

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
        const padding = 10;

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
    }
  }, [paintingContext?.mode]);

  return (
    <div ref={svgRef} className="size-full flex justify-center p-2">
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
            paintingContext?.updateText("Exploration Mode");
          }
        }}
      />
    </div>
  );
}
