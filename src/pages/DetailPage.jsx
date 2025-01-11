import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";
import HorizontalScrollCard from "../component/HorizontalScrollCard";
import axios from "axios";
import VideoPlay from "../component/VideoPlay";
import AOS from "aos";
import "aos/dist/aos.css";

const DetailPage = () => {
  const params = useParams();

  const trendingData = useSelector((state) => state.movieData.bannerData);
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);

  //Fetching data(API) from FetchDetails
  const { data: castData } = useFetchDetails(
    `/${params?.explore}/${params?.id}/credits`
  );
  const imageURL = useSelector((state) => state.movieData.imageURL);
  //  console.log("data",data)
  //  console.log("cast",castData)

  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");
  const [similarData, setSimilarData] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);

  const handlePlayVideo = (data) => {
    setPlayVideoId(data);
    setPlayVideo(true);
  };

  //API CALL
  const fetchSimilarData = async () => {
    try {
      const response = await axios.get(
        `/${params?.explore}/${params?.id}/similar`
      );
      //  console.log(response);
      setSimilarData(response.data.results);
    } catch (error) {
      return error;
    }
  };

     //fetching recommended data
  const fetchRecommendedData = async () => {
    try {
      const response = await axios.get(
        `/${params?.explore}/${params?.id}/recommendations`
      );
      //  console.log(response);
      setRecommendedData(response.data.results);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchSimilarData();
    fetchRecommendedData();
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div>
      {/* banner image */}
      <div className="w-full h-[500px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            className="h-full w-full object-cover"
            src={imageURL + data?.backdrop_path}
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900 to-transparent "></div>
      </div>

      <div className="container mx-auto px-3 py-20 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className=" relative min-w-60 mx-auto lg:-mt-28 lg:mx-0  w-fit">
          {/* logo banner */}
          <img
            className="h-80 w-60  object-cover rounded"
            src={imageURL + data?.poster_path}
          />

          <button
            onClick={() => handlePlayVideo(data)}
            className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all"
          >
            Play Now
          </button>
        </div>
               {/* showing Movie/Tv data */}
        <div>
          <h2 className="text-2xl lg:text-4xl font-bold">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-400 ">{data?.tagline}</p>
          <div className="w-full border-b-2 border-neutral-600 my-4 "></div>
          <div className="flex items-center justify-between gap-3 pt-2">
            <p>Rating: {Number(data?.vote_average).toFixed(1)}</p>
            <span>|</span>
            <p>Views: {data?.vote_count}</p>
            <span>|</span>
            <p>Duration: {data?.runtime} Min</p>
          </div>
          <div className="w-full border-b-2 border-neutral-600 my-4 "></div>
          <div>
            <h3 className="text-xl font-bold mt-4 mb-2">OverView</h3>
            <p>{data?.overview}</p>
            <div className="w-full border-b-2 border-neutral-600 my-4 "></div>
            <div className="flex my-2 justify-around ">
              <p className="">Status: {data?.status}</p>
              <span>|</span>
              
              <p>Revenue: {Number(data?.revenue)} $</p>
            </div>
          </div>

          <div className="w-full border-b-2 border-neutral-600 "></div>
          <div className="my-4">
            <p>
              <span className="text-white">Director: </span>{" "}
              {castData?.crew[0]?.name}
            </p>
          </div>
          <div className="w-full border-b-2 border-neutral-600 "></div>


          {/* cast display */}
          <h2 className=" text-xl lg:text-2xl font-bold my-4">Star Cast:</h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4">

            {/* filter: Only show cast with Profile */}
            {castData?.cast
              ?.filter((el) => el?.profile_path)
              .map((starCast, index) => {
                return (
                  <div>
                    <div>
                      {/* Cast Images */}
                      <img
                        src={imageURL + starCast?.profile_path}
                        className="w-24 h-24 object-cover rounded-full"
                      />
                    </div>
                    {/* Cast Names */}
                    <p className="font-bold text-center text-sm text-neutral-400">
                      {starCast?.name}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div data-aos="fade-right"
                data-aos-delay="200">

        {/* Using HorizonScrollCard component to display similar products */}
        <HorizontalScrollCard
        
          data={similarData}
          heading={"Similar"}
          media_type={params?.explore}


        /> {/* Using HorizonScrollCard component to display recommended products */}
        <HorizontalScrollCard
        
          data={recommendedData}
          heading={"Recommended"}
          media_type={params?.explore}
        />
      </div>
        
        {/* Onclicking poster if the video is available then play it */}
      {playVideo && (
        <VideoPlay
          data={playVideoId}
          close={() => setPlayVideo(false)}
          media_type={params?.explore}
        />
      )}
    </div>
  );
};

export default DetailPage;
