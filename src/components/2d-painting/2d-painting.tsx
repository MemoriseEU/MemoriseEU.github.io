"use client";

import { useContext, useEffect, useRef } from "react";
import MySVG from "../../../public/assets/people.svg";
import { PaintingContext } from "./painting.context";

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
      if (paintingContext!.mode === "exploration") {
        const circleElements = (
          svgRef.current as SVGSVGElement
        ).querySelectorAll(".cls-1");

        if (circleElements) {
          circleElements.forEach((element) => {
            element.addEventListener("click", () => {
              zoomToElement(element.id);
              paintingContext?.updateMode("detail");
              paintingContext?.updateText("Details of the clicked element.");
            });
          });
        }

        // Cleanup listeners on unmount
        return () => {
          if (circleElements) {
            circleElements.forEach((element) => {
              element.removeEventListener("click", () => {});
            });
          }
        };
      }
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
        }`}
        onClick={() => {
          if (paintingContext?.mode === "default") {
            paintingContext?.updateMode("exploration");
            paintingContext?.updateText("Exploration Mode");
          }
        }}
      />
    </div>
  );
}
