import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
const port = 3000;
dotenv.config();
const API_URL = process.env.API_LINK;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Route to render the main page

app.get("/", async(req, res)=>{
  try{
    const response = await axios.get(`${API_URL}/posts`);
    console.log(response.data);
    res.render("index.ejs", {posts: response.data})
  }
  catch{
    res.status(500).json({ message: "Error fetching posts" });
  }
})

app.get("/about", (req, res)=>{
  res.render("about.ejs");
})

app.get("/contact", (req, res)=>{
  res.render("contact.ejs");
})


// Route to render the edit page

app.get("/new", (req, res)=>{
  res.render("modify.ejs",{heading: "NEW POST", submit: "CREATE POST"})
});

app.get("/edit/:id", async (req, res)=>{
  try{
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    res.render("modify.ejs", {heading: "EDIT POST", submit: "UPDATE POST", post: response.data});
  }
  catch{
    res.status(500).json({ message: "Error fetching posts" });
  }
});





// Create a new post


app.post("/api/posts", async (req, res)=>{
  try{
    const response = await axios.post(`${API_URL}/posts`, req.body);
    res.redirect("/")

  }
  catch{
    res.status(500).json({ message: "Error Creating posts" });
  }
})




// Partially update a post


app.post("/api/posts/:id", async(req, res)=>{
  try{
    const response = await axios.patch(`${API_URL}/posts/${req.params.id}`, req.body);
    res.redirect("/");
  }
    

  
  catch{
    res.status(500).json({ message: "Error Updating posts" });
  }
})



// Delete a post

app.get("/api/posts/delete/:id", async(req, res)=>{
  try{
    const response = await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  }
  catch{
    res.status(500).json({ message: "Error Deleting posts" });
  }
})


app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
