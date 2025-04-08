import { useState } from "react";
import AllSvgs from "../../assets/AllSvgs";
import Navbar from "./Navbar";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import ProblemAndSolution from "./ProblemAndSolution";
import Features from "./Features";
import Pricing from "./Pricing";
import WhyChooseUs from "./WhyChooseUs";
import UseCases from "./UseCases";
import SubFooter from "./SubFooter";
import Footer from "./Footer";
import StarterKit from "./StarterKit";

const LandingPage = () => {
  return (
    <div className="w-full h-auto flex flex-col overflow-x-hidden overflow-y-auto">
      <Navbar />
      <Hero />
      <StarterKit />
      <ProblemAndSolution />
      <HowItWorks />
      <Features />
      <WhyChooseUs />
      <Pricing />
      <UseCases />
      <SubFooter />
      <Footer />
    </div>
  );
};

export default LandingPage;
