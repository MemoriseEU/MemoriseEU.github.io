import dynamic from "next/dynamic";

const Model = dynamic(() => import("@/components/model-viewer/Model"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function ModelViewer({ params }: { params: { id: string } }) {
  return (
    <Model
      glbSrc={`/assets/scene-1.glb`}
      layout="split"
      annotations={[
        {
          title: "Title",
          description: "Test",
          camPos: {
            x: 249.98052614284205,
            y: 57.38850918987201,
            z: -169.16547509097308,
          },
          lookAt: {
            x: 279.41060941115137,
            y: 52.715825505843746,
            z: -214.67874358390293,
          },
        },
        {
          title: "Title",
          description: "Test",
          camPos: {
            x: 352.2960113980947,
            y: 72.25746220617667,
            z: -242.49893994119728,
          },
          lookAt: {
            x: 382.00787353515625,
            y: 68.25222014866065,
            z: -254.7398141235918,
          },
        },
        {
          title: "Title",
          description: "Test",
          camPos: {
            x: 207.76538723626996,
            y: 57.17506694563725,
            z: -462.6975120078462,
          },
          lookAt: {
            x: 226.33340315988565,
            y: 48.72134796387746,
            z: -510.28757412086577,
          },
        },
        {
          title: "Title",
          description: "Test",
          camPos: {
            x: 95.09847743385329,
            y: 47.72447043733835,
            z: -648.9048421712101,
          },
          lookAt: {
            x: 102.00996755295989,
            y: 27.872435175183462,
            z: -723.8176627124093,
          },
        },
      ]}
    />
  );
}
