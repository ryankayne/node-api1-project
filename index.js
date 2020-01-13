// implement your API here
const express = require('express');

const Users = require('./data/db.js');

const server = express();

//middleware

server.use(express.json());

server.get('/', function(request, response) {
    response.send({ Testing: '123 '})
});

// GET info from Users

server.get('/api/users', (request, response) => {
    Users.find()
    .then(users => {
        response.status(200).json(users);
    })
    .catch(error => {
        console.log(error);
        response.status(500).json({ errorMessage: "The users information could not be retrieved." })
    })
})

// GET info from Users by ID

server.get('/api/users/:id', (request, response) => {

    const id = request.params.id;
    // const userData = request.body;

    Users.findById(id)
    .then(user => {
        response.status(200).json(user);
    })
    .catch(error => {
        console.log(error);
        response.status(404).json({ message: "The user with the specified ID does not exist." })
    })
})

// CREATE info on Users

server.post('/api/users', (request, response) => {
    const userData = request.body;

    Users.insert(userData)
    .then(user => {
        if (!userData.name || !userData.bio) {
            response.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        } else {
        response.status(201).json(user);
    }
})
    .catch(error => {
        console.log(error);
        response.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    })
})

// DELETE info from User

server.delete('/api/users/:id', (request, response) => {

    const id = request.params.id;

    Users.remove(id)
    .then(deleted => {
        response.status(200).json(deleted);
    })
    .catch(error => {
        console.log(error);
        response.status(404).json({ message: "The user with the specified ID does not exist." })
    })
})

// EDIT info in User

server.put('/api/users/:id', (request, response) => {

    const id = request.params.id;
    const { name, bio } = request.body;
    const userData = { name, bio };
    
        Users.update(id, userData)
        .then(updated => {
            response.status(204).json(updated);
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({ message: "The user with the specified ID does not exist." })
        })
    })

const port = 9000;
server.listen(port, () => console.log(`\n ** new api on port: ${port} ** \n`));