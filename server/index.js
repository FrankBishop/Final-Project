require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const app = express();
const pg = require('pg');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(staticMiddleware);
app.use(express.json());

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

app.post('/api/watchlist', (req, res, next) => {
  const { show, episodeName, season, number, image, isWatched = false } = req.body;
  const sql = `
    insert into "watchlist" ("show", "episode name", "season", "number", "image", "isWatched")
    values ($1, $2, $3, $4, $5, $6)
    returning *
  `;
  const params = [show, episodeName, season, number, image, isWatched];
  db.query(sql, params)
    .then(result => {
      const [episode] = result.rows;
      res.status(201).json(episode);
    })
    .catch(err => {
      console.error(err);
    });
});
