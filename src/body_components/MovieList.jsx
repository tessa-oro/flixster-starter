import React from "react";
import ReactDOM from "react-dom";
import './MovieList.css'
import MovieCard from './MovieCard.jsx';

function MovieList() {
    return (
        <div>
            <p>This is card section</p>
            <div id="cardSection">
                <MovieCard />
                <MovieCard />
                <MovieCard />
            </div>
        </div>
    );
}

export default MovieList;