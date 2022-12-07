import { MongoClient } from 'mongodb';
// const { MongoClient, ServerApiVersion } = require('mongodb');
async function handle(req, res) {
  const postId = req.query.postId;
  const client = await MongoClient.connect(
    'mongodb+srv://zyq9613:xE6ONJWsCYihYW78@cluster0.aytdyya.mongodb.net/?retryWrites=true&w=majority'
  );
  if (req.method == 'GET') {
    const db = client.db('events');
    const comments = await db.collection('comments').find().sort({ _id: -1 }).toArray();
    const responce = comments.filter((item) => item.postId == postId);
    res.status(200).json({ code: 'R000', data: responce });
  }

  if (req.method == 'POST') {
    const { comment, createTime } = req.body;
    console.log(req.body);
    if (!comment || !createTime || comment.trim() === '' || createTime.trim() === '') {
      res.status(200).json({ code: 'R101' });
      return;
    }
    const newComment = {
      comment,
      createTime,
      postId,
    };
    const db = client.db('events');
    await db.collection('comments').insertOne(newComment);
    res.status(200).json({ code: 'R000' });
  }
  client.close();
}

export default handle;
