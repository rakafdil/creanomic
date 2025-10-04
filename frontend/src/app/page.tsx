import Image from "next/image";
import Hero from "./components/Home/Hero";
import AboutUs from "./components/Home/AboutUs";
import Services from "./components/Home/Services";
import FreqAskQuestions from "./components/Home/FreqAskQuestions";

export default function Home() {
  return (
    <div className="font-inter">
      <Hero />
      <div className="px-36">
        <AboutUs />
      </div>
      <Services />
      <div className="px-36">
        <FreqAskQuestions />
      </div>
    </div>
  );
}
