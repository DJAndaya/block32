const client = require('./client');
const util = require('util');

const REPLACE_ME = 'HELP REPLACE ME!!!!';

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
        const { rows: videoGames } = await client.query("SELECT * FROM videogames");
        return videoGames;
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
    try {
        const { name, description, price, in_stock, is_popular, img_url } = body;
        const query =
       "INSERT INTO videogames(name, description, price, in_stock, is_popular, img_url) VALUES($1, $2, $3, $4, $5, $6)RETURNING *";
        const values = [name, description, price, in_stock, is_popular, img_url];
        const result = await client.query(query, values);
        // return result
    } catch (error) {
        throw new Error("Error saving video game")
    }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
    // LOGIC GOES HERE
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    // LOGIC GOES HERE
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}