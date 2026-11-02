import { Footer, Header, PageIntro } from "@/components/chrome";
import { Explorer } from "@/components/explorer";
export default function ExplorePage() { return <><Header/><main><PageIntro eyebrow="Resultados públicos" title="Explorá la hinchada, territorio por territorio."><span className="demo-tag">DATOS DEMO</span><p>Este explorador funciona con una base sintética y no representa participaciones reales. Las vistas públicas futuras aplicarán supresión de grupos pequeños.</p></PageIntro><section className="section"><div className="shell"><Explorer/></div></section></main><Footer/></>; }
