import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Blogs.css";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/blogs`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          console.error("Invalid response:", data);
          setBlogs([]);
        }
      });
  }, []);

  // Function to limit content preview to 50 words
  const getContentPreview = (content = "", wordCount = 50) => {
    return content.split(" ").slice(0, wordCount).join(" ") + " ...";
  };

  return (
    <div className="blogs-container">
      <h1>Our Latest Blogs</h1>
      <div className="blog-list">
        {blogs.map(blog => (
          <div key={blog._id} className="blog-card">
            <img src={blog.thumbnail} alt="thumbnail" />
            <div className="blog-content">
              <h3>{blog.title}</h3>
              <p>{getContentPreview(blog.content)}</p>

              {/* Tags */}
              <div className="blog-tags">
                {blog.tags?.map((tag, i) => (
                  <span className="tag-badge" key={i}>#{tag}</span>
                ))}
              </div>

              <div className="blog-footer">
                <small>{new Date(blog.date).toLocaleDateString()}</small>
                <Link to={`/blogs/${blog._id}`} className="read-more-btn">Read More →</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
