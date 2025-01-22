import Brands from "../components/Brands";
import CarouselGrid from "../components/CarouselGrid";
import Contact from "../components/Contact";
import CTA from "../components/CTA";
import Features from "../components/Features";
import Highlight from "../components/Highlight";
import QyA from "../components/QyA";

export default function Home() {
  return (
    <>
      <Features />
      <CarouselGrid />
      <Highlight />
      <QyA />
      <CTA />
      <Brands />
      <Contact />
    </>
  );
}
