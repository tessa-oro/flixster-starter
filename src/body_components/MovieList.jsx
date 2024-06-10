import React from "react";
import ReactDOM from "react-dom";
import './MovieList.css'
import MovieCard from './MovieCard.jsx';
import LoadMore from "./LoadMore.jsx";

function MovieList() {
    return (
        <div>
            <div id="cardSection">
                <MovieCard name="Interstellar" rating="4.5"/>
                <MovieCard />
                <MovieCard />
            </div>
            <LoadMore />
        </div>
    );
}

export default MovieList;