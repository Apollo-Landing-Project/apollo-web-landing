import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Partners from "@/components/Partners";
import News from "@/components/News";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />
      <AboutUs />
      <Services />
      <Partners />
      <News />
      <Contact />
    </main>
  );
}
