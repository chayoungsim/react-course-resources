import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";

type Meal = {
    id: string;
    title: string;
    slug: string;
    image: string;
    summary: string;
    creator: string;
    // meal 객체에 다른 속성이 있다면 여기에 추가할 수 있습니다.
};

type MealsGridProps = {
    meals: Meal[];
};

export default function MealsGrid({ meals }: MealsGridProps) {
    return (
        <ul className={classes.meals}>
            {meals.map((meal: Meal) => (
                <li key={meal.id}>
                    <MealItem {...meal} />
                </li>
            ))}
        </ul>
    );
}
