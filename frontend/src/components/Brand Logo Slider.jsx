import React from "react";
import Logo1 from "../assets/Brand Images/moose.jpg"
import Logo2 from "../assets/Brand Images/carnage.jpg"
import Logo3 from "../assets/Brand Images/tommy.jpg"
import Logo4 from "../assets/Brand Images/Lacoste.jpg"
import Logo5 from "../assets/Brand Images/polo.jpg"
import Logo6 from "../assets/Brand Images/Zara.jpg"



const BrandLogoSlider = () => {
    const logos = [
        {
            logo: Logo1
        },
        {
            logo: Logo2
        },
        {
            logo: Logo3
        },
        {
            logo: Logo4
        },
        {
            logo: Logo5
        },
        {
            logo: Logo6
        },
];

  return (
    <div className="relative py-6 w-full  bg-white overflow-hidden">
      <h2 className="font-PoppinsFont text-[24px] text-center font-extrabold mb-6">OUR BRANDS</h2>
      <div className="animate-marquee flex gap-16 whitespace-nowrap">
        {[...logos, ...logos].map((logo, index) => (
          <img
            key={index}
            src={logo.logo}
            alt={`logo-${index}`}
            className="h-36 w-56 object-contain"
          />
          
        ))}
      </div>
    </div>
  );
};

export default BrandLogoSlider;
