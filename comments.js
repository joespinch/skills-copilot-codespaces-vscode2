// Create web server
// npm install express
// npm install body-parser
// npm install mongoose
// npm install ejs
// npm install method-override

// Express
const express = require('express');
const app = express();

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comments', {useNewUrlParser: true, useUnifiedTopology: true});

// EJS
app.set('view engine', 'ejs');

// Method Override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});
const Comment = mongoose.model('Comment', commentSchema);

// Create
app.post('/comments', (req, res) => {
    Comment.create(req.body, (err, comment) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/comments');
        }
    });
});

// Read
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if(err) {
            console.log(err);
        } else {
            res.render('comments', {comments: comments});
        }
    });
});

// Update (Edit)
app.get('/comments/:id/edit', (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if(err) {
            console.log(err);
        } else {
            res.render('edit', {comment: comment});
        }
    });
});

// Update (Update)
app.put('/comments/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body, (err, comment) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/comments');
        }
    });
});

// Delete
app.delete('/comments/:id', (req, res) => {
    Comment.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/comments');
        }
    });
});

// Listen
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});


