import Image from "next/image";
import Hero from "./components/Home/Hero";
import AboutUs from "./components/Home/AboutUs";
import Services from "./components/Home/Services";
import FreqAskQuestions from "./components/Home/FreqAskQuestions";

export default function Home() {
  return (
    <div className="font-inter">
<<<<<<< HEAD
      <Hero />
      <div className="px-36">
        <AboutUs />
      </div>
      <Services />
      <div className="px-36">
=======
      <div id="home">
        <Hero />
      </div>
      <div id="about-us" className="px-36">
        <AboutUs />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="contacts" className="px-36">
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
        <FreqAskQuestions />
      </div>
    </div>
  );
}
