"use client";

import { useContext, useEffect, useRef } from "react";
import MySVG from "../../../public/assets/people.svg";
import { PaintingContext } from "./painting.context";

export default function Painting() {
  const svgRef = useRef(null);
  const paintingContext = useContext(PaintingContext);

  // Zoom function
  const zoomToElement = (elementId) => {
    const svg = svgRef.current.querySelector("svg");
    const element = document.getElementById(elementId);

    const bbox = element.getBBox();
    const padding = 10;

    const x = bbox.x - padding;
    const y = bbox.y - padding;
    const width = bbox.width + 2 * padding;
    const height = bbox.height + 2 * padding;

    animateViewBox(svg, getViewBoxArray(svg), [x, y, width, height], 500);
  };

  const resetView = () => {
    const svg = svgRef.current.querySelector("svg");
    const width = svg.getBBox().width;
    const height = svg.getBBox().height;

    animateViewBox(svg, getViewBoxArray(svg), [0, 0, width, height], 500);
  };

  // Helper functions for viewBox animation
  const getViewBoxArray = (svg) =>
    svg.getAttribute("viewBox").split(" ").map(Number);

  const animateViewBox = (svg, startViewBox, endViewBox, duration) => {
    let startTime = null;

    const animateStep = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const currentViewBox = startViewBox.map(
        (start, i) => start + (endViewBox[i] - start) * progress
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
      if (paintingContext.mode === "exploration") {
        const circleElements = svgRef.current.querySelectorAll(".cls-1");

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
