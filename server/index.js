const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error-handler");
const authenticate = require("./middleware/authenticate");
require("dotenv").config();

const PORT = 4000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(authenticate);
app.use((req, res, next) => (console.log(req.path, req.method), next()));

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/teachers", require("./routes/teachers"));
app.use("/registrar", require("./routes/registrar"));
app.use("/students", require("./routes/students"));
app.use("/subjects", require("./routes/subjects"));
app.use("/grades", require("./routes/grades"));
app.use("/departments", require("./routes/departments"));

app.get("/", (req, res) => res.send("server online"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
