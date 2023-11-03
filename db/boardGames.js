const client = require('./client');
const util = require('util');

// GET - /api/board-games - get all board games
async function getAllBoardGames() {
    try {
        const { rows: boardGames } = await client.query(`
            SELECT * FROM boardgames;
        `);
        return boardGames;
    } catch (err) {
        throw err;
    }
}

// GET - /api/board-games/:id - get a single board game by id
async function getBoardGameById(id) {
    try {
        const { rows: [boardGame] } = await client.query(`
            SELECT * FROM boardgames
            WHERE id = $1;
        `, [id]);
        return boardGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/board-games - create a new board game
async function createBoardGame(body) {
    const { name, description, price, in_stock, is_popular, img_url } = body;
    try {
        const query = `

            INSERT INTO boardgames(name, description, price, in_stock, is_popular, img_url)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;`

        const values = [name, description, price, in_stock, is_popular, img_url];
        const result = await client.query(query, values);


        // return boardGame;
    } catch (error) {
        throw error;
    }
}

// PUT - /api/board-games/:id - update a single board game by id
async function updateBoardGame(id, fields = {}) {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (setString.length === 0) {
        return;
    }
    try {
        const { rows: [boardGame] } = await client.query(`
            UPDATE boardgames
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return boardGame;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/board-games/:id - delete a single board game by id
async function deleteBoardGame(id) {
    try {
        const { rows: [boardGame] } = await client.query(`
            DELETE FROM boardgames
            WHERE id=$1
            RETURNING *;
        `, [id]);
        return boardGame;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllBoardGames,
    getBoardGameById,
    createBoardGame,
    updateBoardGame,
    deleteBoardGame
}