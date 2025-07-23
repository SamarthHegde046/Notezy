import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { getAllBlogs } from "./BlogData";
import "./Blogs.css";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cloudMetrics, setCloudMetrics] = useState({});

  useEffect(() => {
    fetchBlogs();
    loadLikedBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get blogs from local data
      const localBlogs = getAllBlogs();
      if (localBlogs && localBlogs.length > 0) {
        setBlogs(localBlogs);
        
        // Fetch engagement metrics for all blogs from cloud
        await fetchAllCloudMetrics(localBlogs.map(blog => blog.id));
        
        setLoading(false);
        return;
      }

      // Fallback: if no local data, set empty
      setBlogs([]);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setError(err.message);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCloudMetrics = async (blogIds) => {
    try {
      const metricsPromises = blogIds.map(async (blogId) => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_BASE}/blogs/${blogId}/metrics`);
          if (response.ok) {
            const metrics = await response.json();
            return { blogId, metrics };
          }
        } catch (error) {
          console.log(`Could not fetch metrics for blog ${blogId}`);
        }
        return { blogId, metrics: { likesCount: 0, viewsCount: 0 } };
      });

      const results = await Promise.all(metricsPromises);
      const metricsMap = {};
      
      results.forEach(({ blogId, metrics }) => {
        metricsMap[blogId] = metrics;
      });
      
      setCloudMetrics(metricsMap);
    } catch (error) {
      console.log('Using local metrics fallback');
    }
  };

  const loadLikedBlogs = () => {
    const savedLikes = localStorage.getItem('likedBlogs');
    if (savedLikes) {
      try {
        setLikedBlogs(new Set(JSON.parse(savedLikes)));
      } catch (err) {
        console.error('Error loading liked blogs:', err);
        setLikedBlogs(new Set());
      }
    }
  };

  const getContentPreview = (content = "", wordCount = 50) => {
  // Remove all HTML tags
  const plainContent = content
    .replace(/<[^>]*>/g, " ")   // remove HTML tags
    .replace(/\s+/g, " ")       // normalize extra spaces
    .trim();

  const words = plainContent.split(" ");
  const preview = words.slice(0, wordCount).join(" ");

  return preview + (words.length > wordCount ? "..." : "");
};


  const handleLike = async (blogId, isCurrentlyLiked) => {
    try {
      // Update UI immediately for better UX
      setCloudMetrics(prev => ({
        ...prev,
        [blogId]: {
          ...prev[blogId],
          likesCount: isCurrentlyLiked 
            ? Math.max((prev[blogId]?.likesCount || 0) - 1, 0)
            : (prev[blogId]?.likesCount || 0) + 1
        }
      }));

      // Update liked blogs state
      const newLikedBlogs = new Set(likedBlogs);
      if (isCurrentlyLiked) {
        newLikedBlogs.delete(blogId);
      } else {
        newLikedBlogs.add(blogId);
      }
      setLikedBlogs(newLikedBlogs);

      // Save to localStorage
      localStorage.setItem('likedBlogs', JSON.stringify([...newLikedBlogs]));

      // Update cloud metrics
      const endpoint = isCurrentlyLiked ? 'unlike' : 'like';
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/blogs/${blogId}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const updatedMetrics = await response.json();
        setCloudMetrics(prev => ({
          ...prev,
          [blogId]: updatedMetrics
        }));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert UI changes if API call fails
      setCloudMetrics(prev => ({
        ...prev,
        [blogId]: {
          ...prev[blogId],
          likesCount: isCurrentlyLiked 
            ? (prev[blogId]?.likesCount || 0) + 1
            : Math.max((prev[blogId]?.likesCount || 0) - 1, 0)
        }
      }));
    }
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch (err) {
      return "Unknown date";
    }
  };

  const getBlogMetrics = (blogId) => {
    return cloudMetrics[blogId] || { likesCount: 0, viewsCount: 0 };
  };

  const getTotalLikes = () => {
    return Object.values(cloudMetrics).reduce((sum, metrics) => sum + (metrics.likesCount || 0), 0);
  };

  // Loading state
  if (loading) {
    return (
      <main className="blogs-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading blogs...</p>
        </div>
      </main>
    );
  }

  // Error state
  if (error && blogs.length === 0) {
    return (
      <main className="blogs-container">
        <div className="error-state">
          <h2>Failed to load blogs</h2>
          <p>{error}</p>
          <button onClick={fetchBlogs} className="retry-btn">
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="blogs-container">
      <Helmet>
        <title>Blogs | Notezy</title>
        <meta name="description" content="Explore insightful blogs on study tips, VTU resources, and academic hacks written by the Notezy team." />
        <meta name="keywords" content="blogs, study tips, VTU, education, academic resources, programming, career guidance" />
        <meta property="og:title" content="Blogs | Notezy" />
        <meta property="og:description" content="Explore insightful blogs on study tips, VTU resources, and academic hacks." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://notezy.online/blogs" />
      </Helmet>

      <header className="blogs-header">
        <div className="header-content">
          <h1>Our Latest Blogs</h1>
          <p>Discover insights, tips, and stories to boost your academic journey</p>
          <div className="header-stats">
            <span className="stat-badge">
              📚 {blogs.length} Article{blogs.length !== 1 ? 's' : ''}
            </span>
            <span className="stat-badge">
              ❤️ {formatNumber(getTotalLikes())} Total Likes
            </span>
          </div>
        </div>
      </header>

      <section className="blog-grid">
        {blogs.length === 0 ? (
          <div className="no-blogs">
            <h3>📝 No blogs available</h3>
            <p>Check back later for new content!</p>
          </div>
        ) : (
          blogs.map(blog => {
            const blogId = blog.id;
            const isLiked = likedBlogs.has(blogId);
            const metrics = getBlogMetrics(blogId);
            
            return (
              <article key={blogId} className="blog-card">
                <Link to={`/blogs/${blogId}`} className="blog-link">
                  <div className="blog-image">
                    <img
                      src={blog.thumbnail}
                      alt={blog.title || "Blog Thumbnail"}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400&h=250&fit=crop";
                      }}
                    />
                  </div>

                  <div className="blog-content">
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-excerpt">
                      {getContentPreview(blog.content, 50)} {/* Shows first 40 words */}
                    </p>


                    {blog.tags?.length > 0 && (
                      <div className="blog-tags">
                        {blog.tags.slice(0, 3).map((tag, i) => (
                          <span className="tag-badge" key={i}>#{tag}</span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="tag-badge more-tags">+{blog.tags.length - 3}</span>
                        )}
                      </div>
                    )}

                    <div className="blog-stats">
                      <div className="stat-item">
                        <span className="stat-icon">👁️</span>
                        <span className="stat-count">{formatNumber(metrics.viewsCount)}</span>
                      </div>
                      
                      <div className="stat-item">
                        <span className="stat-icon">⏱️</span>
                        <span className="stat-count">{blog.readingTime || '5'} min</span>
                      </div>
                      
                      <div className="stat-item">
                        <button 
                          className={`like-button ${isLiked ? 'liked' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleLike(blogId, isLiked);
                          }}
                          aria-label={isLiked ? 'Unlike this blog' : 'Like this blog'}
                        >
                          <span className="stat-icon">{isLiked ? '❤️' : '🤍'}</span>
                          <span className="stat-count">{formatNumber(metrics.likesCount)}</span>
                        </button>
                      </div>
                    </div>

                    <footer className="blog-footer">
                      <div className="blog-meta">
                        <span className="blog-author">By {blog.author}</span>
                        <time className="blog-date">
                          {blog.formattedDate || formatDate(blog.date)}
                        </time>
                      </div>
                      <span className="read-more-btn">
                        Read More →
                      </span>
                    </footer>
                  </div>
                </Link>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}

export default Blogs;