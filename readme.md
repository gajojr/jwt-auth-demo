# JWT-AUTH DEMO!

This is jwt-auth demo, use **npm install** to get all of the dependencies

# DB

This project uses **MongoDB** and **mongoose** npm package, in this example I connected to a local db because I can set it up easy and view it in compass or via cmd. If you want to use **mongodb atlas**, feel free to do it, but change uri in connection string

## Production

It's recommended to use .env which you will put in root of your project, there you should put your mongodb connection string and any other sensitive data.

## HTTP requests
To test this application I used rest client, that's vs code extension, which allows me to easily make HTTP requests, you can see all the requests I used to test this app, first you should create user, then try to login, logout from one session or all sessions. To use rest.rest you'll need to install vs code [extension]