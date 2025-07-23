import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { getBlogById } from "./BlogData";
import BlogShare from "../components/BlogShare";
import "./BlogDetails.css";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [cloudMetrics, setCloudMetrics] = useState({ likesCount: 0, viewsCount: 0 });
  const blogUrl = "https://notezy.online/blogs";

  // Helper function to use local metrics (not a hook)
  const setLocalMetrics = (blogId) => {
    const localBlog = getBlogById(blogId);
    if (localBlog) {
      setCloudMetrics({
        likesCount: localBlog.likesCount || 0,
        viewsCount: localBlog.viewsCount || 0
      });
    }
  };

  const fetchCloudMetricsAndIncrementView = useCallback(async (blogId) => {
    try {
      if (!process.env.REACT_APP_API_BASE) {
        console.log('API not configured, using local metrics');
        setLocalMetrics(blogId);
        return;
      }

      // First, get current metrics
      const metricsResponse = await fetch(`${process.env.REACT_APP_API_BASE}/blogs/${blogId}/metrics`);
      if (metricsResponse.ok) {
        const metrics = await metricsResponse.json();
        setCloudMetrics(metrics);
      } else {
        console.log('Cloud metrics not available, using local fallback');
        setLocalMetrics(blogId);
      }

      // Then, increment view count (this will also return updated metrics)
      const viewResponse = await fetch(`${process.env.REACT_APP_API_BASE}/blogs/${blogId}/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (viewResponse.ok) {
        const updatedMetrics = await viewResponse.json();
        setCloudMetrics(updatedMetrics);
      }

    } catch (error) {
      console.log('Error with cloud metrics, using local fallback:', error);
      setLocalMetrics(blogId);
    }
  }, []);

  const fetchBlog = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get blog content from local data
      const localBlog = getBlogById(id);
      if (!localBlog) {
        throw new Error('Blog not found');
      }

      // Set the blog with local content
      setBlog(localBlog);
      
      // Check if user has liked this blog (from localStorage)
      const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
      setIsLiked(likedBlogs.includes(id));

      // Fetch engagement metrics from cloud AND increment view count
      await fetchCloudMetricsAndIncrementView(id);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id, fetchCloudMetricsAndIncrementView]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const handleLike = async () => {
    const newLikedState = !isLiked;
    
    try {
      // Update UI immediately for better UX
      setIsLiked(newLikedState);
      setCloudMetrics(prev => ({
        ...prev,
        likesCount: newLikedState ? prev.likesCount + 1 : Math.max(prev.likesCount - 1, 0)
      }));
      
      // Update localStorage
      const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
      if (newLikedState) {
        if (!likedBlogs.includes(id)) {
          likedBlogs.push(id);
        }
      } else {
        const index = likedBlogs.indexOf(id);
        if (index > -1) {
          likedBlogs.splice(index, 1);
        }
      }
      localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));

      // Update cloud metrics (if available)
      if (process.env.REACT_APP_API_BASE) {
        const endpoint = newLikedState ? 'like' : 'unlike';
        const response = await fetch(`${process.env.REACT_APP_API_BASE}/blogs/${id}/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const updatedMetrics = await response.json();
          setCloudMetrics(updatedMetrics);
        }
      }
      
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert UI changes if there's an error
      setIsLiked(!newLikedState);
      setCloudMetrics(prev => ({
        ...prev,
        likesCount: !newLikedState ? prev.likesCount + 1 : Math.max(prev.likesCount - 1, 0)
      }));
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num?.toString() || '0';
  };

  

  // ===== COMPONENT BREAKDOWN =====

  // Loading Component
  const LoadingSpinner = () => (
    <main className="blog-details-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading blog post...</p>
      </div>
    </main>
  );

  // Error Component
  const ErrorMessage = () => (
    <main className="blog-details-container">
      <div className="error-message">
        <h2> Oops! Something went wrong</h2>
        <p>{error}</p>
        <Link to="/blogs" className="back-btn">← Back to Blogs</Link>
      </div>
    </main>
  );

  // Blog Header Component
  const BlogHeader = () => (
    <header className="blog-header">
      <h1 className="blog-title">{blog.title}</h1>
      <BlogMeta />
    </header>
  );

  // Blog Meta Component
  const BlogMeta = () => (
    <div className="blog-meta">
      <AuthorInfo />
      <BlogStats />
      {blog.tags && blog.tags.length > 0 && <BlogTags />}
    </div>
  );

  // Author Info Component
  const AuthorInfo = () => (
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
  );

  // Blog Stats Component
  const BlogStats = () => (
    <div className="blog-stats">
      <div className="stat-item">
        <span className="stat-icon">👁️</span>
        <span className="stat-count">{formatNumber(cloudMetrics.viewsCount)} views</span>
      </div>
      <LikeButton />
    </div>
  );

  // Like Button Component
  const LikeButton = ({ isMain = false }) => (
    <button 
      className={`${isMain ? 'main-like-button' : 'like-button'} ${isLiked ? 'liked' : ''}`}
      onClick={handleLike}
      aria-label={isLiked ? 'Unlike this blog' : 'Like this blog'}
    >
      <span className={isMain ? 'like-icon' : 'stat-icon'}>
        {isLiked ? '❤️' : '🤍'}
      </span>
      <span className={isMain ? 'like-text' : 'stat-count'}>
        {isMain 
          ? (isLiked ? 'Liked!' : 'Like this post')
          : `${formatNumber(cloudMetrics.likesCount)} likes`
        }
      </span>
    </button>
  );

  // Blog Tags Component
  const BlogTags = () => (
    <section className="blog-tags" aria-label="Blog Tags">
      {blog.tags.map((tag, i) => (
        <span className="tag-badge" key={i}>#{tag}</span>
      ))}
    </section>
  );

  // Blog Image Component
  const BlogImage = () => (
    blog.thumbnail && (
      <figure className="blog-image">
        <img 
          src={blog.thumbnail} 
          alt={blog.title} 
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </figure>
    )
  );

  // Blog Content Component
  const BlogContent = () => (
    <section className="blog-content">
      <div className="structured-content">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </section>
  );

  // Blog Footer Component
  const BlogFooter = () => (
    <footer className="blog-footer">
      <EngagementSection />
      <BlogActions />
    </footer>
  );

  // Engagement Section Component
  const EngagementSection = () => (
    <div className="engagement-section">
      <div className="engagement-stats">
        <div className="engagement-item">
          <span className="engagement-number">{formatNumber(cloudMetrics.likesCount)}</span>
          <span className="engagement-label">Likes</span>
        </div>
        <div className="engagement-item">
          <span className="engagement-number">{formatNumber(cloudMetrics.viewsCount)}</span>
          <span className="engagement-label">Views</span>
        </div>
      </div>
      <LikeButton isMain={true} />
    </div>
  );

  // Blog Actions Component
  const BlogActions = () => (
    <div className="blog-actions">
      <Link to="/blogs" className="back-to-blogs">← Back to All Blogs</Link>
    </div>
  );

  // SEO Component
  const SEOHelmet = () => {
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
      <Helmet>
        <title>{blog.title} | Notezy Blog</title>
        <meta name="description" content={blog.content.slice(0, 160)} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.content.slice(0, 160)} />
        <meta property="og:image" content={blog.thumbnail} />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(blogStructuredData)}
        </script>
      </Helmet>
    );
  };

  // ===== MAIN RENDER =====
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;
  if (!blog) return <ErrorMessage />;

  return (
    <main className="blog-details-container">
      <SEOHelmet />
      
      <nav className="blog-navigation">
        <Link to="/blogs" className="back-btn">← Back to Blogs</Link>
      </nav>

      <article className="blog-details">
        <BlogHeader />
        <BlogImage />
        <BlogContent />
        <BlogFooter />
        <BlogShare blogTitle={blog.title} blogUrl={blogUrl}/>
      </article>
    </main>
  );
}

export default BlogDetails;