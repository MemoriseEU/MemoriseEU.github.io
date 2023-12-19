import dynamic from "next/dynamic";

const Model = dynamic(() => import("@/components/model-viewer/Model"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function ModelViewer() {
  return (
    <div className="w-full h-full">
      <Model glbSrc={`/assets/scene-2.glb`}>
        <button
          className="Hotspot"
          slot="hotspot-1"
          data-position="-0.1997m 0.11766m 0.0056m"
          data-normal="-0.4421014m 0.04410423m 0.8958802m"
          data-orbit="3.711166deg 92.3035deg 0.04335197m"
          data-target="-0.1879433m 0.1157161m -0.01563221m"
          /* onClick={(e) => {
            annotationClicked(e.target);
          }} */
        >
          Hold Tight!
        </button>
        <button
          className="Hotspot"
          slot="hotspot-10"
          data-position="0.02610224m 0.01458751m -0.004978945m"
          data-normal="-0.602551m 0.2856147m -0.1405055m"
          data-orbit="-78.89725deg 30.17752deg 0.08451112m"
          data-target="0.02610223m 1.4145875m -0.004978945m"
        >
          Treasure
        </button>
      </Model>
    </div>
  );
}
