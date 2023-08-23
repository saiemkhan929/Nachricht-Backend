const events = require("events");
const express = require("express");
const app = express();
const joi = require("joi");
const ev = new events.EventEmitter();
const port = process.env.PORT || 3050;

//Database setting

const Mov = require("./db-models/test");

const changeStream = Mov.watch().on("change", (change) => console.log(change));

// -- Database

app.use(express.json());

// app.use((req, res, next)=>{
//   console.log(object)
// })

app.get("/", (req, res) => {
  res.status(404).send("No action will be performed!");
});

app.get("/movies", (req, res) => {
  Mov.find({}, (err, docs) => {
    if (err) return res.send({ error: err });
    res.send(docs);
  });
});

app.get("/movies/:id", (req, res) => {
  Mov.findById(req.params.id, (err, docs) => {
    if (err) return res.status(404).send({ error: err });

    res.send(docs);
  });
});

/**
 * Create movies
 */

app.post("/movies", (req, res) => {
  //let movie = { id: movies.length + 1, ...req.body };

  // validation test
  const schema = joi.object({
    name: joi.string().min(2).required(),
    des: joi.string().min(2).required(),
  });

  const { error } = schema.validate(req.body);

  // show error and stop further execution
  if (error)
    return res.status(400).send({
      err: true,
      msg: error.details[0].message,
    });

  //validation test passed
  const movie = new Mov({ ...req.body });
  movie.save((err, doc) => {
    res.send({ error: err, doc: doc });
  });
});

/**
 * Update movie
 */

app.put("/movies/update/:id", (req, res) => {
  const id = parseInt(req.params.id);

  let movie = { id, ...req.body };

  let index = movies.findIndex((m) => m.id == id);

  // send error if not found
  if (index < 0)
    return res.status(404).send({ error: true, msg: "requested id not found" });

  //validation test
  const schema = joi.object({
    name: joi.string().min(2).required(),
    des: joi.string().min(2).required(),
  });

  const { error } = schema.validate(req.body);

  // show error and stop further execution
  if (error)
    return res.status(400).send({
      err: true,
      msg: error.details[0].message,
    });

  //validation test passed
  movies.splice(index, 1, movie);

  res.send(movies);
});

/**
 * Delete movie
 */

app.delete("/movies/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);

  let index = movies.findIndex((m) => m.id == id);

  // send error if not found
  if (index < 0)
    return res.status(404).send({ error: true, msg: "requested id not found" });

  //validation test passed
  movies.splice(index, 1);

  res.send(movies);
});

app.listen(port, () => {
  console.log(`Port listening to ${port}`);
});
