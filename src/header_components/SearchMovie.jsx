import React from "react";
import ReactDOM from "react-dom";
import "./SearchMovie.css";

function SearchMovie(movie) {
    return (
        <>
            <input id="searchBar" type="text" placeholder="Search movies..."></input>
            <button id="submitSearch">Submit</button>
        </>
    );
}

export default SearchMovie;