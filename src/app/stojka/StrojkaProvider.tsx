import { assert } from "@stefanprobst/assert";
import type { ReactNode, Ref } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { Pane } from "./strojka-content";
import type { JSX } from "react";

export interface StrojkaContextType {
  pane: Pane | null;
  updatePane: (p: Pane) => void;
}

interface StrojkaProviderProps {
  children: ReactNode;
}

export const StrojkaContext = createContext<StrojkaContextType | null>(null);

export function StrojkaProvider(props: StrojkaProviderProps): JSX.Element {
  const { children } = props;
  const [pane, setPane] = useState<Pane | null>("start");

  const value = useMemo(() => {
    const updatePane = (pane: Pane | null) => {
      setPane(pane);
    };

    return {
      pane,
      updatePane,
    };
  }, [pane]);

  return (
    <StrojkaContext.Provider value={value}>{children}</StrojkaContext.Provider>
  );
}

export function usePaintingState() {
  const value = useContext(StrojkaContext);
  assert(value != null, "missing strojka provider");
  return value;
}
