const express = require("express");
const router = express.Router();
const pool = require("../db/client");

// GET - /api/video-games - get all video games
router.get("/", async (req, res, next) => {
  try {
    const query = "SELECT * FROM videogames";
    const result = await pool.query(query);
    return res.json(result.rows)
  
  } catch (error) {
    next(error);
  }
});

// GET - /api/video-games/:id - get a single video game by id
router.get("/:id", async (req, res, next) => {
  try {

    const query = "SELECT * FROM videogames WHERE id = $1";
    const values = [req.params.id];
    const result = await pool.query(query, values);
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json(error)
  }
});

// POST - /api/video-games - create a new video game
router.post("/", async (req, res, next) => {
  try {
    const { name, description, price, in_stock, is_popular, img_url } = req.body;
    const query = "INSERT INTO videogames (name, description, price, in_stock, is_popular, img_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values= [name, description, price, in_stock, is_popular, img_url];
    const result = await pool.query(query, values);
    return res.json(result.rows[0])
  } catch (error) {
    res.send(error);
  }
});

// PUT - /api/video-games/:id - update a single video game by id
router.put("/:id", async (req, res, next) => {
  try {
    const { name, description, price, in_stock, is_popular, img_url } = req.body;
    const query = "UPDATE videogames SET name = $1, description = $2, price = $3, in_stock = $4, is_popular = $5, img_url = $6 WHERE id = $7 RETURNING *";
    const values = [name, description, price, in_stock, is_popular, img_url, req.params.id];
    const result = await pool.query(query, values);
    return res.json(result.rows[0]);
  } catch (error) {
    res.send(error)
  }
});

// DELETE - /api/video-games/:id - delete a single video game by id
router.delete("/:id", async (req, res, next) => {
    try {
        const query = "DELETE FROM videogames WHERE id = $1 RETURNING *";
        const values = [req.params.id];
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;
