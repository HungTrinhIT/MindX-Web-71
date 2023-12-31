import express from "express";
import { v4 as uuidv4 } from "uuid";


const app = express();
const PORT = 3001;

// req.body => JS object
app.use(express.json());

let posts = [
  {
    id: "1",
    title: "Master ReactJS in 4 hours",
    description: "It's free",
    author: "Harry",
  },
  {
    id: "2",
    title: "Rap Viet mua 3",
    description: "Vong chung ket Rap Viet 3",
    author: "vieon",
  },
  {
    id: "3",
    title: "Rap Viet mua 4",
    description: "Vong chung ket Rap Viet 4",
    author: "VTV",
  },
  {
    id: "4",
    title: "Master ReactJS in 4 hours",
    description: "It's free",
    author: "Harry",
  },
  {
    id: "5",
    title: "Rap Viet mua 3",
    description: "Vong chung ket Rap Viet 3",
    author: "vieon",
  },
  {
    id: "6",
    title: "Rap Viet mua 4",
    description: "Vong chung ket Rap Viet 4",
    author: "VTV",
  },
];


app.get("/posts", (req, res) => {
  // ?page=1&per_page=5
  const { page, per_page } = req.query;

  res.json({
    data: posts,
  });
});


app.get("/posts/:id", (req, res) => {
  // Request params
  const { id } = req.params;

  const existingPost = posts.find((post) => post.id === id);

  if (!existingPost) {
    return res.json({
      message: "Post not found",
    });
  }

  res.json({ data: existingPost });
});


app.post("/posts", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({
      message: "Missing required keys",
    });
  }

  posts.push({
    id: uuidv4(),
    title,
    description,
  });

  res.json({
    data: posts,
  });
});


app.put("/posts/:id", (req, res) => {
  const body = req.body;
  const { id } = req.params;

  const existingPostIndex = posts.findIndex((post) => post.id === id);

  if (existingPostIndex === -1) {
    return res.status(400).json({
      message: "Post not found",
    });
  }

  posts[existingPostIndex] = {
    ...posts[existingPostIndex],
    ...body,
  };

  return res.json({ data: posts });
});


app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;

  const existingPostIndex = posts.findIndex((post) => post.id === id);

  if (existingPostIndex === -1) {
    return res.status(400).json({
      message: "Post not found",
    });
  }

  posts.splice(existingPostIndex, 1);
  return res.json({ data: "Delete successfully" });
});


app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});

// HTTP method
// RESTFul API
/*
    HTTP Status code
        2xx: 200, 201, 204 => Successfully

        4xx: 400, 401, 403 , 404 => Client Error

        5xx: 500,... => Server error
*/

// // http://localhost:3001/
// // HTTP Method
// app.get("/", (req, res) => {
//     res.send("Hello world, welcome to programming world");
//   });

//   app.get("/test", (req, res) => {
//     // Logic => trả về kết quả cho users
//   });

//   app.get("/ket-qua-bong-da", (req, res) => {
//     res.send("Việt Nam thắng Indonesia");
//   });

//   app.get("/users", (req, res) => {
//     res.json([
//       {
//         id: 1,
//         name: "Hung",
//       },
//       {
//         id: 2,
//         name: "Bao",
//       },
//     ]);
//   });

/*
    POST: http://localhost:3001/posts
    request

    req params => phương thức nào cũng có
    req.body
    req.query
*/
