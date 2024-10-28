import { assert } from "@stefanprobst/assert";
import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";

export type Mode =
  | "exploration"
  | "composition"
  | "about"
  | "detail"
  | "default"
  | "movie";

export interface PaintingContextType {
  mode: Mode | null;
  updateMode: (m: Mode | null) => void;
  text: string | null;
  updateText: (t: string | null) => void;
  image: string | null;
  updateImage: (i: string | null) => void;
}

interface PaintingProviderProps {
  children: ReactNode;
}

export const PaintingContext = createContext<PaintingContextType | null>(null);

export function PaintingProvider(props: PaintingProviderProps): JSX.Element {
  const { children } = props;
  const [mode, setMode] = useState<Mode | null>("default");
  const [text, setText] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const value = useMemo(() => {
    const updateMode = (mode: Mode | null) => {
      setMode(mode);
    };

    const updateText = (t: string | null) => {
      setText(t);
    };

    const updateImage = (i: string | null) => {
      setImage(i);
    };

    return { mode, updateMode, text, updateText, image, updateImage };
  }, [mode, text, image]);

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
