import { Navbar } from "@/components/ui/Navbar";
import Image from "next/image";
import { useContext, useMemo } from "react";
import { PaintingContext } from "./painting.context";

export default function MenuBandprops() {
  const paintingContext = useContext(PaintingContext);

  const links = [
    {
      id: "link1",
      name: "Link 1",
      link: "link-1",
      image: "/assets/Picture 1.jpg",
    },
    {
      id: "link2",
      name: "Link 2",
      link: "link-2",
      image: "/assets/Picture 2.jpg",
    },
    {
      id: "link3",
      name: "Link 3",
      link: "link-3",
      image: "/assets/Picture 3.jpg",
    },
    {
      id: "link4",
      name: "Link 4",
      link: "link-4",
      image: "/assets/Picture 4.jpg",
    },
  ];

  const content = useMemo(() => {
    if (paintingContext?.mode === "default") {
      return links.map((e) => {
        return (
          <div
            key={`${e.id}-link`}
            className="items-center flex justify-center relative"
          >
            <Image
              alt={e.name}
              src={e.image}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "auto", height: "100%" }}
              className="cursor-pointer"
              onClick={() => {
                paintingContext.updateMode("movie");
                paintingContext.updateText(e.name);
                paintingContext.updateImage(e.image);
              }}
            />
          </div>
        );
      });
    } else if (paintingContext?.mode === "movie") {
      return (
        <div className="items-center flex justify-center relative">
          <div className="grid grid-flow-row grid-cols-2">
            {paintingContext.image && (
              <Image
                src={paintingContext.image}
                alt={paintingContext.text ?? ""}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "auto", height: "100%" }}
              />
            )}
            <div className="grid grid-rows-2">
              <div>{paintingContext.text}</div>
              <div>This is a longer text explaining the video.</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="items-center flex justify-center relative">
          <div className="grid grid-rows-2">
            <div>{paintingContext?.text}</div>
          </div>
        </div>
      );
    }
  }, [links, paintingContext]);

  return (
    <div className="size-full border border-gray-400 grid grid-rows-1 grid-flow-col gap-2 p-2">
      {content}
    </div>
  );
}
