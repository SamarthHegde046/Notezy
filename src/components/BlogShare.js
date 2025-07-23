import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import './BlogShare.css';

const BlogShare = ({ blogTitle, blogUrl }) => {
  const shareMessage = `Check out this blog from Notezy: ${blogTitle}`;
  
  return (
    <div className="share-buttons" style={{ marginTop: "20px" }}>
      <div style={{ display: "flex", gap: "10px" }}>
        {/* WhatsApp */}
        <WhatsappShareButton url={blogUrl} title={shareMessage}>
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>

        {/* Facebook */}
        <FacebookShareButton url={blogUrl} quote={shareMessage}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>

        {/* Twitter (X) */}
        <TwitterShareButton url={blogUrl} title={shareMessage}>
          <TwitterIcon size={40} round />
        </TwitterShareButton>

        {/* LinkedIn */}
        <LinkedinShareButton url={blogUrl} title={blogTitle}>
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>
      </div>
    </div>
  );
};

export default BlogShare;
