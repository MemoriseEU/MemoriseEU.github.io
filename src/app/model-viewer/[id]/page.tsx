"use client";

import Model from "@/components/model-viewer/Model";

export default function ModelViewer({ params }: { params: { id: string } }) {
  const { id = "scene-1" } = params;

  return (
    <div style={{ width: "500px", height: "500px" }}>
      <Model glbSrc={`/assets/${id}.glb`} />
    </div>
  );
}
