// src/pages/BlogDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/blogs/${id}`)
      .then(res => res.json())
      .then(data => setBlog(data));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-details">
      <h1>{blog.title}</h1>
      <img src={blog.thumbnail} alt="thumbnail" />
      <p>{blog.content}</p>
      <p><em>By {blog.author} on {new Date(blog.date).toLocaleDateString()}</em></p>
    </div>
  );
}

export default BlogDetails;
