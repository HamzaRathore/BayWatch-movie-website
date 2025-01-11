import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import MobileNavigation from "../component/MobileNavigation";

const Main = () => {
  return (
    <div className="pb-14 lg:pb-0">
      <Navbar />
      <div className="min-h-screen">
        <Outlet /> {/* Child routes (Home, ExplorePage, etc.) load here */}
      </div>
      <Footer />
      <MobileNavigation />
    </div>
  );
};

export default Main;
