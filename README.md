# Install nvm
latest stable version should work fine

# Install appropriate node version
nvm install v12.20.0

node -v

nvm ls

nvm alias default v12.20.0 (not necessary if this is your only installed node version)

# Install postgres
Install postgres and make sure it is running on port 5432

# Project setup
npm install

# Database configuration
Edit `app/config/db.config.js` with correct DB credentials.

# First run
MODE=FirstRun node server.js

# Subsequent runs
node server.js
