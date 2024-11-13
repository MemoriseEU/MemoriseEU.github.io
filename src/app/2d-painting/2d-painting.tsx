"use client";

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MySVG from "../../../public/assets/Ervin Abadi B-B View final2_70dpi.svg";
import explorationDataEn from "../locales/en/translation.json";
import { PaintingContext } from "./painting.context";
import shortid from "shortid";
import { useTranslation } from "react-i18next";

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

const storyPathMapping = {
  kitchen: "path239",
  fences: "g231",
  food: "path239",
  watchtower: "path307",
  guards: "path331",
  barracks: "path139",
  inmates: "g253",
} as Record<string, string>;

const pathStoryMapping = {
  path239: "kitchen",
  g231: "fences",
  // food: "path10",
  g790: "watchtower: ",
  g798: "guards",
  g151: "barracks",
  g253: "inmates",
} as Record<string, string>;

export default function Painting() {
  const svgRef = useRef(null);
  const paintingContext = useContext(PaintingContext);
  const [paintingSizeByWidth, setPaintingSizeByWidth] =
    useState<boolean>(false);

  const { i18n } = useTranslation();

  const explorationData = useMemo(() => {
    return explorationDataEn["detail-mode"];
  }, [explorationDataEn]);

  // Zoom function
  const zoomToElement = (elementId: string) => {
    if (svgRef.current != null) {
      const svg = (svgRef.current as SVGGraphicsElement).querySelector("svg");
      const element = document.getElementById(elementId) as unknown;

      if (element != null && svg) {
        const bbox = (element as SVGGraphicsElement).getBBox();
        const padding =
          (parseInt(svg.getAttribute("width") as string) / 100) * 15;

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

      const images = (svgRef.current as SVGSVGElement).querySelectorAll(
        "image"
      );

      const clickHandler = (e: Event) => {
        e.stopImmediatePropagation();
        if (
          paintingContext!.mode === "exploration" ||
          paintingContext!.mode === "detail"
        ) {
          if (e.target != null) {
            const clickedID = (e.target as HTMLElement).id;
            const groupID = (
              (e.target as HTMLElement).parentElement as HTMLElement
            ).id;

            zoomToElement(clickedID);
            paintingContext?.updateMode("detail");

            if (Object.keys(pathStoryMapping).includes(clickedID)) {
              paintingContext!.updateStoryElement(pathStoryMapping[clickedID]);
            }

            if (Object.keys(pathStoryMapping).includes(groupID)) {
              paintingContext!.updateStoryElement(pathStoryMapping[groupID]);
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
  }, [paintingContext?.mode, explorationData]);

  useEffect(() => {
    if (paintingContext?.mode === "exploration") {
      resetView();
    } else if (
      paintingContext?.mode === "story" &&
      paintingContext?.storyElement != null
    ) {
      zoomToElement(storyPathMapping[paintingContext?.storyElement as string]);
    }
  }, [paintingContext?.storyElement, paintingContext?.mode]);

  const getId = () => {
    const id = shortid.generate();
    return id;
  };

  const pointerLine = useMemo(() => {
    if (
      paintingContext?.mode === "story" &&
      paintingContext?.storyElement != null
    ) {
      return (
        <div
          key={`pointer-${getId()}-story`}
          className="absolute h-[5px] w-1/2 top-1/2 z-50 translate-x-[200%] reveal"
        ></div>
      );
    } else if (paintingContext?.mode === "detail") {
      return (
        <div
          key={`pointer-${getId()}-detail`}
          className="absolute h-[5px] w-1/2 top-1/2 z-50 translate-x-[50%] reveal"
        ></div>
      );
    } else {
      return <></>;
    }
  }, [paintingContext?.mode, paintingContext?.storyElement]);

  useEffect(() => {
    function handleResize() {
      if (svgRef.current != null) {
        const htmlEl = svgRef.current as HTMLElement;
        if (htmlEl.clientWidth > htmlEl.clientHeight) {
          if (paintingSizeByWidth === true) {
            setPaintingSizeByWidth(false);
          }
        } else {
          if (paintingSizeByWidth === false) {
            setPaintingSizeByWidth(true);
          }
        }
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [svgRef, paintingSizeByWidth]);

  return (
    <div
      ref={svgRef}
      className="size-full flex justify-center resize-none relative"
    >
      <MySVG
        className={`absolute painting size-full ${
          paintingContext?.mode === "default"
            ? "cursor-pointer"
            : "cursor-default"
        } ${
          paintingContext?.mode === "composition" ? "" : "animated"
        } object-contain`}
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
