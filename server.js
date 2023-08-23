import express from "express";
import Persons from "./db-models/persons.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3366;

//Middleware
app.use(cors());
app.use(express.json());

/**
 * Type: Fetch Person
 * Fetch: Person details (single)
 */
app.get("/api/v1/person/:id", (req, res) => {
  Persons.findById(req.params.id, function (err, person) {
    if (err) return res.status(500).send(err);
    console.log(person);
    return res.status(200).send(person);
  });

  //res.send(req.params.id);
});

/**
 * Type: Fetch Persons
 * Fetch: Person details (single)
 */
app.get("/api/v1/persons", (req, res) => {
  Persons.find(function (err, person) {
    if (err) return res.status(500).send(err);
    console.log(person);
    return res.status(200).send(person);
  });

  //res.send(req.params.id);
});

/**
 * Type: add
 * Fetch: Person details
 */
app.post("/api/v1/person/", (req, res) => {
  Persons.create({ ...req.body })
    .then((doc) => {
      return res.status(201).send(doc);
    })
    .catch((err) => res.status(500).send(err));
});

app.listen(port, () => console.log(`Start on port ${port}`));
