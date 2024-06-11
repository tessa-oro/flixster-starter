import "./MovieCard.css";
import React from "react";
import ReactDOM from "react-dom";

const MovieCard = ({name, poster, rating}) => {
    return (
        <div id="movieCard">
            <p id="movieName">{name}</p>
            <img id="moviePoster" src={poster}/>
            <p id="movieRating">{rating}</p>
        </div>
    );
}

export default MovieCard;