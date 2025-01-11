import {IoHome } from "react-icons/io5";
import { PiTelevisionBold } from "react-icons/pi";
import { BiSolidCameraMovie } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

export const navigation = [
    {
      label: "TV Shows",
      href: "tv",
      icon:<PiTelevisionBold/>
    },
    {
      label: "Movie",
      href: "movie",
      icon:<BiSolidCameraMovie/>
    },
  ];

  export const mobileNavigation=[
    {
        label:"Home",
        href:"/",
        icon:<IoHome/>
    },
    {
        label:"Search",
        href:"/search",
        icon:< IoSearchOutline/>
    },
    ...navigation

   
  ]