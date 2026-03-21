import e, { urlencoded } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { indexRouter } from "./routes/indexRouter.js";
import session from "express-session";
import { reportRouter } from "./routes/reportRouter.js";

dotenv.config();

const app = e();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsPath = path.join(__dirname, "public");
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(e.static(assetsPath));
app.use(urlencoded({ extended: true }));
app.use(e.json());

app.use(
  session({
    //TODO! PUT IN .ENV!
    secret: "oatches",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "strict",
    },
  }),
);

//--------routes-----------

app.use("/", indexRouter);
app.use("/clicked", reportRouter);

//---------port and error handling---------
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).render("500");
});
