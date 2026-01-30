import React from "react";
import Offer1 from "../assets/Sales Images/Offer 1.png"
import Offer2 from "../assets/Sales Images/Offer 2.png"
import Offer3 from "../assets/Sales Images/Offer 3.png"


const Images = [
        {
            img: Offer1
        },
        {
            img: Offer2
        },
        {
            img: Offer3
        },
];

const Sales = () => {
  return (
    <div className="relative w-full overflow-hidden bg-white px-20 py-6">
            
    <h2 className="font-PoppinsFont text-[24px] text-center font-extrabold mb-16">SALES</h2>
        
      <div className="flex gap-20">
        {Images.map((images, index) => (
          <img
            key={index}
            src={images.img}
            alt={`logo-${index}`}
            className="h-[400px] w-[400px] object-contain transition-transform duration-300 hover:scale-110"
          />
        ))}
      </div>
    </div>
  );
};

export default Sales;
