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

app.get('/api/watchlist', (req, res) => {
  const sql = `
    select *
      from "watchlist"
     order by "entryId"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
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

app.delete('/api/watchlist/:deleteId', (req, res) => {
  const deleteId = parseInt(req.params.deleteId, 10);
  if (!Number.isInteger(deleteId) || deleteId <= 0) {
    res.status(400).json({
      error: '"deleteId" must be a positive integer'
    });
    return;
  }
  const sql = `
    delete from "watchlist"
    where "entryId" =  $1
    returning *;
  `;
  const params = [deleteId];
  db.query(sql, params)
    .then(result => {
      const deleteId = result.rows[0];
      if (!deleteId) {
        res.status(404).json({
          error: `Cannot find item with "deleteId" ${deleteId}`
        });
      } else {
        res.status(204).json(deleteId);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.post('/api/log', (req, res, next) => {
  const { date, showName, season, number, episodeName, rating, image } = req.body;
  const sql = `
    insert into "log" ("show", "episode name", "season", "number", "image", "date", "rating")
    values ($1, $2, $3, $4, $5, $6, $7)
    returning *
  `;
  const params = [date, showName, season, number, episodeName, rating, image];
  db.query(sql, params)
    .then(result => {
      const [entry] = result.rows;
      res.status(201).json(entry);
    })
    .catch(err => {
      console.error(err);
    });
});
