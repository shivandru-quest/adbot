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

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
      <Navbar />
      <Hero />
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
