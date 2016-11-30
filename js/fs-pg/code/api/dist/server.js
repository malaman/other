"use strict";
var mongoose = require("mongoose");
var express = require("express");
var index_1 = require("./controllers/index");
var port = 3030;
var app = express();
app.use('/api', index_1.controllers);
app.listen(port, '0.0.0.0', function () {
    console.log('Listening on port ' + port);
});
mongoose.connect('mongodb://172.18.0.2:27017/test');
var CatSchema = new mongoose.Schema({
    name: { type: String, required: true },
});
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});
var postSchema = new mongoose.Schema({
    _creator: { type: Number, ref: 'User' },
    title: String,
    body: String
});
var Cat = mongoose.model('Cat', CatSchema);
var User = mongoose.model('User', userSchema);
var Post = mongoose.model('Post', postSchema);
var newUser = new User({
    name: 'Andrii',
    email: 'none@none.com'
});