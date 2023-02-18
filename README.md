# social-network-api

  ![License Badge](https://img.shields.io/badge/license-MIT-brightgreen)
 ![Last Commit to Current Repo](https://img.shields.io/github/last-commit/vlad-kronk/social-network-api)
![Commits a month](https://img.shields.io/github/commit-activity/m/vlad-kronk/social-network-api)


## Description 

This social network API is a web interface used to build and maintain a database that keeps track of users, their friends, their thoughts (posts), and other users' reactions to those thoughts. It utilizes MongoDB, a NoSQL database.

## User Story

```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Table of Contents 
* [Demo](#demo)
* [Installation](#installation)
* [API routes](#api-routes)
* [Features](#features)
* [License](#license)
* [Questions](#questions)

## Demo

<a href='https://drive.google.com/file/d/1k5B6P2qxGoGeHi8rBDc2_UvnSkIZKPxg/view'>https://drive.google.com/file/d/1k5B6P2qxGoGeHi8rBDc2_UvnSkIZKPxg/view</a>


## Installation
- Run `npm i` to install the dependencies that have been loaded into the json files.
- Run `npm start` to start up the server.

## API Routes 
- **`/api/users`**
   - `GET` all users
   - `POST` a new user
```json
// required body for POST
{
  "username": "test_username",
  "email": "username@example.com"
}
```
<br>

- **`/api/users/:id`**
   - `GET` a single user
   - `PUT` to update a user's username
   - `DELETE` to delete a user and their associated thoughts
```json
// required body for PUT
{
  "username": "new_username"
}
```
<br>

- **`/api/users/:id/friends/:fid`**
   - `POST` to add a user (`:fid`) to the friends list of another user (`:id`)
   - `DELETE` to remove a user (`:fid`) from the friends list of another user (`:id`)
<br><br>

- **`/api/thoughts`**
   - `GET` all thoughts
   - `POST` a new thought
```json
// required body for POST
{
   "thoughtText": "here's a cool thought",
   "username": "test_username",
   "userId": "63edd9826a41195eb6f67f87"
}
```
<br>

- **`/api/thoughts/:id`**
   - `GET` a single thought
   - `PUT` to update a thought's text
   - `DELETE` to delete a thought and its associated reactions
```json
// required body for PUT
{
   "thoughtText": "here's some cool updated text for my thought"
}
```
<br>

- **`/api/thoughts/:id/reactions`**
   - `POST` a new reaction to a user's thought (`:id`)
```json
// required body for POST
{
   "reactionBody": "i thought this post was really neat",
   "username": "some_other_user" // user that is posting reaction
}
```
<br>

- **`/api/thoughts/:id/reactions/:rid`**
   - `DELETE` a reaction (`:rid`) to a user's thought (`:id`)

## Features

- `NoSQL` - Open-source relational database management that doesn't expost the standard structional query language (SQL)
- `express.js` - Back end web application framework for building RESTful APIs with Node.js.
- `Node.js` - Used for package managment and to execute the JavaScript code that builds the server-side command line scripting  tool.
- `JavaScript` - Used to base functionality within the application.
- `Git` - Version control system used to track source code changes.



## License

MIT License

---

## Questions?

Reach out with any questions!

GitHub: [vlad-kronk](https://github.com/vlad-kronk)

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jmeyers6/)