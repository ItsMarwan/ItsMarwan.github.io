require('dotenv').config();

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;
const GUILD_ID = process.env.GUILD_ID;




const express = require('express');
const axios = require('axios');
const session = require('express-session');
require('dotenv').config();  // Load environment variables

const app = express();

// Middleware to handle sessions
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

// Root route - welcome message
app.get('/', (req, res) => {
    res.send('Welcome to the Discord OAuth2 login site!');
});

// Login route - placeholder route
app.get('/login', (req, res) => {
    res.send('Login page works!');
});

// OAuth2 callback route
app.get('/auth/callback', async (req, res) => {
    try {
        const code = req.query.code;
        if (!code) return res.send("No code provided!");

        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code,
            redirect_uri: process.env.DISCORD_REDIRECT_URI
        }).toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

        const accessToken = tokenResponse.data.access_token;

        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        res.send(`Welcome, ${userResponse.data.username}`);
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Export the app for serverless deployment
module.exports = app; // Ensure this export is in place