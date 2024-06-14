import "./MovieModal.css";
import React from "react";

const MovieModal = ({name, poster, release, overview, closeModal}) => {
    return (
        <>
        <div id="cardModal">
            <p id="close" onClick={closeModal}>&times;</p>
            <div id="modal-content">
                <img id="moviePoster" src={poster}/>
                <p id="movieName">{name}</p>
                <p id="movieReleaseDate">Released: {release}</p>
                <p id="movieOverview">{overview}</p>
            </div>
        </div>
        <div id="overlay"></div>
        </>
    );
}


export default MovieModal;