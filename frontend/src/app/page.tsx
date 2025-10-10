import Image from "next/image";
import Hero from "./components/Home/Hero";
import AboutUs from "./components/Home/AboutUs";
import Services from "./components/Home/Services";
import FreqAskQuestions from "./components/Home/FreqAskQuestions";
import Navbar from "./components/Common/Navbar";
import ToTop from "./components/Common/ToTop";
import Footer from "./components/Common/Footer";

export default function Home() {
  return (
    <div className="font-inter">
      <Navbar />
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
        <FreqAskQuestions />
      </div>
      <ToTop />
      <Footer />
    </div>
  );
}
