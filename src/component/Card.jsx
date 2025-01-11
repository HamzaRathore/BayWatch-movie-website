import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Card = ({ data, media_type }) => {
  const imageURL = useSelector((state) => state.movieData.imageURL);
  const mediaType = data.media_type ?? media_type;

  return (
    <Link
      to={"/" + mediaType + "/" + data.id}
      className="w-full min-w-[230px] max-w-[230px] h-[380px] block rounded relative hover:scale-105 transition-all"
    >
      <div className="w-full h-full relative">
        {data?.poster_path ? (
          <img
            src={imageURL + data?.poster_path}
            className="w-full h-full object-cover"
            alt={data?.title || data?.name}
          />
        ) : (
          <div className="bg-neutral-800 h-full w-full flex justify-center items-center">
            No image found
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm bg-black/50 p-3">
          <h2 className="text-ellipsis line-clamp-1 text-base font-bold text-center">
            {data?.title || data?.name}
          </h2>
          <div className="flex justify-between w-full text-sm text-neutral-400 mt-1">
            <p>{data.release_date || data.first_air_date}</p>
            <p>Rating: {Number(data.vote_average).toFixed(1)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
