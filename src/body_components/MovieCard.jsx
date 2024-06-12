import "./MovieCard.css";
import React from "react";
import ReactDOM from "react-dom";

const MovieCard = ({name, poster, rating}) => {
    return (
        <div id="movieCard" /*onClick={showModal()} */>
            <img id="moviePoster" src={poster}/>
            <p id="movieName">{name}</p>
            <p id="movieRating">Rating: {rating}</p>
        </div>
    );
}

export default MovieCard;