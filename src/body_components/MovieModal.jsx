import "./MovieModal.css";
import React from "react";
import { useState, useEffect } from 'react';

const MovieModal = ({ name, poster, release, overview, movieID, closeModal }) => {
    const [data, setData] = useState([]);
    const [curMovieID, setCurMovieID] = useState(null);


    const fetchData = async(ID) => {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await fetch(`https://api.themoviedb.org/3/movie/${ID}/videos?api_key=${apiKey}&language=en-US`);
        const vData = await response.json();
        setData(vData.results);
    }

    useEffect(() => {
        
        fetchData(movieID)


    }, [movieID]);

    let trailerURL = undefined;
    if (data.length) {
        const actualTrailerKey = data.filter((e) => (e.name === 'Official Trailer'));
        try {
            trailerURL = `https://www.youtube.com/embed/${actualTrailerKey[0].key}`;
        } catch (error) {
            trailerURL = `https://www.youtube.com/embed/${data[0].key}`
        }
    }

    return (
        <>
            <div id="cardModal">
                <p id="close" onClick={closeModal}>&times;</p>
                <div id="modalContent">
                    <div id="modalLeft">
                        <img id="modalMoviePoster" src={poster} />
                    </div>
                    <div id="modalRight">
                        <h3 id="modalMovieName">{name}</h3>
                        <p id="modalMovieOverview">{overview}</p>
                        <p id="modalMovieReleaseDate">Released: {release}</p>
                    </div>
                    <div id="spacer"></div>
                    <iframe id="trailer" src={trailerURL ? trailerURL : ""}></iframe>
                </div>
            </div>
            <div id="overlay"></div>
        </>
    );
}


export default MovieModal;