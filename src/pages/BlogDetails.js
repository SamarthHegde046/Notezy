import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./BlogDetails.css";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/blogs/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Blog not found');
        }
        return res.json();
      })
      .then(data => {
        setBlog(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="blog-details-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading blog post...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="blog-details-container">
        <div className="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <Link to="/blogs" className="back-btn">← Back to Blogs</Link>
        </div>
      </main>
    );
  }

  if (!blog) return null;

  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.content.slice(0, 160),
    "image": blog.thumbnail,
    "author": {
      "@type": "Person",
      "name": blog.author || "Admin"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Notezy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://notezy.online/logo.png"
      }
    },
    "datePublished": blog.date,
    "dateModified": blog.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    }
  };

  return (
    <main className="blog-details-container">
      {/* ✅ Helmet JSON-LD Structured Data */}
      <Helmet>
        <title>{blog.title} | Notezy Blog</title>
        <meta name="description" content={blog.content.slice(0, 160)} />
        <script type="application/ld+json">
          {JSON.stringify(blogStructuredData)}
        </script>
      </Helmet>

      <nav className="blog-navigation">
        <Link to="/blogs" className="back-btn">← Back to Blogs</Link>
      </nav>

      <article className="blog-details">
        <header className="blog-header">
          <h1 className="blog-title">{blog.title}</h1>

          <div className="blog-meta">
            <address className="author-info">
              <span className="author-name">By {blog.author}</span>
              <time className="blog-date" dateTime={blog.date}>
                {new Date(blog.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </address>

            {blog.tags && blog.tags.length > 0 && (
              <section className="blog-tags" aria-label="Blog Tags">
                {blog.tags.map((tag, i) => (
                  <span className="tag-badge" key={i}>#{tag}</span>
                ))}
              </section>
            )}
          </div>
        </header>

        <figure className="blog-image">
          <img src={blog.thumbnail} alt={blog.title} />
        </figure>

        <section className="blog-content">
          <div className="content-text">
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        <footer className="blog-footer">
          <div className="blog-actions">
            <Link to="/blogs" className="back-to-blogs">← Back to All Blogs</Link>
          </div>
        </footer>
      </article>
    </main>
  );
}

export default BlogDetails;
