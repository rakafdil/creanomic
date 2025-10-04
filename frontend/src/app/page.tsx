import Image from "next/image";
import Hero from "./components/Home/Hero";
import AboutUs from "./components/Home/AboutUs";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="px-36">
        <AboutUs />
      </div>
    </div>
  );
}
