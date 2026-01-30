import React from "react";
import Category1 from "../assets/Category Images/men.png"
import Category2 from "../assets/Category Images/women.png"
import Category3 from "../assets/Category Images/kids.png"
import Category4 from "../assets/Category Images/home.png"

const CategoryItem = [
  {
    id: 1,
    title: "MENS",
    image: Category1,
    link: "/men",
  },
  {
    id: 2,
    title: "WOMANS",
    image: Category2,
    link: "/woman",
  },
  {
    id: 3,
    title: "KIDS",
    image: Category3,
    link: "/",
  },
  {
    id: 4,
    title: "HOME & LIVING",
    image: Category4,
    link: "/",
  },
];

const Category = () => {
  return (
    <div className="">
      <h2 className="font-PoppinsFont text-[24px] text-center font-extrabold ">CATEGORIES</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 p-6">
      
      {CategoryItem.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-lg group"
        >
          <a href={item.link} className="block h-full">
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[680px] object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-60 left-1/2 transform -translate-x-1/2">
                <div className="px-8 py-4 bg-white text-black text-base font-bold font-LatoFont rounded-full hover:bg-black hover:text-white transition">
                  Shop Now
                </div>

                
              </div>
              <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 text-center">
                  <h3 className="text-[60px] inline-block align-text-top lg:text-[80px] font-bold text-white drop-shadow-md leading-[70px] md:leading-[60px]">
                    {item.title}
                  </h3>
                </div>
            </div>
          </a>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Category;
