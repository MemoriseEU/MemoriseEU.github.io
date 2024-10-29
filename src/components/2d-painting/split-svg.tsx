import React, {
  useRef,
  useEffect,
  useState,
  Ref,
  MutableRefObject,
  RefObject,
} from "react";

interface SplitSVGProps {
  svgContainerRef: RefObject<HTMLDivElement>;
  layerID: string;
}

const SplitSvg = (props: SplitSVGProps) => {
  const { svgContainerRef, layerID } = props;

  const [layerSvgs, setLayerSvgs] = useState<Array<React.JSX.Element>>([]);

  useEffect(() => {
    if (svgContainerRef != null && svgContainerRef.current) {
      const svgElement = svgContainerRef.current.querySelector("svg");
      splitSvgIntoLayers(svgElement as SVGElement);
    }
  }, [svgContainerRef]);

  const splitSvgIntoLayers = (svg: SVGElement) => {
    const layers = Array.from(svg.children);
    const layerSvgs = layers
      .filter((e) => {
        return e.id === layerID;
      })
      .map((layer, index) =>
        createSvgFromLayer(svg, layer as SVGElement, index)
      );
    setLayerSvgs(layerSvgs);
  };

  const createSvgFromLayer = (
    originalSvg: SVGElement,
    layer: SVGElement,
    index: number
  ) => {
    // Create a new SVG element
    const newSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    // Copy the width, height, and viewBox from the original SVG
    newSvg.setAttribute("width", "auto");
    newSvg.setAttribute("height", "100%");
    newSvg.setAttribute(
      "viewBox",
      originalSvg.getAttribute("viewBox") as string
    );

    // Append a cloned layer to the new SVG
    const clonedNode = layer.cloneNode(true) as Element;
    clonedNode.id = `copy-${clonedNode.id}`;
    newSvg.appendChild(clonedNode);

    // Convert the SVG to a React-compatible JSX component
    const svgMarkup = new XMLSerializer().serializeToString(newSvg);
    return (
      <div
        className="h-full w-fit bg-white"
        key={index}
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
    );
  };

  return <>{layerSvgs}</>;
};

export default SplitSvg;
