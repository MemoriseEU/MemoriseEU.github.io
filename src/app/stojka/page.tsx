"use client";

import { StrojkaProvider } from "./StrojkaProvider";
import StrojkaContent from "./strojka-content";

export default function Stojka() {
  return (
    <StrojkaProvider>
      <StrojkaContent />
    </StrojkaProvider>
  );
}
