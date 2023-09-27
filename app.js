//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { application } = require("express");
const mongoose = require("mongoose");

const homeStartingContent = "Hello World!";
const aboutContent = "How old are you? I'm fine thank you.";
const contactContent = 'You con find me at Google by keywords "大塚宏プロジェクト" ';
const composeContent = "Leave me some message?"

const app = express();
app.locals._ = _

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//mongoose.connect("mongodb+srv://efecollins-admin:admin-efecollins-4311404114@cluster0.unuhgl6.mongodb.net/blogDB", {useNewUrlParser: true});
mongoose.connect("mongodb+srv://hung19091:1W8h2NUwNGAL2sZ1@cluster0.vk3xpnf.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
  postTitle: String,
  postBody: String
}

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("home", {homeStartingContent: homeStartingContent, posts: posts})
  })
})

app.get("/about", (req, res) => {
  res.render('about', {aboutContent: aboutContent})
})

app.get("/contact", (req, res) => {
  res.render('contact', {contactContent: contactContent})
})

app.get("/compose", (req, res) => {
  res.render('compose', {composeContent: composeContent})
})

app.post("/compose", (req, res) => {
  //{postTitle: req.body.postTitle, postBody: req.body.postBody}
  const post = new Post({
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  })
  post.save(err => {
    if(!err) {
      res.redirect("/");
    }
  });
})

app.get("/posts/:postId", (req, res) => {
  const requestedId = _.toString(req.params.postId);
  Post.findOne({_id: requestedId}, (err, post) => {
    res.render('post', {postTitle: post.postTitle, postBody: post.postBody})
  })
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
