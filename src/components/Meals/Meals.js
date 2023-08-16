import React from "react";
import AvailableMeals from "./Avilable";
import MealsSummary from "./MealsSummary"

const Meals = (props) =>{
    return(
        <React.Fragment>
            <MealsSummary />
            <AvailableMeals />
        </React.Fragment>
    );
}

export default Meals;