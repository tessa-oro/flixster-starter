import "./MovieCard.css";
import React from "react";
import ReactDOM from "react-dom";

const MovieCard = ({name, poster, rating, modalOpen}) => {
    return (
        <div id="movieCard" >
            <img id="moviePoster" src={poster}/>
            <p id="movieName">{name}</p>
            <p id="movieRating">Rating: {rating}</p>
            <button onClick={modalOpen}>see details</button>
        </div>
    );
}

export default MovieCard;