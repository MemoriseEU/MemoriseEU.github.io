"use client";

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MySVG from "../../../public/assets/6000px Ervin Abadi Perpective view B-B all duplicated layers 2.svg";
import explorationDataEn from "../locales/en/translation.json";
import { PaintingContext } from "./painting.context";
import shortid from "shortid";
import { useTranslation } from "react-i18next";
import { CursorArrowRaysIcon } from "@heroicons/react/24/outline";
import { usePlausible } from "next-plausible";

const storyPathMapping = {
  kitchen: "path310",
  fences: "g304",
  food: "path319",
  watchtower: "path358",
  guards: "g763",
  barracks: "path230",
  inmates: "g339",
  documentation: "path224",
} as Record<string, string>;

const pathStoryMapping = {
  path310: "kitchen",
  g304: "fences",
  path319: "food",
  guard_tower_centre_Image_copy: "watchtower",
  g763: "guards",
  g242: "barracks",
  g339: "inmates",
  writing_Image_copy: "documentation",
} as Record<string, string>;

export default function Painting() {
  const svgRef = useRef(null);
  const plausible = usePlausible();
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

      const elems = document.querySelectorAll(".highlighted");
      [].forEach.call(elems, function (el) {
        (el as HTMLElement).classList.remove("highlighted");
      });

      if (element != null && svg) {
        (element as HTMLElement).classList.add("highlighted");
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
      const elems = document.querySelectorAll(".highlighted");
      [].forEach.call(elems, function (el) {
        (el as HTMLElement).classList.remove("highlighted");
      });

      const svg = (svgRef.current as SVGGraphicsElement).querySelector("svg");
      if (svg != null) {
        const width = svg.getBBox().width;
        const height = svg.getBBox().height;
        animateViewBox(svg, getViewBoxArray(svg), [0, 0, width, height], 500);
        plausible('paintingResetView', {props: {"time": new Date().toISOString()}});
      }
    }
  };

  // Helper functions for viewBox animation
  const getViewBoxArray = (svg: SVGSVGElement) => {
    if (svg != null) {
      return svg.getAttribute("viewBox")!.split(" ").map(Number);
    }
  };

  const startBlinking = () => {
    const elems = document.querySelectorAll(".cls-2");

    elems.forEach((el, index) => {
      setTimeout(() => {
        (el as HTMLElement).classList.add("fade-stroke-animation");
        setTimeout(() => {
          (el as HTMLElement).classList.remove("fade-stroke-animation");
        }, 1999);
      }, index * 2000);
    });
  };

  const blinkStrokes = () => {
    const elems = document.querySelectorAll(".cls-2");
    /*  console.log(
      Array.from(elems).sort((a, b) => {
        return (
          (a as HTMLElement).getBoundingClientRect().x -
          (b as HTMLElement).getBoundingClientRect().x
        );
      })
    ); */

    Array.from(elems)
      .sort((a, b) => {
        return (
          (a as HTMLElement).getBoundingClientRect().x -
          (b as HTMLElement).getBoundingClientRect().x
        );
      })
      .forEach((el, index) => {
        (el as HTMLElement).classList.remove("fade-stroke-animation");
        setTimeout(function () {
          (el as HTMLElement).classList.add("fade-stroke-animation");
        }, index * 100);
      });
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
        ".cls-2"
      );

      const images = (svgRef.current as SVGSVGElement).querySelectorAll(
        "image"
      );

      /* startBlinking();
      setInterval(
        startBlinking,
        document.querySelectorAll(".cls-2").length * 2000
      );*/

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
              plausible('zoomToPaintingElement', {props: {"element": pathStoryMapping[clickedID], "time": new Date().toISOString()}});
            }
            else if (Object.keys(pathStoryMapping).includes(groupID)) {
              paintingContext!.updateStoryElement(pathStoryMapping[groupID]);
              plausible('zoomToPaintingElement', {props: {"element": pathStoryMapping[groupID], "time": new Date().toISOString()}});
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
      
      plausible('zoomToPaintingElement', {props: {"element": paintingContext?.storyElement as string, "time": new Date().toISOString()}});
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
          className="absolute h-[5px] w-1/2 top-1/2 z-50 reveal"
          // className="absolute h-[5px] w-1/2 top-1/2 z-50 translate-x-[200%] reveal"
        ></div>
      );
    } else if (paintingContext?.mode === "detail") {
      return (
        <div
          key={`pointer-${getId()}-detail`}
          className="absolute h-[5px] w-1/2 top-1/2 z-50 reveal"
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
        className={`painting size-full object-contain absolute ${
          paintingContext?.mode === "default"
            ? "cursor-pointer"
            : "cursor-default"
        }`}
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
          blinkStrokes();
        }}
      />
      {pointerLine}
      {paintingContext?.mode === "default" && (
        <CursorArrowRaysIcon
          width={55}
          height={55}
          className="absolute top-1/4 left-1/2 pointer-events-none"
        />
      )}
    </div>
  );
}
