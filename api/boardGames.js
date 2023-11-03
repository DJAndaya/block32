const express = require('express');
const router = express.Router();
const pool = require("../db/client");

// GET - /api/board-games - get all board games
router.get('/', async (req, res) => {
    try {
      const query = "SELECT * FROM boardgames"
      const result = await pool.query(query)
      return res.json(result.rows)
    } catch (error) {
      next(error)
    }
});

// GET - /api/board-games/:id - get a single board game by id
router.get('/:id', async (req, res) => {
    try {
      const query = "SELECT * FROM boardgames WHERE id = $1"
      const values = [req.params.id]
      const result = await pool.query(query, values)
      return res.json(result.rows[0])
    } catch (error) {
      return res.json(error)
    }
});


// POST - /api/board-games - create a new board game
router.post('/', async (req, res) => {
    try {
      const { name, description, price, in_stock, is_popular, img_url } = req.body
      const query = "INSERT INTO boardgames (name, description, price, in_stock, is_popular, img_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"
      const values = [name, description, price, in_stock, is_popular, img_url]
      const result = await pool.query(query, values)
      return res.json(result.rows[0])
    } catch (error) {
      res.json(error);
    }
});

// PUT - /api/board-games/:id - update a single board game by id
router.put('/:id', async (req, res) => {
    try {
        const { name, description, price, in_stock, is_popular, img_url } = req.body;
        const query = "UPDATE boardgames SET name = $1, description = $2, price = $3, in_stock = $4, is_popular = $5, img_url = $6 WHERE id = $7 RETURNING *";
        const values = [name, description, price, in_stock, is_popular, img_url, req.params.id];
        const result = await pool.query(query, values);
        return res.json(result.rows[0]);
    } catch (error) {
       
    }
});

// DELETE - /api/board-games/:id - delete a single board game by id
router.delete('/:id', async (req, res) => {
    try {
      
    } catch (error) {
       
    }
});

module.exports = router;