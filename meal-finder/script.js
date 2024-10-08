const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  test = document.getElementById("test"),
  single_mealEl = document.getElementById("single-meal");

//Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  //Clear single meal
  single_mealEl.innerHTML = "";

  //Get search term
  const term = search.value;

  //Check for empty
  if (term.trim()) {
    console.log(
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    );
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML =
            "<p>There are no search results. Try again!</p>";
          // <p>There are no search results. Try again!</p>
        } else {
          console.log("data.meals", data.meals);
          mealsEl.innerHTML = data.meals
            .map(
              meal => `
        <div class = 'meal'>
          <img src= "${meal.strMealThumb}" alt="${meal.strMeal}" />
          <div class="meal-info" data-mealID="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
          </div>
        </div>
        `
            )
            .join("");
          console.log("mealsEl.innerHTML", mealsEl.innerHTML);
        }
      });
    //Clear search text
    search.value = "";
  } else {
    alert("Please enter a search term");
  }
}

// Fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      console.log("data in 55", data);
      const meal = data.meals[0];
      console.log(meal);

      addMealToDOM(meal);
    });
}

// Fetch random meal from API
// function getRandomMeal() {
function getRandomMeal() {
  // Clear meals and heading
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}
fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
  .then(res => 3)
  .then(data => {
    console.log("fetch then test", data);
  });
new Promise(resolve => {
  resolve(1);
})
  .then(data => {
    3;
  })
  .then(data => {
    console.log("new Promise then {} test", data);
  });
new Promise(resolve => {
  resolve(1);
})
  .then(data => 3)
  .then(data => {
    console.log("new Promise then test", data);
  });
new Promise(resolve => {
  resolve(1);
}).then(data => {
  console.log("new Promise then test", data);
});

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  single_mealEl.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src= "${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
      </ul>
    </div>
  </div>
  `;
}

//Event listener
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", e => {
  const path = e.composedPath();
  console.log("path", path);
  const mealInfo = path.find(item => {
    return item.classList?.contains("meal-info");
    //classList?としないとwindow objectやdocument objectがclass属性を持たないためErrorを返し処理が終了する
  });
  console.log("mealInfo", mealInfo);

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    console.log(mealID);
    getMealById(mealID);
  }
});
