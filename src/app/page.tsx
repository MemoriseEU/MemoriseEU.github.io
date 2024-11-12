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

export default function Home() {
  return (
    <div className="grid h-full max-h-full w-full grid-flow-row grid-rows-[auto,1fr,auto] gap-4 p-10">
      <div className="grid justify-center gap-1">
        <div className="text-center text-5xl">Entdecke Visuelles Erbe</div>
        <div className="text-center text-4xl ">Explore Visual Heritage</div>
      </div>
      <div className="flex justify-center items-center h-[80%] p-6 self-center w-full">
        <div className="grid size-full grid-flow-row grid-cols-[1fr_min-content_1fr] p-2 gap-20 w-[90%]">
          {cards.map((e, i) => {
            return (
              <>
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
                {i < cards.length - 1 && (
                  <div className="border border-slate-500 h-[105%]"></div>
                )}
              </>
            );
          })}
        </div>
      </div>
      <div>
        <div className="grid justify-center gap-1">
          <div className="text-center text-4xl">Zum Starten antippen</div>
          <div className="text-center text-3xl text-gray-700">
            Touch to begin
          </div>
        </div>
      </div>
    </div>
  );
}
