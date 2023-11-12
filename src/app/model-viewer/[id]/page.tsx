import Model from "@/components/model-viewer/Model";

export default function ModelViewer({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div style={{ width: "500px", height: "500px" }}>
      <Model glbSrc={`/assets/${id}.glb`} />
    </div>
  );
}

export function generateStaticParams() {
  return [{ id: "scene-1" }, { id: "scene-2" }];
}
