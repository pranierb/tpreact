import React, {useState, useEffect} from "react";
import axios from "axios";
import Cards from "./Cards.js";

function Recettes() {

  const [meals, setMeals] = useState();
  const [search, setSearch] = useState("");
  var allMeals = "";

  useEffect(() => {
    console.log("[TEST 1]");
    axios.get("https://www.themealdb.com/api/json/v1/1/search.php", {params: {s: search}}).then(response => {
      setMeals(response.data.meals);
    });
  }, [search]);

  if ((meals !== undefined) && (meals !== null)) {
    allMeals = meals.sort((a, b) => a.strMeal.localeCompare(b.strMeal)).map((meal) => Cards(meal));
  }

  function prepareSearch(search) {
    if (search !== undefined) {
      setSearch(search.trim())
    }
    else {
      setSearch("");
    }
  }

  return (
	<div>
		<h2>Appli recette de cuisine</h2>
		<input placeholder="Taper le nom d'un aliment (en anglais)" onChange={elem => prepareSearch(elem.target.value)}></input>
		<div id="Results">{allMeals}</div>
	</div>
  );
}

export default Recettes;