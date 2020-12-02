const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

// Andmebaasiga ühendamine
mongoose.connect('mongodb+srv://sten:FkZ2d1TyuUcLY0S3@cluster0.tfrcg.mongodb.net/node-angular?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to db!')
    })
    .catch(() => {
        console.log('Error with db connection!')
    });
// DB parool FkZ2d1TyuUcLY0S3


const app = express();

app.use(bodyParser.json());

// CORS errori jaoks. Lubab suhelda erinevatel serveritel(front ja backendil)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post('/api/posts', (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully!',
            postId: createdPost._id
        });
    });
});

app.get('/api/posts',(res) => {
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: 'Posts fetched succesfully!',
                posts: documents
            });
        });
});

app.delete('/api/posts/:id', (req, res) => {
    Post.deleteOne({_id: req.params.id}).then(result =>
        console.log(result));
        res.status(200).json({message: 'post deleted!'});
});

module.exports = app;