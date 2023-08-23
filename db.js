import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://saiem_khan:kOZ8KUEuPCDkoB9z@cluster0.cuctq.mongodb.net/nachricht?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("We are conncected to database");
});

export default mongoose;
