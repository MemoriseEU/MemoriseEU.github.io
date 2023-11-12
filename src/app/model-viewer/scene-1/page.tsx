import dynamic from "next/dynamic";

const Model = dynamic(() => import("@/components/model-viewer/Model"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function ModelViewer({ params }: { params: { id: string } }) {
  return <Model glbSrc={`/assets/scene-1.glb`} />;
}
