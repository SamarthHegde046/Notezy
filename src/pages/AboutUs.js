import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1>About Notezy</h1>
      <p className="intro">
        Notezy is a student-focused notes-sharing platform that helps learners access, share, and discover high-quality academic resources with ease.
      </p>

      <section>
        <h2>📘 Our Mission</h2>
        <p>
          Our mission is to make academic content more accessible and collaborative. We believe students should not struggle to find good notes before exams or assignments. Notezy simplifies that.
        </p>
      </section>

      <section>
        <h2>👨‍💻 Who We Are</h2>
        <p>
          We are a team of passionate developers and students who understand the daily academic challenges. That’s why we built Notezy — by students, for students.
        </p>
      </section>

      <section>
        <h2>🚀 What We Offer</h2>
        <ul>
          <li>Searchable semester-wise and department-wise notes</li>
          <li>AI-powered chatbot to help find specific topics</li>
          <li>Admin-curated quality uploads</li>
          <li>Preview and download options</li>
          <li>Privacy-first design with no spam or ads</li>
        </ul>
      </section>

      <section>
        <h2>🤝 Join Us</h2>
        <p>
          Whether you’re a student looking for notes or someone who wants to share helpful content, Notezy is for you. Let’s build a better learning ecosystem together.
        </p>
      </section>

      <section>
        <h2>📬 Contact</h2>
        <p>
          Got suggestions or want to contribute? Email us at <a href="mailto:notezy.support@gmail.com">notezy.support@gmail.com</a>
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
