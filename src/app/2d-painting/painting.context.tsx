import { assert } from "@stefanprobst/assert";
import type { ReactNode, Ref } from "react";
import { createContext, useContext, useMemo, useState } from "react";

export type Mode =
  | "exploration"
  | "composition"
  | "about"
  | "detail"
  | "default"
  | "story"
  | "movie";

export interface PaintingContextType {
  mode: Mode | null;
  updateMode: (m: Mode | null) => void;
  text: string | null;
  title: string | null;
  updateText: (t: string | null, title?: string | null) => void;
  image: string | null;
  updateImage: (i: string | null) => void;
  compositionLayers: Record<string, any>;
  updateCompositionLayers: (cL: Record<string, any>) => void;
  svgRef: Ref<HTMLElement>;
  updateSVGRef: (ref: Ref<HTMLElement>) => void;
  storyElement: string | null;
  updateStoryElement: (el: string | null) => void;
}

interface PaintingProviderProps {
  children: ReactNode;
}

export const PaintingContext = createContext<PaintingContextType | null>(null);

export function PaintingProvider(props: PaintingProviderProps): JSX.Element {
  const { children } = props;
  const [mode, setMode] = useState<Mode | null>("default");
  const [text, setText] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [storyElement, setStoryElement] = useState<string | null>(null);
  const [svgRef, setSVGRef] = useState<Ref<HTMLElement> | null>(null);
  const [compositionLayers, setCompositionLayers] = useState<
    Record<string, any>
  >({});

  const value = useMemo(() => {
    const updateMode = (mode: Mode | null) => {
      setStoryElement(null);
      setMode(mode);
    };

    const updateText = (t: string | null, title: string | null = null) => {
      setText(t);
      setTitle(title);
    };

    const updateImage = (i: string | null) => {
      setImage(i);
    };

    const updateSVGRef = (ref: Ref<HTMLElement> | null) => {
      setSVGRef(ref);
    };

    const updateStoryElement = (el: string | null) => {
      setStoryElement(el);
    };

    const updateCompositionLayers = (cL: Record<string, any>) => {
      setCompositionLayers(cL);
    };

    return {
      mode,
      updateMode,
      text,
      updateText,
      image,
      updateImage,
      title,
      compositionLayers,
      updateCompositionLayers,
      svgRef,
      updateSVGRef,
      storyElement,
      updateStoryElement,
    };
  }, [mode, text, image, title, compositionLayers, svgRef, storyElement]);

  return (
    <PaintingContext.Provider value={value}>
      {children}
    </PaintingContext.Provider>
  );
}

export function usePaintingState() {
  const value = useContext(PaintingContext);
  assert(value != null, "missing painting provider");
  return value;
}
