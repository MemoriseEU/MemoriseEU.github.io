import Model from "@/components/model-viewer/Model";

export default function ModelViewer({ params }: { params: { id: string } }) {
  return (
    <div style={{ width: "500px", height: "500px" }}>
      <Model glbSrc={`/assets/scene-2.glb`} />
    </div>
  );
}
