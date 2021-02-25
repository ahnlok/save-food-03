// Required Routes
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes")

const app = express();

// PORT
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (Heroku)
// if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
// }

// Add routes, both API and view
/* app.use(routes); */

// Connect to the Mongo DB
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/savefood",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("Successfully connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB" , err);
    });

    app.get("/api/config", (req, res) => {
        res.json({
            success: true,
        })
    });

    app.use(routes);

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "client/build/index.html"));
    });
    // Listener
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    })


