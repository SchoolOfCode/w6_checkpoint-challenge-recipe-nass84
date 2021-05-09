const APP_ID = "d8fd0460";
const APP_KEY = "37050a008e4132375bf91f4f49a78d3e";

let foodToSearch = null;

function handleRecipeClick() {
  fetchRecipe(foodToSearch);
}

function handleFoodChange() {
  foodToSearch = document.querySelector("#food-input").value;
}

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
  // Change name of receipe
  let recipeName = document.getElementById("name-of-recipe");
  recipeName.innerText = recipe.recipe.label;
  // Link to get recipe
  firstRecipe.innerText = `Click here for ${recipe.recipe.label} recipe`;
  firstRecipe.href = recipe.recipe.url;
  // find image in object
  let firstRecipeImage = document.getElementById("recipe-picture");
  firstRecipeImage.src = recipe.recipe.image;
  // // add image
  document.getElementById("receipe-picture").appendChild(recipeImage);

  //--- write your code above ---
}

// - Can you add images, ingredients or other information to your page?
// - Can you have more than one recipe appear on the page with the information so people can pick from a selection?
// - Add a CSS file and style your page appropriately.
