import React from "react";
import ReactDOM from "react-dom";
import "./SearchMovie.css";

function SearchMovie(movie) {
    return (
        <div>
            <input id="searchBar" type="text" placeholder="Search movies..."></input>
        </div>
    );
}

export default SearchMovie;