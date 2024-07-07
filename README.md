<h1>Assignment for Backend Developer Role</h1>

## Project Overview

A Secure and Scalable SaaS application backend that allows users to register, log in, and manage a
personal notes system.

<b>Tech Stacks :</b> NodeJs, Express and MongoDB. <br>
<b>Deployment :</b> https://secureu-assignment.onrender.com/ <br>
<i>Tags - </i>#node #express #monogdb

## POSTMAN Collection
To Test the APIs Check the Postman Collection 
<h4>https://documenter.getpostman.com/view/23237073/2sA3e1Bq8k</h4>

## Installation

Clone the repository from GitHub repo <a href="https://github.com/codewithfaizan/SECUREU-Assignment">SECUREU-Assignment</a>. <b> Note : This Application requires a .env file setup </b>

```bash
git clone git@github.com:codewithfaizan/SECUREU-Assignment.git
cd SECUREU-Assignment/
```
Install the dependencies
```bash
npm install
```
Create a .env file
```bash
touch .env
```
Copy paste the below script inside the .env file and Add the mongoDB srv string

```bash
// .env
PORT = 3000
MONGODB_SRV= 'YOUR MONGO-URI'
```
## Development
Start the server
```bash
npm start
```

## Features
### Authentication
- Session Based Authentication - 
- User will receive a unique token upon successful login, This token is set to the headers of each request for authentication.

## API Endpoints 
<h4>Public</h4>

<ul> 
<li>POST /auth/signup - Register.</li>
<li>POST /auth/login - Log in.</li>
<li>GET /auth/profile - Get Profile </li>
<li>PUT /auth/profile - Profile Update.</li>
</ul>
<h4>Notes </h4>
<ul>
<li>GET /api/notes - get a list of all notes for the authenticated user.</li>
<li>GET /api/notes/:id - get a note by ID for the authenticated user.</li>
<li>POST /api/notes - Create a new note for the authenticated user.</li>
<li>PUT /api/notes/:id - update an existing note by ID.</li>
<li>DELETE /api/notes/:id - delete a note by ID.</li>
<li>DELETE /api/notes - delete all note .</li>

</ul>

## Npm packages used and their usage
- "bcrypt": "^5.1.1" --to securely hash the password
- "cors": "^2.8.5" --to enable Cross-Origin Resource Sharing (CORS)
- "dotenv": "^16.3.1" --to load environment variables from a .env file 
- "express": "^4.18.2" --to create an express application
- "express-validator": "^7.0.1" --to wrap the handler with middleware for body validations
- "mongoose": "^8.0.3" --to define schemas, models, and interact with MongoDB 
- "morgan": "^1.10.0" --to log HTTP requests and information about incoming requests,helps in debugging, monitoring, and analyzing the behavior of the application
- "nodemon": "^3.0.2" --it is a tool to automatically restart the application whenever there are any changes in the source code

## Questions
If you have any questions related to the Assignment submission, Contact me at <a mailto="realfaizan01@gmail.com"> realfaizan01@gmail.com</a>.