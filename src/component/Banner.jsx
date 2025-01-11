import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export const Banner = () => {
  const bannerData = useSelector((state) => state.movieData.bannerData);

  const imageURL = useSelector((state) => state.movieData.imageURL);

  const [currentImage, setCurrentImage] = useState(0);
//   console.log("currentImage", currentImage);

  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };
  const handlePrev = () => {
    setCurrentImage(currentImage - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
        if (currentImage < bannerData.length - 1) {

        handleNext();
        }
        else{
            setCurrentImage(0);
        }
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerData, imageURL,currentImage]);

  
  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[99vh] overflow-hidden relative group">
        {bannerData.map((data, index) => {
          return (
            <div
              key={data.id + "bannerHome" + index}
              className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative transition-all duration-100"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
                 {/* images for banner */}
              <div className="w-full h-full">
                <img
                  src={imageURL + data.backdrop_path}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Button for previous */}

              <div className=" cursor-pointer absolute top-0 h-full w-full hidden items-center justify-between px-6 group-hover:lg:flex">
                <button
                  onClick={handlePrev}
                  className=" cursor-pointer text-4xl hoer:text-white z-10 hover:scale-125 duration-200 transition-all hover:bg-white hover:rounded-full hover:text-black "
                >
                  <FaAngleLeft />
                </button>


                  {/* Button for next  */}
                 
                <button
                  onClick={handleNext}
                  className=" cursor-pointer text-4xl hoer:text-white z-10 hover:scale-125 duration-200 transition-all hover:bg-white hover:rounded-full hover:text-black "
                >
                  <FaAngleRight />
                </button>
              </div>
              <div className="absolute top-0  w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
              <div className="container mx-auto">
                <div className=" w-full absolute bottom-0 max-w-md px-4">
                  <h2 className="font-bold  text-2xl lg:text-4xl text-white drop-shadow-2xl ">
                    {data.title || data.name}
                  </h2>
                  <p className="text-ellipsis text-lg line-clamp-3 my-2">
                    {data.overview}
                  </p>
                  <div className="flex items-center gap-4">
                    <p className="lg:text-lg">
                      Rating : {Number(data.vote_average).toFixed(1)} +{" "}
                    </p>
                    <span>|</span>
                    <p className="lg:text-lg">
                      Views : {Number(data.popularity).toFixed(0)}
                    </p>
                    <span>|</span>
                    <p className="lg:text-lg">
                      Language : {data.original_language}{" "}
                    </p>
                  </div>
                  <button className=" my-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 hover:focus:ring-orange-500">
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Banner;
