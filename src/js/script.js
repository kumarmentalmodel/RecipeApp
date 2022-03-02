"use strict";
const container = document.querySelector(".container");
const search = document.querySelector(".search");
let myrecipe = [];
function render(recipes) {
  // RENDER THE RECIPE LIST
  recipes.forEach((recipe, index) => {
    //   ELEMENT FOR EACH CARD
    const el = `<a href="recipe.html#${index}" class="link">
        <div class="card">
        <h3>${recipe.title}</h3>
        <div class="description">
        <span class="emoji">${recipe.emoji}</span>
        <p class="description-text">you need ${recipe.ingredients.length} ingredient for this recipe.</p>
        </div>
        </div>`;
    // INSERTING ELEMENT TO THE CONTAINER
    container.insertAdjacentHTML("beforeend", el);
  });
}

// WHENEVER THE PAGE WILL RELOAD THIS WILL RUN
function init() {
  // SET THE LOCAL STORAGE
  localStorage.setItem("recipes", JSON.stringify(reacipeData));
  // GETTING LOCAL STORAGE VALUE IF NOT PRESENT GETTING IT FROM DATA JS
  let value = JSON.parse(localStorage.getItem("recipes"));
  myrecipe = value !== null ? value : reacipeData;
  //   USING THIS FUNCTION TO RENDER LIST OF RECIPE
  render(myrecipe);
  console.log(myrecipe);
  // SEARCH FUNCTIONALITY
  // ADDING EVENT LISTENER OF INPUT TO SEARCH INPUT
  search.addEventListener("input", (e) => {
    // GET VALUE ENTERED IN SEARCH BAR
    if (e.target.value.length > 0) {
      container.innerHTML = "";
      //  Tokenize the search terms and remove empty spaces
      let tokens = e.target.value
        .toLowerCase()
        .split(" ")
        .filter(function (token) {
          return token.trim() !== "";
        });
      //   CREATES A REGULAR EXP CONTAINING ALL TOKENS
      let searchTermRegex = new RegExp(tokens.join("|"), "gim");

      let filteredList = myrecipe.filter(function (recipe) {
        // ... Code to convert recipe object to a string with ingredient,description and title ...
        let recipeString =
          recipe.title.toLowerCase() + " " + recipe.description.toLowerCase();
        for (let ingredient in recipe.ingredients) {
          recipeString +=
            " " + recipe.ingredients[ingredient].name.toLowerCase();
        }
        // Return book objects where a match is found
        return recipeString.match(searchTermRegex);
      });
      render(filteredList);
    } else {
      render(myrecipe);
    }
  });
}

init();
