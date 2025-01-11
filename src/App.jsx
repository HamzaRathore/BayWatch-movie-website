import { useEffect, useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ExplorePage from "./pages/ExplorePage";
import DetailPage from "./pages/DetailPage";
import Search from "./pages/Search";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBannerData,setImageURL } from "./features/slices/movieSlice";
import Main from "./pages/Main";

function App() {

  const dispatch=useDispatch();
              
  const fetchTrendingData =  async()=>{
    try {
      const response=await axios.get('/trending/all/week')
      // console.log('data',response);
      dispatch(setBannerData(response.data.results))
      
    } catch (error) {
      console.log("error",error)
    }
  }
  
  const fetchConfiguration = async()=>{
    try {
      const response = await axios.get("/configuration");
      dispatch(setImageURL(response.data.images.secure_base_url + "original"));
      
    } catch (error) {
      
      
    }
  }

  useEffect(()=>{
          fetchTrendingData();
          fetchConfiguration();
  },[])


  const router = createBrowserRouter([
   
    {
      path: "/",
      element: <Main />, // Main layout with Navbar, Footer, etc.
      children: [
        {
          path: "/", // Home route
          element: <Home />,
        },
        {
          path: ":explore", // Explore route
          element: <ExplorePage />,
        },
        {
          path: ":explore/:id", // Detail route
          element: <DetailPage />,
        },
        {
          path: "search", // Search route
          element: <Search />,
        },
      ],
    },
  ]);



  return (
    <>
      <RouterProvider router={router} />
      <div></div>
    </>
  );
}

export default App;
