import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const Model = dynamic(() => import("@/components/model-viewer/Model"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function ModelViewer({ params }: { params: { id: string } }) {
  return (
    <Model
      glbSrc={`/assets/bernburg.glb`}
      layout="split"
      annotations={[
        {
          title: "Title",
          description: "Test",
          camPos: {
            x: 200.62816866053288,
            y: 14.837845673317911,
            z: -82.97710233440348,
          },
          lookAt: {
            x: 180.06743738142904,
            y: 14.219755712273566,
            z: -81.75840731361635,
          },
        },
        {
          title: "Title",
          description: "Test",
          camPos: {
            x: 92.55217968054895,
            y: 11.57932860075796,
            z: -85.64779782728255,
          },
          lookAt: {
            x: 62.2347090491794,
            y: 7.942474146207856,
            z: -74.40193193073719,
          },
        },
        {
          title: "Title",
          description: "Test",
          camPos: {
            x: -56.022697191428705,
            y: 18.25648757274298,
            z: -85.5802126879981,
          },
          lookAt: {
            x: -89.09359929356262,
            y: 16.35385564699596,
            z: -93.21187150632284,
          },
        },
      ]}
    />
  );
}
