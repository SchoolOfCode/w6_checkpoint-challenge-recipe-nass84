const APP_ID = "d8fd0460";
const APP_KEY = "37050a008e4132375bf91f4f49a78d3e";

let foodToSearch = null;

function handleRecipeClick() {
  fetchRecipe(foodToSearch);
}

function handleFoodChange() {
  foodToSearch = document.querySelector("#food-input").value;
}

// async function fetchRecipe(food) {
//   //--- write your code below ---
//   // remove text from recipe label
//   let firstRecipe = document.getElementById("recipe-label");
//   firstRecipe.innerText = "";
//   const requestUrl = `https://api.edamam.com/search?q=${food}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20`;
//   const response = await fetch(requestUrl);
//   const data = await response.json();
//   console.log(data);
//   const recipe = data.hits[0];
//   // Change name of receipe
//   let recipeName = document.getElementById("name-of-recipe");
//   recipeName.innerText = recipe.recipe.label;
//   // Link to get recipe
//   firstRecipe.innerText = `Click here for full ${recipe.recipe.label} recipe`;
//   firstRecipe.href = recipe.recipe.url;
//     // // add image
//   let firstRecipeImage = document.getElementById("recipe-picture");
//   firstRecipeImage.src = recipe.recipe.image;
// // add ingredients
// let ingredients = document.getElementById("ingredients");
// ingredients.innerText = `Main Ingredients are ${recipe.recipe.ingredientLines[0]} and ${recipe.recipe.ingredientLines[1]} and ${recipe.recipe.ingredientLines[2]}`;

//   //--- write your code above ---
// }

// - Can you have more than one recipe appear on the page with the information so people can pick from a selection?

async function fetchRecipe(food) {
  //--- write your code below ---
  // remove text from recipe label
  let firstRecipe = document.getElementById("recipe-label");
  firstRecipe.innerText = "";
  const requestUrl = `https://api.edamam.com/search?q=${food}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20`;
  const response = await fetch(requestUrl);
  const data = await response.json();
  console.log(data);
  const recipe = data.hits[0];
  // hide picture
  let questionImage = document.getElementById("questionImage");
  questionImage.classList.add("hide");
  // Change name of receipe
  let recipeName = document.getElementById("name-of-recipe");
  recipeName.innerText = recipe.recipe.label;
  // Link to get recipe
  firstRecipe.innerText = `Click here for full ${recipe.recipe.label} recipe`;
  firstRecipe.href = recipe.recipe.url;
  // // add image
  let firstRecipeImage = document.getElementById("recipe-picture");
  firstRecipeImage.src = recipe.recipe.image;
  firstRecipeImage.alt = "picture of cooked receipe";
  // add ingredients
  let ingredients = document.getElementById("ingredients");
  ingredients.innerText = `Main Ingredients are ${recipe.recipe.ingredientLines[0]} and ${recipe.recipe.ingredientLines[1]} and ${recipe.recipe.ingredientLines[2]}`;

  //--- second Receipe---
  const recipe2 = data.hits[1];
  // Change name of receipe
  let recipeName2 = document.getElementById("name-of-recipe2");
  recipeName2.innerText = recipe2.recipe.label;
  // Link to get recipe
  let secondRecipe = document.getElementById("recipe-label2");
  secondRecipe.innerText = `Click here for full ${recipe2.recipe.label} recipe`;
  secondRecipe.href = recipe2.recipe.url;
  // // add image
  let secondRecipeImage = document.getElementById("recipe-picture2");
  secondRecipeImage.src = recipe2.recipe.image;
  secondRecipeImage.alt = "picture of cooked receipe";
  // add ingredients
  let ingredients2 = document.getElementById("ingredients2");
  ingredients2.innerText = `Main Ingredients are ${recipe2.recipe.ingredientLines[0]} and ${recipe2.recipe.ingredientLines[1]} and ${recipe2.recipe.ingredientLines[2]}`;
}

// - Add a CSS file and style your page appropriately.
