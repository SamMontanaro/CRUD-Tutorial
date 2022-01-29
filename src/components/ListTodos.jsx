import React, { Fragment, useState, useEffect } from 'react';
import EditTodo from './EditTodo';

const ListTodos = () => {
    const [recipes, setRecipes] = useState([]);

    const deleteRecipe = async (id) => {
        try {
            await fetch(`http://localhost:5000/recipes/${id}`, {
                method: "DELETE"
            });

            setRecipes(recipes.filter(recipe => recipe.recipe_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    const getRecipes = async () => {
        const res = await fetch("http://localhost:5000/recipes");
        const recipesArray = await res.json();
        setRecipes(recipesArray);
    }

    useEffect(() => {
        getRecipes();
    }, []);

    return (
        <Fragment>
            <div className='container'>
                <div className='row px-0'>
                    {
                        recipes.map(recipe => {
                            return (
                                <div key={recipe.recipe_id} className="card col-md-6">
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title text-center">{recipe.recipe_name}</h5>
                                        <div className='card-text text-center'>
                                            <ul>
                                                {
                                                    recipe.ingredients.map((item, idx) => {
                                                        return <li key={idx}>{item}</li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        <div className='d-flex justify-content-evenly mt-auto'>
                                            <span className='px-5'><EditTodo recipe={recipe} /></span>
                                            <button className='btn btn-danger px-4 px-lg-5' onClick={() => deleteRecipe(recipe.recipe_id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default ListTodos;