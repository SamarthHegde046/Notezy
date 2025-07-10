import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
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
      })
      .catch(err => {
        console.error("Failed to fetch blogs:", err);
        setBlogs([]);
      });
  }, []);

  const getContentPreview = (content = "", wordCount = 50) => {
    return content.split(" ").slice(0, wordCount).join(" ") + " ...";
  };

  return (
    <main className="blogs-container">
      <Helmet>
        <title>Blogs | Notezy</title>
        <meta name="description" content="Explore insightful blogs on study tips, VTU resources, and academic hacks written by the Notezy team." />
      </Helmet>

      <header className="blogs-header">
        <h1>Our Latest Blogs</h1>
        <p>Discover insights, tips, and stories from our team</p>
      </header>

      <section className="blog-grid">
        {blogs.length === 0 ? (
          <p className="no-blogs">No blogs found. Please check back later!</p>
        ) : (
          blogs.map(blog => (
            <article key={blog._id} className="blog-card">
              <div className="blog-image">
                <img
                  src={blog.thumbnail}
                  alt={blog.title || "Blog Thumbnail"}
                  loading="lazy"
                />
              </div>

              <div className="blog-content">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-excerpt">{getContentPreview(blog.content)}</p>

                {blog.tags?.length > 0 && (
                  <div className="blog-tags">
                    {blog.tags.map((tag, i) => (
                      <span className="tag-badge" key={i}>#{tag}</span>
                    ))}
                  </div>
                )}

                <footer className="blog-footer">
                  <time className="blog-date">
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </time>
                  <Link to={`/blogs/${blog._id}`} className="read-more-btn">
                    Read More →
                  </Link>
                </footer>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default Blogs;
