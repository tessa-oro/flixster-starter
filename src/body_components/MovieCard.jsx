import "./MovieCard.css";
import React from "react";
import ReactDOM from "react-dom";

function MovieCard(movie) {
    return (
        <div id="movieCard">
            <p>{movie.name}</p>
            <img src={movie.poster}/>
            <p>{movie.rating}</p>
        </div>
    );
}

export default MovieCard;