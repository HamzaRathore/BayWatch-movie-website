import React, { useEffect, useState } from "react";
import Banner from "../component/Banner";
import { useSelector } from "react-redux";
import axios from "axios";
import HorizontalScrollCard from "../component/HorizontalScrollCard";

const Home = () => {

  const trendingData = useSelector((state) => state.movieData.bannerData);
  const [nowPlayingData,setNowPlayingData]=useState([])
  const [topRatedData,settopRatedData]=useState([])
  const [upcomingData,setUpcomingData]=useState([])
  const [popularData,setPopularData]=useState([])
  const [onAirData,setOnAirData]=useState([])

  const fetchNowPlayingData =async()=>{
    try {
      const response=await axios.get("/movie/now_playing")
      //  console.log(response);
      setNowPlayingData(response.data.results)
      

    } catch (error) {
      return error;
    }
  }

  const fetchUpcomingdData =async()=>{
    try {
      const response=await axios.get("/movie/upcoming")
      //  console.log(response);
       setUpcomingData(response.data.results)
      

    } catch (error) {
      return error;
    }
  }
  const fetchTopRatedData =async()=>{
    try {
      const response=await axios.get("/movie/top_rated")
      //  console.log(response);
      settopRatedData(response.data.results)
      

    } catch (error) {
      return error;
    }
  }
  const fetchPopularTvData =async()=>{
    try {
      const response=await axios.get("/tv/popular")
      //  console.log(response);
      setPopularData(response.data.results)
      

    } catch (error) {
      return error;
    }
  }
  const fetchOnAirTvData =async()=>{
    try {
      const response=await axios.get("/tv/on_the_air")
      //  console.log(response);
      setOnAirData(response.data.results)
      

    } catch (error) {
      return error;
    }
  }

  
  useEffect(()=>{
       fetchNowPlayingData()
       fetchTopRatedData()
       fetchUpcomingdData()
       fetchPopularTvData()
       fetchOnAirTvData()
  },[])
  
  return (
    <div>
      <Banner />

      <div className="container mx-auto px-2 my-10">
        <HorizontalScrollCard data={trendingData} heading={"Trending"} trending={true} />
        <HorizontalScrollCard data={nowPlayingData} heading={"Playing Now"} media_type={"movie"} />
        <HorizontalScrollCard data={topRatedData} heading={"Top Rated"} media_type={"movie"} />
        <HorizontalScrollCard data={upcomingData} heading={"Upcoming"} media_type={"movie"} />
        <HorizontalScrollCard data={popularData} heading={"Popular TV Shows"} media_type={"tv"} />
        <HorizontalScrollCard data={onAirData} heading={"On The Air"} media_type={"tv"} />
      </div>
    </div>
  );
};

export default Home;
