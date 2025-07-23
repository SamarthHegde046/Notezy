// blogData.js - Simplified blog data to match backend model

// ===============================
// CONFIGURATION & CONSTANTS
// ===============================

export const BLOG_CONFIG = {
  ITEMS_PER_PAGE: 10,
  READING_TIME_WPM: 200
};

// ===============================
// UTILITY FUNCTIONS
// ===============================

/**
 * Calculate estimated reading time based on content length
 * @param {string} content - Blog content
 * @returns {number} Reading time in minutes
 */
export const calculateReadingTime = (content) => {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / BLOG_CONFIG.READING_TIME_WPM);
};

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// ===============================
// BLOG DATA STRUCTURE (Matching Backend Model)
// ===============================

export const SAMPLE_BLOGS = {
  '1': {
    id: '1',
    title: "How to Crack VTU Exams Strategically Without Losing Marks — A Complete Guide",
    content: `<article class="blog-post">
    <div class="blog-content">
        <p>VTU (Visvesvaraya Technological University) exams are not just a test of your knowledge—they're also a test of how strategically you present that knowledge. Most students unknowingly lose marks not due to lack of preparation, but because they don't align their answers with how VTU evaluates answer scripts.</p>

        <p>After analyzing hundreds of VTU answer scripts and speaking with evaluators, I've discovered that the difference between scoring 60% and 85% often comes down to presentation strategy rather than subject knowledge. Let's break down a smart approach to crack VTU exams without losing unnecessary marks.</p>

        <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop" alt="VTU Exam Strategy">

        <h2>Understanding the VTU Evaluation Pattern</h2>

        <p><a href="https://vtu.ac.in">VTU</a> evaluators are trained to follow a step-by-step marking scheme, and understanding this pattern is your first advantage. Each answer has clearly defined checkpoints, and marks are distributed across these specific elements rather than given as a lump sum for "overall knowledge."</p>

        <p>The key insight here is that <a href="https://vtu.ac.in">VTU</a> follows CBCS (Choice Based Credit System) with Bloom's Taxonomy levels - L1 (Remember), L2 (Understand), L3 (Apply), and L4 (Analyze). Each level demands a different approach:</p>

        <ul>
            <li>L1 questions are straightforward recall - definitions, formulas, basic concepts</li>
            <li>L2 questions require explanation and understanding - "explain the working of..."</li>
            <li>L3 questions need application - solve problems, implement algorithms</li>
            <li>L4 questions demand analysis - compare, contrast, evaluate, critique</li>
        </ul>

        <p>Most students treat all questions the same way, but evaluators are specifically looking for different elements in each category. This is where strategic answer writing becomes crucial.</p>

        <h2>The Smart Answer Writing Framework</h2>

        <p>Every high-scoring <a href="https://vtu.ac.in">VTU</a> answer follows a predictable structure that evaluators love to see. Think of it as a recipe - miss an ingredient, and you lose marks even if your core knowledge is solid.</p>

        <p>Here's the framework that consistently works:</p>

        <h3>For Theory Questions (5-8 marks):</h3>
        <ul>
            <li>Definition/Introduction (1 mark) - Always start with a clear definition</li>
            <li>Main explanation (3-4 marks) - Break into numbered points or subheadings</li>
            <li>Diagram/Example (1-2 marks) - Visual elements are mark boosters</li>
            <li>Conclusion/Applications (1 mark) - Tie it back to real-world relevance</li>
        </ul>

        <h3>For Problem-solving Questions (8-10 marks):</h3>
        <ul>
            <li>Problem statement (0.5 marks) - Rewrite what's being asked</li>
            <li>Formula/Algorithm (1 mark) - Show the approach clearly</li>
            <li>Step-by-step solution (5-6 marks) - Number each step</li>
            <li>Final answer (1 mark) - Box or highlight the result</li>
            <li>Verification (0.5 marks) - Quick check if possible</li>
        </ul>

        <p>This isn't just theory - I've seen students jump from 55% to 78% just by restructuring their answers using this framework, without studying a single new topic.</p>

        <img src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&h=400&fit=crop" alt="Answer Writing Strategy">

        <h2>The First Impression Strategy</h2>

        <p>Before you write a single answer, understand that evaluators correct hundreds of papers in a day. They're human, they get tired, and they form impressions quickly. Your job is to make their job easier and create a positive first impression.</p>

        <h3>Essential presentation elements:</h3>
        <ul>
            <li>Clear <a href="https://vtu.ac.in">USN</a> and subject details - Make it easy to identify your paper</li>
            <li>Neat handwriting - If they can't read it, they can't award marks</li>
            <li>Proper question numbering - Circle attempted questions, cross out unused ones</li>
            <li>Strategic use of space - Don't cramp everything together</li>
        </ul>

        <p>Here's a game-changing tip: Use the "30-second rule." An evaluator should be able to scan your answer in 30 seconds and identify all the key elements they're looking for. This means using headings, bullet points, and visual separators liberally.</p>

        <p>Consider this - would you rather read a dense paragraph or a well-structured answer with clear headings? The evaluator feels the same way. Clean presentation doesn't just look good; it actually helps evaluators find the marking points they're looking for, which translates to better marks for you.</p>

        <h2>Time Management: The 3-Hour Strategy</h2>

        <p>Time management in <a href="https://vtu.ac.in">VTU</a> exams isn't about speed - it's about strategic allocation. The students who score highest aren't necessarily the fastest writers; they're the smartest planners.</p>

        <h3>The winning time breakdown:</h3>
        <ul>
            <li>First 10 minutes: Paper analysis and question selection</li>
            <li>Next 160 minutes: Answer writing (32 minutes per question)</li>
            <li>Final 10 minutes: Review and polish</li>
        </ul>

        <p>During the paper analysis phase, resist the urge to start writing immediately. Instead, scan every question and identify your strongest topics. Mark easy questions that you can answer quickly and confidently. Plan your sequence - start with your strongest module to build confidence and momentum.</p>

        <p>The 32-minute rule per question is crucial. It forces you to be concise while ensuring you cover all marking points. If you exceed this time limit, you're likely writing too much detail in some areas while potentially missing other questions entirely.</p>

        <p>Pro tip: Keep a small watch on your desk and note the time when you start each question. This simple habit will prevent you from spending 50 minutes on one question and rushing through the remaining four.</p>

        <p>Remember, partial attempts are better than perfect answers to fewer questions. VTU marking schemes award marks for every correct step, so attempting all questions with proper structure beats perfecting three questions and leaving two blank.</p>

        <img src="https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&h=400&fit=crop" alt="Time Management">

        <h2>Common Mistakes That Cost Marks</h2>

        <p>Even well-prepared students lose marks due to avoidable mistakes. Here are the most common ones I've observed:</p>

        <h3>Presentation mistakes:</h3>
        <ul>
            <li>Writing in paragraph form instead of using points</li>
            <li>Forgetting to draw diagrams for diagram-based questions</li>
            <li>Not highlighting or boxing final answers in numerical problems</li>
            <li>Using pencil for important elements (it fades and becomes unreadable)</li>
        </ul>

        <h3>Content mistakes:</h3>
        <ul>
            <li>Jumping directly to solutions without showing the approach</li>
            <li>Missing units in numerical answers</li>
            <li>Not labeling diagram components clearly</li>
            <li>Writing too much for low-mark questions and too little for high-mark ones</li>
        </ul>

        <h3>Strategic mistakes:</h3>
        <ul>
            <li>Attempting questions you're not confident about first</li>
            <li>Spending too much time on one question</li>
            <li>Not reading the question carefully (answering what you want vs. what's asked)</li>
            <li>Leaving questions completely blank instead of attempting partial answers</li>
        </ul>

        <p>The biggest mistake? Not understanding that <a href="https://vtu.ac.in">VTU</a> rewards structure over content depth. A well-structured average answer often scores higher than a brilliant but poorly presented one.</p>

        <h2>Your Action Plan for Success</h2>

        <p>Now that you understand the strategy, here's your implementation plan:</p>

        <h3>Before the exam:</h3>
        <ul>
            <li>Practice writing answers using the framework above</li>
            <li>Time yourself - get comfortable with the 32-minute rhythm</li>
            <li>Prepare standard formats for different question types</li>
            <li>Create a personal toolkit of diagrams and formulas</li>
        </ul>

        <h3>During the exam:</h3>
        <ul>
            <li>Spend those crucial first 10 minutes planning</li>
            <li>Stick to your time limits ruthlessly</li>
            <li>Use clear headings and numbering</li>
            <li>Draw diagrams even if they're not explicitly asked for</li>
        </ul>

        <p>Key mindset shift: Stop thinking like a student cramming information and start thinking like a professional presenting a solution. Your answer sheet is your product, and the evaluator is your client who needs to quickly find what they're looking for.</p>

        <p>This approach has helped hundreds of students improve their scores significantly. The beauty is that it doesn't require learning new topics - just presenting your existing knowledge more strategically.</p>

        <p>Remember, <a href="https://vtu.ac.in">VTU</a> exams are as much about communication as they are about knowledge. Master both, and you'll see a dramatic improvement in your results.</p>

        <blockquote>
            The difference between good students and great scorers isn't what they know - it's how they present what they know.
        </blockquote>

        <p>Follow this strategy consistently, and watch your <a href="https://vtu.ac.in">VTU</a> scores improve dramatically. Good luck!</p>
    </div>
</article>`,
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    author: "Notezy",
    date: "2025-07-15",
    tags: ["VTU", "Exam Strategy", "Study Tips", "Academic Success", "Time Management"],
    likesCount: 0,
    viewsCount: 0
  },

 '2' : {
  id: '2',
  title: "Mastering Coding Quiz Battles: Strategies to Win and Improve Your Problem-Solving Skills",
  content: `<article class="blog-post">
  <div class="blog-content">
  <p>Codezy: Your Ultimate Quiz Battle Arena</p>

  <p>
    <a href="https://codezy-blue.vercel.app/" target="_blank">
      <img src="https://i.ibb.co/4R5wQXfg/Whats-App-Image-2025-07-22-at-9-00-52-PM-1.jpg" alt="Codezy Homepage" style="width:100%; border-radius:10px;" />
    </a>
  </p>

  <p>
    Are you ready to test your knowledge and compete with players worldwide? 
    <strong>Codezy</strong> is an exciting, interactive 
    <em>quiz battle platform</em> designed to challenge your mind while offering a fun, competitive experience. 
    With an elegant, user-friendly interface, Codezy combines 
    <strong>timed quizzes, real-time scoring, and competitive leaderboards</strong> 
    to create an addictive learning game.
  </p>

  <h2>How It Works</h2>

<a href="https://codezy-blue.vercel.app"><img src="https://i.ibb.co/ycCHg3dG/Whats-App-Image-2025-07-22-at-9-00-51-PM.jpg" border="0" alt="How Codezy Works" style="width:100%; border-radius:10px;" ></a>

  <ul>
    <li>✅ <strong>Sign Up or Log In</strong> – Create a free account to save your scores and track progress.</li>
    <li>✅ <strong>Start a Quiz Battle</strong> – Click <strong>Start Battle</strong> to enter a 10-question timed quiz.</li>
    <li>✅ <strong>Answer Quickly</strong> – The faster you answer, the more points you score.</li>
    <li>✅ <strong>Compete for the Top</strong> – Earn points, climb the <strong>leaderboards</strong>, and collect badges.</li>
  </ul>

  <p>The platform is designed to be <strong>fun, competitive, and educational</strong>, making it perfect for students, professionals, or anyone who loves a good challenge.</p>

  <h2>Key Features</h2>
  <ul>
    <li><strong>Challenging Questions</strong> – A diverse set of questions covering various categories.</li>
    <li><strong>Time-Based Scoring</strong> – Earn <b>10 points</b> for quick answers, <b>5 points</b> for slower ones.</li>
    <li><strong>Competitive Leaderboards</strong> – Daily, weekly, and monthly rankings keep you motivated.</li>
    <li><strong>Quick Battles</strong> – Just <b>10 questions</b> per game, perfect for a quick mental workout.</li>
  </ul>

  <h2>How to Play</h2>
  <ol>
    <li><strong>Register</strong> on <a href="https://codezy-blue.vercel.app/" target="_blank">Codezy</a> with your name, email, and password.</li>
    <li>Click <b>Start Battle</b> after logging in.</li>
    <li>A quiz with <b>10 multiple-choice questions</b> will appear.</li>
    <li>Each question has a <b>timer</b> – answer before it runs out.</li>
    <li>Points are calculated based on your <b>speed and accuracy</b>.</li>
    <li>After the quiz, see your <b>score and rank</b> on the leaderboard.</li>
  </ol>

  <p>
    <img src="https://i.ibb.co/fdT3KLw1/Whats-App-Image-2025-07-22-at-9-00-52-PM.jpg" alt="Quiz Screen" style="width:100%; border-radius:10px;" />
  </p>

  <h2>Authentication & User Profiles</h2>
  <p>
    Codezy uses a <strong>secure authentication system</strong> to protect user data. After registering, you can log in anytime to track:
  </p>
  <ul>
    <li>Total points earned</li>
    <li>Highest quiz score</li>
    <li>Number of games played</li>
    <li>Your current leaderboard rank</li>
  </ul>

  <h2>Leaderboard & Rewards</h2>
  <p>
    The <strong>Leaderboard</strong> shows the top players of the day, week, and month. Scores reset 
    <b>daily at 6 PM</b>, so every day is a fresh chance to climb to the top. Winners earn 
    <strong>exclusive badges</strong> that can be shared with friends.
  </p>

  <h2>Quiz Rules</h2>
  <ul>
    <li>Each quiz has <b>10 questions</b>.</li>
    <li>You have a <b>limited time</b> per question.</li>
    <li><b>Faster answers = more points</b>.</li>
    <li>Refreshing or leaving the quiz invalidates your current session.</li>
    <li>Ties are broken by <b>submission time</b>.</li>
  </ul>

  <h2>A Smooth User Experience</h2>
  <p>
    <a href="https://codezy-blue.vercel.app/"><img src="https://i.ibb.co/CstSbsv3/Whats-App-Image-2025-07-22-at-9-00-50-PM-1.jpg" alt="Whats-App-Image-2025-07-22-at-9-00-50-PM-1" border="0" style="width:100%; border-radius:10px;"></a>
  </p>
  <p>
    Codezy is designed with a <strong>clean, modern UI</strong> that makes navigation effortless. From the 
    <em>gradient hero section</em> to the <em>smooth animations</em> in the quiz screen, everything is built for a seamless, engaging experience.
  </p>

  <h2>Why Play Codezy?</h2>
  <p>
    Codezy isn’t just another quiz platform; it’s a space where you can <strong>learn, compete, and improve your knowledge</strong> while having fun. Whether you’re a student brushing up on academic subjects or a professional testing your general knowledge, Codezy offers a wide variety of questions to keep you sharp.
  </p>
  <p>
    Here’s why users love it:
  </p>
  <ul>
    <li>🚀 <strong>Fast & Lightweight</strong> – No unnecessary distractions, just pure quiz fun.</li>
    <li>🎯 <strong>Focused Learning</strong> – Improve your reflexes and memory with time-bound questions.</li>
    <li>🏆 <strong>Healthy Competition</strong> – Challenge yourself against top players daily.</li>
    <li>💡 <strong>Knowledge Expansion</strong> – Discover new facts and concepts with every quiz.</li>
  </ul>

  <h2>Competitive Strategy</h2>
  <p>
    To climb the leaderboard, you need <strong>speed, accuracy, and consistency</strong>. Quick thinking is rewarded with higher points, while hesitation can cost you the top spot. Many players adopt a strategy of focusing on accuracy first, then working on speed as they get familiar with the question patterns.
  </p>
  <p>
    The daily reset means you can start fresh and challenge yourself to improve over time. If you play multiple quizzes in a day, you’ll gradually build a higher total score, increasing your chances of being featured as a <strong>daily champion</strong>.
  </p>

  <h2>Future Enhancements</h2>
  <p>
    Codezy is constantly evolving. Upcoming features will include:
  </p>
  <ul>
    <li>🔗 <strong>Multiplayer Rooms</strong> – Play with friends in private battle rooms.</li>
    <li>🤖 <strong>AI-Generated Questions</strong> – Dynamic questions powered by AI for endless variety.</li>
    <li>📊 <strong>Detailed Analytics</strong> – Track your improvement over time.</li>
    <li>🎖 <strong>Achievement Badges</strong> – Unlockable rewards for milestones like “Fastest Answer” or “Perfect Score.”</li>
  </ul>

  <h2>Join the Codezy Community</h2>
  <p>
    Codezy is more than just a quiz platform – it’s a <strong>community of learners and thinkers</strong> who love challenges. By joining, you become part of a growing network of players who strive to improve their knowledge every day.
  </p>

  <h2>Start Your Quiz Battle Today!</h2>
  <p>
    Ready to challenge yourself and rise to the top? <strong>Sign up now</strong> and experience the thrill of quiz battles that keep you on your toes. Test your skills, earn points, and show the world your knowledge!
  </p>

  <p style="text-align:center;">
    <a href="https://codezy-blue.vercel.app/" target="_blank" style="background:#2563eb;color:#fff;padding:10px 20px;border-radius:5px;text-decoration:none;">Visit Codezy Now</a>
  </p>

  <blockquote>
    The battle of brains awaits. Are you ready to claim your spot at the top?
  </blockquote>
  </div>
</article>
`
,
  thumbnail: "https://images.unsplash.com/photo-1584697964190-7383cbee8277?w=800&h=400&fit=crop",
  author: "Notezy",
  date: "2025-07-20",
  tags: ["Quiz Battle", "Coding Skills", "Time Management", "Competitive Programming", "Leaderboard"],
  likesCount: 0,
  viewsCount: 0
}
};

// ===============================
// UTILITY FUNCTIONS
// ===============================

/**
 * Get blog by ID
 * @param {string} id - Blog ID
 * @returns {Object|null} Blog object
 */
export const getBlogById = (id) => {
  const blog = SAMPLE_BLOGS[id];
  if (!blog) return null;
  
  return {
    ...blog,
    readingTime: calculateReadingTime(blog.content),
    formattedDate: formatDate(blog.date)
  };
};

/**
 * Get all blogs
 * @returns {Array} Array of all blogs
 */
export const getAllBlogs = () => {
  return Object.values(SAMPLE_BLOGS).map(blog => ({
    ...blog,
    readingTime: calculateReadingTime(blog.content),
    formattedDate: formatDate(blog.date)
  }));
};

/**
 * Get blogs by tag
 * @param {string} tag - Tag name
 * @returns {Array} Filtered blogs
 */
export const getBlogsByTag = (tag) => {
  return getAllBlogs().filter(blog => 
    blog.tags.some(blogTag => 
      blogTag.toLowerCase() === tag.toLowerCase()
    )
  );
};

/**
 * Search blogs
 * @param {string} query - Search query
 * @returns {Array} Matching blogs
 */
export const searchBlogs = (query) => {
  const searchTerm = query.toLowerCase();
  return getAllBlogs().filter(blog => 
    blog.title.toLowerCase().includes(searchTerm) ||
    blog.content.toLowerCase().includes(searchTerm) ||
    blog.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

// ===============================
// EXPORT DEFAULT
// ===============================

const blogDataExport = {
  SAMPLE_BLOGS,
  BLOG_CONFIG,
  getBlogById,
  getAllBlogs,
  getBlogsByTag,
  searchBlogs
};

export default blogDataExport;