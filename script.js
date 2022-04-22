const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

function searchMeal(e) {
  e.preventDefault();
  //clear single meal
  single_mealEl.innerHTML = "";
  //get search term
  const term = search.value;
  //check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search result of '${term}'</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `There is no result.Please try again!`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                           <h3>${meal.strMeal}</h3> 
                        </div>
                    </div>`
            )
            .join("");
        }
      });
    //clear search text
    search.value = "";
  } else {
    resultHeading.innerHTML = "<h2>Please type in the keywords to search</h2>";
  } 
}
//getch meal by id
function getMealByID(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
      .then((res) => res.json())
      .then((data) => {
        const meal = data.meals[0];
        addMealToDom(meal);
      });
  }
  //fetch random meal
  function randomMeal() {
    //clear meals and heading
    mealsEl.innerHTML = "";
    resultHeading.innerHTML = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then((res) => res.json())
      .then((data) => {
        const meal = data.meals[0];
        addMealToDom(meal);
      });
  }
  