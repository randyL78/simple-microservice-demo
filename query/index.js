const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  console.log('Recieved Event', type);

  if (type === 'PostCreated') {
    const { title, id } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    const post = posts[postId];
    post.comments.push({ id, content });
  }

  console.log(posts);

  res.send({});
});

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.listen(4002, () => {
  console.log("Listening on port 4002");
})