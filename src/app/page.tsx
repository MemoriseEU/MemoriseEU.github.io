"use client";

import { Tube } from "@react-three/drei";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const reactApp = true;

const reactCards = [
  {
    image: "/assets/ErvinAbadiThumbnail.jpg",
    text: "Erkunde Häftlings-Kunstwerke",
    otherText: "Explore Prisoner Artwork",
    path: "/2d-painting",
  },
  {
    image: "/assets/dead.png",
    text: "Ceija Stojkas Gemälde",
    otherText: "Ceija Stojka's Paintings",
    path: "/stojka",
  },
];

const cards = [
  {
    image: "/assets/prisoner-artwork.jpeg",
    text: "Erkunde Gefangenen Kunst",
    otherText: "Explore Prisoner Artwork",
    path: "/artwork-explorer",
  },
  {
    image: "/assets/unheardVoices.png",
    text: "Ungehörte Stimmen",
    otherText: "Unheared Voices",
    path: "/unheard-voices",
  },
  {
    image: "/assets/compare-documents.png",
    text: "Dokumente vergleichen",
    otherText: "Comparative Document Reader",
    path: "/comparative-document-reader",
  },
];

const girdClassString = reactApp
  ? `p-2 gap-10 w-full grid size-full grid-flow-col grid-cols-[repeat(2,_1fr_min-content)]`
  : `p-2 gap-10 w-full grid size-full grid-flow-col grid-cols-[repeat(3,_1fr_min-content)]`;

export default function Home() {
  return (
    <div className="grid h-full max-h-full w-full grid-flow-row grid-rows-[auto,1fr,auto] gap-4 p-10">
      <div className="grid justify-center gap-1">
        <div className="text-center text-5xl">
          {reactApp
            ? "Entdecke Visuelles Erbe"
            : "Entdecke neue digitale Ansätze des Erzählens von Nazi-Verfolgungen"}
        </div>
        <div className="text-center text-4xl ">
          {reactApp
            ? "Explore Visual Heritage"
            : "Discover new digital approaches of storytelling on Nazi persecution"}
        </div>
      </div>
      <div className="flex justify-center items-center h-[80%] p-6 self-center w-full">
        <div className={girdClassString}>
          {(reactApp ? reactCards : cards).map((e, i) => {
            return (
              <Fragment key={`menu-item=${i}`}>
                <Link href={e.path}>
                  <div
                    key={`card-${i}-text`}
                    className="size-full grid grid-rows-[1fr_min-content] shadow-xl"
                  >
                    <div key={`card-${i}-image`} className="size-full relative">
                      <Image
                        src={e.image}
                        alt=""
                        fill={true}
                        style={{
                          padding: "20px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="grid justify-center gap-1 p-5">
                      <div className="text-center text-4xl">{e.text}</div>
                      <div className="text-center text-3xl text-gray-700">
                        {e.otherText}
                      </div>
                    </div>
                  </div>
                </Link>
                {i < (reactApp ? reactCards : cards).length - 1 && (
                  <div className="border border-slate-500 h-[105%]"></div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
      <div>
        <div className="grid justify-center gap-1">
          <div className="text-center text-4xl">Zum Starten auswählen</div>
          <div className="text-center text-3xl text-gray-700">
            Select to begin
          </div>
        </div>
      </div>
    </div>
  );
}
