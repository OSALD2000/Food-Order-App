import React, { useEffect, useState } from "react";
import classes from "./Avilable.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";

const AvailableMeals = (props) => {
  const [mealsList, setMealList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const response = await fetch(
        "https://react-4d965-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMealList(loadedMeals);
      setIsLoading(false);
    };

    fetchData().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
      console.log(error.message);
    });
  }, []);

  const fetchedMealList = mealsList.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      mealName={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (isLoading) {
    return (
      <section className={classes.meals}>
        <span className={classes["loader"]}></span>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.meals}>
        <p className={classes.errorMessage}>{httpError}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{fetchedMealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
