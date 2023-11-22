import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const Model = dynamic(() => import("@/components/model-viewer/Model"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function ModelViewer({ params }: { params: { id: string } }) {
  return (
    <div className="w-full h-full">
      <Model glbSrc={`/assets/scene-1.glb`}>
        <button
          className="Hotspot"
          slot="hotspot-12"
          data-position="191.70223934086619m 1.0658141036401503e-14m -54.451008119879475m"
          data-normal="0m 1m 2.220446049250313e-16m"
          data-target="191.74069830665505m -1.7763568394002505e-14m -54.05065574181651m"
          data-orbit="-0.009418981664360532rad 1.4893160975894237rad 871.3831073976557m"
          data-visibility-attribute="visible"
        >
          <div className="HotspotAnnotation">Working Barrack - 56/57</div>
          <div className="hotspotContent">
            Interior of one of the work barracks where people are dismantling
            cables.
            <Image
              width={100}
              height={50}
              src="https://chrishalldesign.files.wordpress.com/2023/03/leo-kok-hkw-1-sml.jpeg?w=1024"
              alt="Interior of one of the work barracks where people are dismantling cables."
            />
          </div>
        </button>
        <button
          className="Hotspot"
          slot="hotspot-3"
          data-position="163.24025749539953m 42.95321514014834m -151.72016429311373m"
          data-normal="0.4863353649115846m -1.9401640997546847e-16m 0.8737722316692812m"
          data-target="163.283682188439m 42.798538191524734m -151.74433416618842m"
          data-orbit="0.3449702034572049rad 1.4915078221690115rad 310.8002046939614m"
          data-visibility-attribute="visible"
        >
          <div className="HotspotAnnotation">Workers stripping cables</div>
          <div className="hotspotContent">
            Interior of one of the workbarracks where people are dismantling
            cables and other metal objects, as seen in this drawing
            <Image
              width={100}
              height={50}
              src="https://media.delving.org/thumbnail/jck/joods-historisch/d007/007B105/1000"
              alt="Interior of one of the work barracks where people are dismantling cables."
            />
            <Link href="https://data.jck.nl/search/?q=Kok&qf%5B%5D=nave_objectSoort%3Avrije+tekening&page=6">
              https://data.jck.nl/search/?q=Kok&qf%5B%5D=nave_objectSoort%3Avrije+tekening&page=6
            </Link>
          </div>
        </button>
        <button
          className="Hotspot"
          slot="hotspot-5"
          data-position="378.97709931977994m 78.71267994638853m -349.75189208984375m"
          data-normal="0m -2.220446049250313e-16m 1m"
          data-target="378.99113266481874m 78.6924978639533m -349.75189208984386m"
          data-orbit="-0.6407805679969586rad 1.5381136679813203rad 310.8002046939614m"
          data-visibility-attribute="visible"
        >
          <div className="HotspotAnnotation">Barrack 56-57</div>
          <div className="hotspotContent">
            This Barrack has been partially returned to Kampwesterbork
            <Image
              width={100}
              height={50}
              src="https://www.tracesofwar.com/upload/7611190811084513.JPG"
              alt="This Barrack has been partially returned to Kampwesterbork"
            />
          </div>
        </button>
        <button
          className="Hotspot"
          slot="hotspot-10"
          data-position="228.00001752633264m 55.86187535556745m -509.76209287021993m"
          data-normal="-0.3007056742591067m -2.1176771230765715e-16m 0.9537169902378672m"
          data-target="228.10383341460033m 55.72802219307838m -509.72935986137156m"
          data-orbit="0.0031336227460276784rad 1.49648901439536rad 379.0806889222715m"
          data-visibility-attribute="visible"
        >
          <div className="HotspotAnnotation">Working together...</div>
          <div className="hotspotContent">
            Interior of one of the workbarracks where people are dismantling
            cables
            <Image
              width={100}
              height={50}
              src="http://data.jck.nl/thumbnail/jck/joods-historisch/d004/004B046/2000"
              alt="Interior of one of the workbarracks where people are dismantling cables"
            />
          </div>
        </button>
        <button
          className="Hotspot"
          slot="hotspot-9"
          data-position="107.75659535655774m 27.34688242061863m -724.574220446207m"
          data-normal="0.1305261635172546m -2.2014498338776112e-16m 0.991444865152605m"
          data-target="107.76879456178864m 27.20340197925407m -724.5758265016851m"
          data-orbit="0.15794907714081532rad 1.4746079954519975rad 310.8002046939614m"
          data-visibility-attribute="visible"
        >
          <div className="HotspotAnnotation">Hard work on the floor...</div>
          <div className="hotspotContent">
            Workers on the floor surrounded by metal debris and stripped cables
          </div>
        </button>
      </Model>
    </div>
  );
}
