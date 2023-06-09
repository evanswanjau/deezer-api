import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index";

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Systems running successfully!");
});

app.use("/v1", routes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port} 🚀 `);
});
