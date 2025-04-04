"use strict";

import { Request } from "./Request.js";

const base_url = "https://api.artic.edu/api/v1/artworks/search";
const keywords_input = document.getElementById("keywords"); 
const new_artwork_button = document.getElementById("new_artwork");
const image = document.getElementById("artwork_image");
const title = document.getElementById("artwork_title");
const artist = document.getElementById("artwork_artist");

new_artwork_button.addEventListener("click", function () {
    eventHandler();
});

keywords_input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        eventHandler();
    }
});

async function eventHandler() {
    const keywords = keywords_input.value;
    keywords_input.value = "";
    
    const req = new Request(base_url, keywords);
    const response_json = await req.send();
    const response = await response_json.json();

    const artwork = await fetchRandomArtwork(response);
    await displayArtwork(artwork);
}

async function fetchRandomArtwork(response) {
    if (response.data.length === 0) {
        throw new Error("No artworks found.");
    }
    const random_artwork = await choose_random_artwork(response.data);
    const artwork_api_link = random_artwork.api_link;

    const artwork_response_json = await fetch(artwork_api_link);
    const artwork_response = await artwork_response_json.json();
    return artwork_response;
}

async function choose_random_artwork(artworks){
    const random_index = Math.floor(Math.random() * artworks.length);
    return artworks[random_index];
}

async function displayArtwork(artwork) {
    const artwork_title = artwork.data.title;
    const artwork_author = artwork.data.artist_title;

    const image_id = artwork.data.image_id;
    const iiif_url = artwork.config.iiif_url;
    const artwork_url = `${iiif_url}/${image_id}/full/843,/0/default.jpg`;
    console.log(artwork_url);

    image.setAttribute("src", artwork_url);
    title.innerHTML = artwork_title;
    artist.innerHTML = artwork_author;
}