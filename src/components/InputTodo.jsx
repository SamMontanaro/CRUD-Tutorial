import React, { Fragment, useState } from 'react';

const InputTodo = () => {
    const [recipe_name, setRecipeName] = useState("");
    const [ingredientsCount, setIngredientsCount] = useState(3);

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            let ingredients = [];
            Array.from(document.querySelectorAll("li input")).forEach(input => {
                ingredients.push(input.value);
            })

            const body = { recipe_name, ingredients };
            const response = await fetch("http://localhost:5000/recipes", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(body)})
            
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    const addInputRow = (e) => {
        e.preventDefault();
        setIngredientsCount(ingredientsCount + 1)
    }

    const removeInputRow = (e) => {
        e.preventDefault();
        if (ingredientsCount > 1) {
            setIngredientsCount(ingredientsCount - 1);
        }
    }

    return (
    <Fragment>
        <h1 className='text-center my-5'>Recipes List</h1>
        <form className='d-flex pb-5' onSubmit={onSubmitForm}>
            <div className="card w-100">
                <div className="card-header">
                <input required type="text" placeholder='Add Recipe Name' className='form-control' onChange={e => setRecipeName(e.target.value)}></input>
                </div>
                <ul className="list-group list-group-flush">
                    {
                        new Array(ingredientsCount).fill().map((item, idx) => {
                            return (<li key={idx} required className="list-group-item d-flex"><input type="text" placeholder='Add ingredient...' className='form-control'></input></li>)
                        })
                    }
                </ul>
                <div className='card-footer d-flex'>
                    <button className='btn btn-primary w-50' onClick={addInputRow}>Add new ingredient</button>
                    <button className='btn btn-danger w-50' onClick={removeInputRow}>Remove last ingredient</button>
                </div>
            </div>
            <button className='btn btn-success col-sm-2 col-md-1'>Add</button>
        </form>
    </Fragment>)
}

export default InputTodo;