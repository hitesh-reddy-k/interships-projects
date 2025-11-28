const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const user  = require("./routers/userrouter.js");
const note  = require("./routers/notesrouter.js");
const error = require("./utilies/error.js");
const cors = require("cors");

app.use(cors());
const { swaggerUi, swaggerSpec } = require("./swagger");

const connection = require("../backend/database/connect.js")

dotenv.config({ path: path.join(__dirname, 'env', '.env') });


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(express.json());
app.use("/user/v1", user);
app.use("/api/v1", note);

app.use(error);

//app.use("/api/v2/notes", require("./routes/v2/noteRoutes"));  //this is for versioning of api

app.get("/", (req, res) => {
    res.send("Server is Running Successfully ✨");
});


connection;
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`);
});
