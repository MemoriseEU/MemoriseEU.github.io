"use client";

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 md:gap-8">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-6">
        {reactApp
          ? "Entdecke Visuelles Erbe"
          : "Entdecke neue digitale Ansätze des Erzählens von Nazi-Verfolgungen"}
        <br />
        <span className="text-gray-500 text-lg md:text-xl">
          {reactApp
            ? "Explore Visual Heritage"
            : "Discover new digital approaches of storytelling on Nazi persecution"}
        </span>
      </h1>

      {/* Responsive Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 w-full max-w-7xl">
        {(reactApp ? reactCards : cards).map((e, i) => {
          return (
            <Fragment key={`menu-item=${i}`}>
              <Link href={e.path}>
                <div
                  key={`card-${i}-text`}
                  className="size-full grid grid-rows-[1fr_min-content] shadow-xl bg-white rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
                >
                  <div
                    key={`card-${i}-image`}
                    className="w-full h-48 md:h-80 object-cover relative"
                  >
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
                    <div className="text-center text-xl">{e.text}</div>
                    <div className="text-center text-lg text-gray-700">
                      {e.otherText}
                    </div>
                  </div>
                </div>
              </Link>
              {/* {i < (reactApp ? reactCards : cards).length - 1 && (
                <div className="border border-slate-500 h-[105%]"></div>
              )} */}
            </Fragment>
          );
        })}
      </div>

      {/* Start Text */}
      <p className="text-center text-gray-600 mt-6 text-sm md:text-base">
        Zum Starten auswählen
        <br />
        <span className="text-gray-400 text-xs md:text-sm">
          Select to begin
        </span>
      </p>
    </div>
  );
} /*
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
      <div className="text-center text-3xl text-gray-700">Select to begin</div>
    </div>
  </div>
</div>;
*/
