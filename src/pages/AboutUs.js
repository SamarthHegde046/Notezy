import React from "react";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>About Notezy | Student VTU Notes Sharing Platform</title>
        <meta
          name="description"
          content="Discover Notezy – a smart platform to access, share, and discover quality academic notes for VTU CBCS. Built by students, for students."
        />
        <meta
          name="keywords"
          content="Notezy, student notes, VTU notes,VTU,CBCS,vtu 2022 scheme,VTU syllabus, Computer Science notes, Engineering modules, VTU solved papers, VTU 2025, Notezy notes, CSE, AIML, ECE,Notes,physics,eee,chemistry,cse,ise,aiml, exam prep, academic resources, free notes sharing, study material"
        />
        <meta name="author" content="Notezy" />

        {/* Open Graph */}
        <meta property="og:title" content="About Notezy" />
        <meta
          property="og:description"
          content="Notezy makes VTU academic content accessible for everyone. Learn more about our mission, vision, and community."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://notezy.online/about-us" />
        <meta property="og:image" content={`${window.location.origin}/feather-pen.png`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Notezy" />
        <meta
          name="twitter:description"
          content="A platform built by students, for students. Find VTU notes, share knowledge, and collaborate."
        />
        <meta name="twitter:image" content={`${window.location.origin}/feather-pen.png`} />

        <link rel="canonical" href="https://notezy.online/about-us" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Notezy",
              "url": "https://notezy.online",
              "description": "Notezy is a VTU-friendly platform for CBCS notes, built by students to help students share and find study materials."
            }
          `}
        </script>
      </Helmet>

      <section className="about-container">
        <h1>About Notezy</h1>
        <p className="intro">
          <strong>Notezy</strong> is a student-first platform designed to
          simplify access to high-quality VTU CBCS 2022 scheme academic notes, making learning more
          organized, stress-free, and collaborative.
        </p>

        {/* Our Story */}
        <section>
          <h2>📖 Our Story</h2>
          <p>
            It all started with a simple frustration — endlessly searching for
            reliable notes before exams. We realized students spend hours
            looking through multiple WhatsApp or Telegram groups just to find
            one PDF. That’s when we decided to build <strong>Notezy</strong>, a
            one-stop platform to store, search, and share all academic notes
            easily.  
          </p>
          <p>
            Today, Notezy is not just a repository of notes, but a{" "}
            <strong>growing community of learners</strong> who believe in
            helping each other succeed.
          </p>
        </section>

        {/* Mission */}
        <section>
          <h2>📘 Our Mission</h2>
          <p>
            Our mission is to <strong>make academic content accessible</strong>{" "}
            for everyone and create a <strong>collaborative learning space</strong>.
            We believe no student should feel lost before exams, assignments, or
            projects. With Notezy, quality notes are just a click away.
          </p>
        </section>

        {/* Vision */}
        <section>
          <h2>🌟 Our Vision</h2>
          <p>
            To become the most trusted <strong>student resource hub</strong> for
            universities and colleges, where students can find everything they
            need to excel academically — notes, question papers, guides,
            tutorials, and more.
          </p>
        </section>

        {/* What We Offer */}
        <section>
          <h2>🚀 What We Offer</h2>
          <ul>
            <li>Department-wise & semester-wise categorized notes</li>
            <li>AI-powered chatbot to instantly find specific topics</li>
            <li>Curated, high-quality uploads verified by admins</li>
            <li>Preview before download, so you get exactly what you need</li>
            <li>Privacy-first platform — no spam, no unnecessary ads</li>
            <li>Easy upload system to share your own notes with peers</li>
          </ul>
        </section>

        {/* Why Choose Notezy */}
        <section>
          <h2>✅ Why Choose Notezy?</h2>
          <ul>
            <li>
              <strong>Fast & Reliable:</strong> No endless searching through
              groups, everything is in one place.
            </li>
            <li>
              <strong>Built for Students:</strong> Designed by students who know
              your struggles.
            </li>
            <li>
              <strong>Always Free:</strong> Learning should never have a price
              barrier.
            </li>
            <li>
              <strong>Community Driven:</strong> Every note you share helps
              another student succeed.
            </li>
          </ul>
        </section>

        {/* Community Impact */}
        <section>
          <h2>🌍 Our Community Impact</h2>
          <p>
            Thousands of students have already benefited from Notezy. By making
            notes accessible, we’ve saved{" "}
            <strong>countless study hours</strong> and helped students{" "}
            <strong>score better in exams</strong>. We’re proud to be a small but
            meaningful part of their academic journey.
          </p>
        </section>

        {/* Future Plans */}
        <section>
          <h2>🔮 What’s Next?</h2>
          <p>
            We’re constantly working to improve Notezy. In the coming months,
            expect:
          </p>
          <ul>
            <li>More subjects & updated study material</li>
            <li>Student forums for doubt discussions</li>
            <li>AI-generated summaries & study guides</li>
            <li>Mobile app for even easier access</li>
          </ul>
        </section>

        {/* Join Us */}
        <section>
          <h2>🤝 Join Us</h2>
          <p>
            Whether you’re a student looking for notes or someone who wants to
            share helpful content, <strong>Notezy is for you</strong>. Let’s
            build a better learning ecosystem together.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2>📬 Contact Us</h2>
          <p>
            Got suggestions or want to contribute? Email us at{" "}
            <a href="mailto:notezyhelp@gmail.com">notezyhelp@gmail.com</a>.  
          </p>
        </section>
      </section>
    </>
  );
};

export default AboutUs;
