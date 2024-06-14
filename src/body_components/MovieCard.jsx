import "./MovieCard.css";
import React from "react";
import {useState} from 'react';

const MovieCard = ({name, poster, rating, modalOpen, addToBar, removeFromBar}) => {
    const [heartClicked, setHeartClicked] = useState(false);

    const switchHeart = () => {
        if (!heartClicked) {
            addToBar(name);
        }
        setHeartClicked(!heartClicked);
    }

    return (
        <div id="movieCard">
        <div>
            <img id="moviePoster" src={poster}/>
            <p id="movieName">{name}</p>
            <p id="movieRating">Rating: {rating}</p>
            <span> 
                {!heartClicked && <p id='emptyHeart' onClick={switchHeart}>&#9825;</p> }
                {heartClicked && <p id='redHeart' onClick={switchHeart}>&#128153;</p>}
            </span>
        </div>
        <div id="seeDetailsBox">
        <button id="seeDetails" onClick={modalOpen}>see details</button>
        </div>
        </div>
    );
}

export default MovieCard;