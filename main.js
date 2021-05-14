const APP_ID = "d8fd0460";
const APP_KEY = "37050a008e4132375bf91f4f49a78d3e";

// On click of Find Recipe button this takes the input and uses that to search the API
let foodToSearch = null;

function handleRecipeClick() {
  fetchRecipe(foodToSearch);
  getSpotifyTrack(foodToSearch);
}

function handleFoodChange() {
  foodToSearch = document.querySelector("#food-input").value;
}

let input = document.getElementById("food-input");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("recipe-button").click();
  }
});

// This retrieves information from the API. Clears the information from the previous search. The loop will display the amount of items in the i === section

async function fetchRecipe(food) {
  const requestUrl = `https://api.edamam.com/search?q=${food}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20`;
  const response = await fetch(requestUrl);
  // { hits } Destructering - find the key called hits in object
  let { hits } = await response.json();
  // Clear Section
  let section = document.getElementById("recipe-container");
  section.innerHTML = "";
  // take the first 9 items of the array
  for (i = 0; i < hits.length; i++) {
    if (i === 12) {
      break;
    }
    addRecipetoHTML(hits[i].recipe);
  }
}

// This hides the images to allow space, adds a section to the HTML and adds the information from the API in that section.
// change the set attribute class to classList.add

function addRecipetoHTML(recipe) {
  // hide image
  let logoImage = document.getElementById("logoImage");
  logoImage.classList.add("hide");
  // hide logo
  let logo = document.getElementById("logo");
  logo.classList.add("hide");
  //hide bread pun
  let breadPun = document.getElementById("bread-pun");
  breadPun.classList.add("hide");
  // create container
  let sectionContainer = document.getElementById("recipe-container");
  // create section
  let section = document.createElement("section");
  sectionContainer.appendChild(section);
  // Create H2
  let h2 = document.createElement("h2");
  // section.setAttribute("id", "recipe-section");
  section.setAttribute("class", "recipe-item");
  section.appendChild(h2);
  // Add name of recipe to h2
  let nameOfRecipe = recipe.label;
  h2.innerText = nameOfRecipe;
  h2.setAttribute("id", "name-of-recipe");
  h2.setAttribute("class", "name");
  //create a tag
  let aTag = document.createElement("a");
  aTag.setAttribute("href", recipe.url);
  aTag.setAttribute("target", "_blank");
  aTag.setAttribute("id", "image-website");
  section.appendChild(aTag);
  // Show Image
  let image = document.createElement("img");
  image.setAttribute("src", recipe.image);
  image.setAttribute("alt", `Picture of ${recipe.label} receipe`);
  image.setAttribute("id", "recipe-picture");
  image.setAttribute("class", "image");
  aTag.appendChild(image);

  // create p tag
  // add ingredients
  let ingredientText = document.createElement("p");
  ingredientText.innerText = `Main Ingredients are ${recipe.ingredientLines[0]} and ${recipe.ingredientLines[1]}`;
  ingredientText.setAttribute("id", "ingredients");
  ingredientText.setAttribute("class", "information");
  section.appendChild(ingredientText);

  // add meal type
  // let mealTypeText = document.createElement("p");
  // mealTypeText.innerText = recipe.dietLabels;
  // mealTypeText.setAttribute("id", "meal-type");
  // mealTypeText.setAttribute("class", "information");
  // ingredientText.appendChild(mealTypeText);
  //Create break
  let breakTag = document.createElement("br");
  section.appendChild(breakTag);
  // Link to get recipe
  let aTag2 = document.createElement("a");
  aTag2.setAttribute("href", recipe.url);
  aTag2.setAttribute("target", "_blank");
  aTag2.setAttribute("id", "recipe-label");
  aTag2.setAttribute("class", "link");
   aTag2.innerText = `View ${recipe.label} recipe`;
  section.appendChild(aTag2);
}

// let breadPunSection = getElementById("recipe-container")

// function to fetch bread puns

async function fetchBreadPun() {
  const requestUrl = `https://my-bao-server.herokuapp.com/api/breadpuns`;
  const response = await fetch(requestUrl);
  let pun = await response.json();
  console.log(pun);
  addBreadPuntoHTML(pun);
}

// function to display bread puns in HTML

function addBreadPuntoHTML(pun) {
  // create container and clear
  let sectionContainer = document.getElementById("bread-pun");
  sectionContainer.innerHTML = "";
  // create section
  let section = document.createElement("section");
  sectionContainer.appendChild(section);
  // Create H2
  let h2 = document.createElement("h2");
  // section.setAttribute("id", "recipe-section");
  section.setAttribute("class", "pun");
  section.appendChild(h2);
  // Add name of recipe to h2
  let breadPun = pun;
  h2.innerText = breadPun;
  h2.setAttribute("id", "bread-pun");
  h2.setAttribute("class", "name");
}
// Third Api added as a joint project with Max Edwards to play random spotify track
// Plan
// Find API that will use input to search for a song
// Get random track
// Play song on the site

async function getSpotifyTrack(searchTerm) {
  
  const appID = "ea810eaba96447188795f462bd108f12";
  const appSecret = "7631eef9f27842688636afe3c7eb4913";
  const base64Auth = "Basic " + btoa(appID + ":" + appSecret);

  const authResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: base64Auth,
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  const authJSON = await authResponse.json();
  // Token that allows permission to do certain things. More secure than adding user name. Shouldnt really put these things in code but we created a dummy account
  const OAuth = "Bearer " + authJSON.access_token;
  const url = `https://api.spotify.com/v1/search?q=${searchTerm}&type=track&market=GB`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: OAuth,
    },
  });
  const json = await response.json();
  // const id = json.tracks.items[0].id;
  // get random track
  const id =
    json.tracks.items[Math.floor(Math.random() * json.tracks.items.length)].id;
  const src = `https://open.spotify.com/embed/track/${id}`;
  const iframe = document.createElement("iframe");
  // create the iframe to embed the spotify player
  iframe.setAttribute("src", src);
  iframe.setAttribute("width", "280");
  iframe.setAttribute("height", "80");
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allowtransparency", "true");
  iframe.setAttribute("allow", "encrypted-media");
  // Clear previous player and add to html
  const spotifySection = document.getElementById("spotify");
  spotifySection.innerHTML = "";
  spotifySection.appendChild(iframe);
}
