import db from "../db.js";

const movieSchema = new db.Schema({
  _id: String,
  first_name: String,
  last_name: String,
  profile_pic: String,
});

export default db.model("persons", movieSchema);
