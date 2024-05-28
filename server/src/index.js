import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
import { connectToDatabase } from "./db.js";
import routes from "./routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8082;


import authRoutes from "./auth.js";

const router = express.Router();

router.use("/auth", authRoutes);

app.use(compression());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "'unsafe-inline'"],
    },
  })
);

// Configure CORS
const corsOptions = {
  origin: '*', // Allow all origins. Adjust this to your specific needs.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Define routes below
app.get("/", (req, res) => {
  res.send("<h1>👋🏻 Hello from the Lern server!</h1>");
});

app.use("/api", routes);

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`🗄️  Express server listening on port ${port}`);
  });
});
