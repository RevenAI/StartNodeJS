const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    
    // Log cookies for debugging purposes
    console.log("Received cookies:", cookies);
    
    if (!cookies?.jwt) return res.sendStatus(401);
    
    const refreshToken = cookies.jwt;

    // Log refresh token and stored users
    console.log("Sent refresh token:", refreshToken);
    console.log("Stored users:", usersDB.users);

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        console.log("Refresh token not associated with any user");
        return res.sendStatus(403); // Forbidden  
    }

    // Evaluate JWT
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                console.log("Token verification error:", err);
                return res.sendStatus(403); // Forbidden
            }
            console.log("Decoded token:", decoded);
            if (foundUser.username !== decoded.username) return res.sendStatus(403);

            // If everything is good, generate a new access token
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1m' }
            );
            res.json({ accessToken });
        }
    );
}

module.exports = { handleRefreshToken };
