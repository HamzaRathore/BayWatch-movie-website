import React, { useRef } from "react";
import Card from "./Card";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const HorizontalScrollCard = ({ data = [], heading, trending, media_type }) => {
  const containerRef = useRef();

  const handleNext = () => {
    containerRef.current.scrollLeft += 300;
  };
  const handlePrevious = () => {
    containerRef.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-2 my-10">
      <h2 className="text-xl lg:text-3xl font-bold mb-3 pt-8 pb-2 border-b-2 border-white">
        {heading}
      </h2>
      <div className="relative">
        <div
          ref={containerRef}
          className="flex overflow-hidden overflow-x-scroll relative z-10 gap-6 scroll-smooth transition-all scrolbar-none"
        >
          {data.map((data, index) => (
            <div
              className="flex-none w-[230px]"
              key={data.id + "heading" + index}
            >
              <Card data={data} trending={trending} media_type={media_type} />
            </div>
          ))}
        </div>

        <div className="absolute top-0 hidden lg:flex justify-between w-full h-full items-center">
          <button
            onClick={handlePrevious}
            className="bg-white p-1 text-black rounded-full -ml-2 z-10"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white p-1 text-black rounded-full -mr-2 z-10"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
