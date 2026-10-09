import Hero from "@/components/Hero";
import { Welcome, Categories, Featured, Essentials, EditBanner, Testimonials, Features, Insights, FAQ } from "@/components/HomeSections";

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <Categories />
      <Featured />
      <Essentials />
      <EditBanner />
      <Testimonials />
      <Features />
      <Insights />
      <FAQ />
    </>
  );
}
