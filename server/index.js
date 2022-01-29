const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //allows us to access the req.body

// ROUTES
// get all

app.get("/recipes", async (req, res) => {
    try {
        const allRecipes = await pool.query("SELECT * FROM recipes");

        res.json(allRecipes.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get one

app.get("/recipes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await pool.query("SELECT * FROM recipes WHERE recipe_id = $1", [id]);
        res.json(recipe.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// create one

app.post("/recipes", async (req, res) => {
    try {
        const { recipe_name, ingredients } = req.body;
        const newRecipe = await pool.query("INSERT INTO recipes (recipe_name, ingredients) VALUES ($1, $2) RETURNING *", [recipe_name, ingredients]);
        res.json(newRecipe.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
})

// update one

app.put("/recipes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { recipe_name, ingredients } = req.body;
        const updateRecipe = await pool.query("UPDATE recipes SET (recipe_name, ingredients) = VALUES ($1, $2) WHERE recipe_id = $3", [recipe_name, ingredients, id]);
        res.json("Todo was updated");
    } catch (err) {
        console.error(err.message);
    }
})

// delete one

app.delete("/recipes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRecipe = await pool.query("DELETE FROM recipes WHERE recipe_id = $1", [id]);
        res.json("Recipe was deleted");
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, () => {
    console.log("Server is starting on port 5000");
})