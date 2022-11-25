import React from 'react';

function Cards(props) {
	return (
      <div className='Card' key={props.idMeal}>
        <h3>{props.strMeal}</h3>
        <span>Origin: </span><span>{props.strArea}</span>
        <br></br>
        <img src={props.strMealThumb} alt=""></img>
        <p>{props.strInstructions}</p>
      </div>
	);
};

export default Cards;