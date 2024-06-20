const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const dbPath = './data/mydatabase.db';
const db = new sqlite3.Database(dbPath);

app.use(bodyParser.json());
app.use(cors());

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS materials (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, quantity INTEGER)");
});

app.get('/api/materials', (req, res) => {
  db.all("SELECT * FROM materials", [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

app.put('/api/materials/:id', (req, res) => {
  const { id } = req.params;
  const { quantityUsed } = req.body;

  db.get("SELECT * FROM materials WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ "error": "Material not found" });
      return;
    }

    const updatedQuantity = row.quantity - quantityUsed;

    if (updatedQuantity < 0) {
      res.status(400).json({ "error": "Not enough quantity available" });
      return;
    }

    db.run(`UPDATE materials SET quantity = quantity - ? WHERE id = ?`, [quantityUsed, id], function(err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({
        "message": "success",
        "data": { id: id, quantityUsed: quantityUsed }
      });
    });
  });
});

app.patch('/api/materials/:id/increase', (req, res) => {
  const { id } = req.params;
  const { quantityIncreased } = req.body;

  db.run(`UPDATE materials SET quantity = quantity + ? WHERE id = ?`, [quantityIncreased, id], function(err) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": { id: id, quantityIncreased: quantityIncreased }
    });
  });
});

app.post('/api/materials', (req, res) => {
  const { name, quantity } = req.body;
  db.run(`INSERT INTO materials (name, quantity) VALUES (?, ?)`,
    [name, quantity],
    function (err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({
        "message": "success",
        "data": { id: this.lastID, name, quantity }
      });
    });
});

app.delete('/api/materials/:id', (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM materials WHERE id = ?", [id], function(err) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": { id: id }
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
