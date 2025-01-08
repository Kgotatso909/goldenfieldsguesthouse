require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

// Import routes
const contactRoutes = require("./routes/contact");
const bookingsRoutes = require("./routes/bookings");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();
const port = 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views", "pages"));

//Session setup
app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Home route (index)
app.get("/", (req, res) => {
  res.render("index");
});

// Additional Routes for other pages
app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/gallery", (req, res) => {
  res.render("gallery");
});

app.get("/terms", (req, res) => {
  res.render("terms");
});

app.get("/privacy", (req, res) => {
  res.render("privacy");
});

// Use routes
app.use("/contact", contactRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

//Admin email page route (only accessible to logged-in users)
app.get("/admin-email", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }
  res.render("adminEmail");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
