import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Partners } from "@/components/Partners";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Features } from "@/components/Features";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Partners />
      <Problem />
      <Solution />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}

export default App;
