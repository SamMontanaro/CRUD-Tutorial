import React, { Fragment, useState } from "react";

const EditTodo = ({recipe}) => {
    const [recipe_name, setRecipeName] = useState(recipe.recipe_name);

    const editText = async (id) => {
        try {
            const body = { recipe_name };

            const res = await fetch(`http://localhost:5000/recipes/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-warning px-4 px-lg-5" data-bs-toggle="modal" data-bs-target={`#id${recipe.recipe_id}`}>Edit</button>

            <div className="modal fade" id={`id${recipe.recipe_id}`} onClick={() => setRecipeName(recipe.recipe_name)}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit recipe</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setRecipeName(recipe.description)}></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" value={recipe_name} onChange={e => setRecipeName(e.target.value)}></input>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setRecipeName(recipe.description)}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => editText(recipe.recipe_id)}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditTodo;