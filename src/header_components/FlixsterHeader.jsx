import React from 'react';
import "./FlixsterHeader.css"
import SortMovie from "./SortMovie";

function FlixsterHeader() {
    return (
        <header>
            <h1 id='flixsterHead'>Flixster</h1>
            <div>
                <div id="headerFeatures">
                    <SortMovie />
                </div>
            </div>
        </header>
    );
}

export default FlixsterHeader;