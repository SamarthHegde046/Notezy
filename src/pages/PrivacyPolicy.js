import React from "react";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  const pageTitle = "Privacy Policy | Notezy";
  const pageDescription =
    "Read Notezy's Privacy Policy to understand how we collect, use, and protect your personal information. Your privacy matters to us.";
  const canonicalUrl = "https://notezy.online/privacy-policy";

  return (
    <main className="container">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="Notezy privacy policy, student notes platform, data protection, VTU notes privacy, academic resource platform"
        />
        <meta name="author" content="Notezy" />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:image"
          content={`${window.location.origin}/feather-pen.png`}
        />
        <meta property="og:site_name" content="Notezy" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content={`${window.location.origin}/feather-pen.png`}
        />
      </Helmet>

      {/* ✅ Page Content */}
      <h1>Privacy Policy</h1>
      <p>Last updated: June 21, 2025</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to <strong>Notezy</strong>, a platform designed to share and
          manage academic notes. This Privacy Policy explains how we collect,
          use, and protect your personal information when you use our website
          and services.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>
            <strong>Personal Information:</strong> such as your name, email
            address, college name, and contact details during registration or
            when submitting feedback.
          </li>
          <li>
            <strong>Usage Data:</strong> such as pages visited, downloads,
            preview clicks, and other analytical data.
          </li>
          <li>
            <strong>Technical Information:</strong> such as your IP address,
            browser type, location (city, region), and device used.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To provide and maintain our services.</li>
          <li>To monitor usage and improve the platform.</li>
          <li>To respond to feedback and queries.</li>
          <li>To send administrative messages or updates.</li>
        </ul>
      </section>

      <section>
        <h2>4. Cookies and Tracking</h2>
        <p>
          We may use cookies and similar tracking technologies to enhance your
          experience and analyze website traffic. You can control cookies
          through your browser settings.
        </p>
      </section>

      <section>
        <h2>5. Sharing of Data</h2>
        <p>We do not sell or rent your personal information to third parties. However, we may share data with:</p>
        <ul>
          <li>Trusted service providers (e.g., for analytics or hosting)</li>
          <li>Law enforcement or regulatory authorities when required by law</li>
        </ul>
      </section>

      <section>
        <h2>6. Data Security</h2>
        <p>
          We implement reasonable security measures to protect your data.
          However, no method of transmission over the Internet is 100% secure.
        </p>
      </section>

      <section>
        <h2>7. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal
          information. You may also opt-out of email communications at any time.
        </p>
      </section>

      <section>
        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          reflected on this page with an updated revision date.
        </p>
      </section>

      <section>
        <h2>9. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at{" "}
          <a href="mailto:notezyhelp@gmail.com">notezyhelp@gmail.com</a>.
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
