import dynamic from "next/dynamic";

const Model = dynamic(() => import("@/components/model-viewer/Model"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function ModelViewer({ params }: { params: { id: string } }) {
  return (
    <div style={{ width: "500px", height: "500px" }}>
      <Model glbSrc={`/assets/scene-2.glb`} />
    </div>
  );
}
