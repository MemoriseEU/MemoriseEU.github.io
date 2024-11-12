"use client";

import HomeButton from "@/components/home-button";
import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    image: "/assets/ErvinAbadiThumbnail.jpg",
    text: "Erkunde Häftlings-Kunstwerke",
    otherText: "Explore Prisoner Artwork",
    path: "/2d-painting",
  },
  {
    image: "/assets/stojkaThumbnail.jpeg",
    text: "Ceija Stojkas Gemälde",
    otherText: "Ceija Stojka's Paintings",
    path: "/stojka",
  },
];

export default function Stojka() {
  return (
    <>
      <div className="grid h-full max-h-full w-full grid-flow-row grid-rows-[auto,1fr,auto] gap-4 p-10"></div>
      <HomeButton />
    </>
  );
}
