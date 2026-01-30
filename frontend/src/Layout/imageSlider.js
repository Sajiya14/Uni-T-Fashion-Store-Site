import React, { useEffect, useState } from 'react'
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
//import LeftArrow from "../assets/Slider Images/ArrowLeft.png"
//import RightArrow from "../assets/Slider Images/ArrowRight.png"
import F1 from "../assets/Slider Images/Flayer 1.png"
import F2 from "../assets/Slider Images/Flayer 2.png"
import F3 from "../assets/Slider Images/Flayer 3.png"

const ImageSlider = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
        
        const images = [
        
            {
                img: F1,
            },
    
            {
                img: F2,
            },
            {
                img: F3,
            },
        ];
        
      
    
        const nextSlide = () => {
            setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
        };
    
        const prevSlide = () => {
            setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
        };
    
                        /*----------------Auto Slide Effect------------*/ 
    
        useEffect(() => {
            const interval = setInterval(nextSlide, 5000)
                return () => clearInterval(interval);
        });

  return (
    
    <div className="absolute w-full  mx-auto overflow-hidden top-[89px]">
        
                    <div className="flex transition-transform duration-500 slow"
                         style={{ transform: `translateX(-${currentIndex * 100}%) ` } }>
    
                        {images.map((slide, index) => (
                            <img 
                                key={index} 
                                src={slide.img} 
                                alt={`Slide ${index + 1}`} 
                                className="w-full h-[560px] object-cover flex-shrink-0" />
                        ))}
                    </div>
                        
                                {/*-----Previous Slide Button----*/}
    
                    <button
                        onClick={prevSlide}
                        className="absolute pl-1 pr-1 border-2 rounded-lg border-black hover:bg-black hover:text-white hover:border-white top-1/2 left-2 transform -translate-y-1/2 h-[42px]">
    
                        <IoMdArrowBack size={30}/>
                    </button>
    
                                {/*-----Next Slide Button----*/}
    
                    <button
                        onClick={nextSlide}
                        className="absolute pl-1 pr-1 border-2 rounded-lg border-black hover:bg-black hover:text-white hover:border-white top-1/2 right-2 transform -translate-y-1/2 h-[42px]">
                
                        <IoMdArrowForward size={30}/>
                     </button>
    
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
    
                            /*-----Pagination Button----*/
    
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-black' : 'bg-white'}`} />
                        ))}
                    </div>

                    
                    
                </div>
                
  )
}

export default ImageSlider