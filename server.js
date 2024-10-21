const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/CorsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3001;

app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Middleware for handling form data and JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/products', require('./routes/api/products'));

// JWT-protected routes
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

// 404 Handling
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// Usefull Snippets
//first 404 method. Using app.get
/* app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})
 */

/* 
//using app.all: app.all catches 404 for all HTTP methods. Note: We don't use / in app.all
app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})
 */