import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";




function AvailableMeals(props) {

  const [Meal, setMeal] = useState([])
  const [isLoading , setIsLoading] = useState(true);
  const [httpError , setHttpError] = useState(null);
  useEffect (()=>{
    const fetchMeals = async () => {
      const response = await fetch('https://foodorder-15650-default-rtdb.asia-southeast1.firebasedatabase.app/Name.json');
      if(!response.ok){
        throw new Error('Something went Wrong')
      }
      const resData = await response.json();
      const fetchedMeals = resData.meals;
      const loadedMeals = [];
      for (const key in fetchedMeals){
        loadedMeals.push({
          id: key,
          name: fetchedMeals[key].name,
          description: fetchedMeals[key].description,
          price: fetchedMeals[key].price 
        });
      }
      setMeal(loadedMeals)
      setIsLoading(false)
    }
    
      fetchMeals().catch((error)=>{
        setIsLoading(false);
      setHttpError(error.message);
      });
    
    
    
  },[])
  if(httpError){
    return(
      <section className={classes.MealError}><p>{httpError}</p></section>
    )
  }
  if(isLoading){
    return(
      <section className={classes.MealIsLoading}><p>Loading....</p></section>
    );
  }



  const mealsList = Meal.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
