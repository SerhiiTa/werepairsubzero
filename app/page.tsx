import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import ServiceAreas from "./components/ServiceAreas";
import CTATestimonial from "./components/CTATestimonial";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <ServiceAreas />
        <CTATestimonial />
      </main>
      <Footer />
    </>
  );
}
