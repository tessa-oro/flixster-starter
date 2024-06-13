import "./MovieModal.css";
import React from "react";
import ReactDOM from "react-dom";

const MovieModal = ({name, poster, release, overview, closeModal}) => {
    return (
        <div id="cardModal">
            <p id="close" onClick={closeModal}>&times;</p>
            <div id="modal-content">
                <img id="moviePoster" src={poster}/>
                <p id="movieName">{name}</p>
                <p id="movieReleaseDate">Released: {release}</p>
                <p id="movieOverview">{overview}</p>
            </div>
        </div>
    );
}


export default MovieModal;