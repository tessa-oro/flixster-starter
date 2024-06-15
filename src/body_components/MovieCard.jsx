import "./MovieCard.css";
import React from "react";
import { useState } from 'react';

const MovieCard = ({ name, poster, rating, modalOpen, addToBar, removeFromBar }) => {
    const [heartClicked, setHeartClicked] = useState(false);

    /*
    switches heart icon when clicked and calls functions to add or remove movie from favorites
    */
    const switchHeart = () => {
        if (!heartClicked) {
            addToBar(name);
        } else {
            removeFromBar(name);
        }
        setHeartClicked(!heartClicked);
    }

    return (
        <div id="movieCard">
            <div>
                <img id="moviePoster" src={poster} />
                <span>
                    <p id="movieRating">{rating}&#11088;</p>
                    {!heartClicked && <p id='emptyHeart' onClick={switchHeart}>&#9825;</p>}
                    {heartClicked && <p id='blueHeart' onClick={switchHeart}>&#128153;</p>}
                </span>
            </div>
            <div id="seeDetailsBox">
                <button id="seeDetails" onClick={modalOpen}>more</button>
            </div>
        </div>
    );
}

export default MovieCard;