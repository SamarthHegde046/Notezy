import './Faq.css';

const FAQ_DATA = [
  {
    category: "About Notezy Services",
    questions: [
      {
        q: "What is Notezy and what services do we offer?",
        a: "Notezy is a student-driven platform providing free VTU study materials and an AI chatbot to help students summarize information and understand complex topics easily.",
      },
      {
        q: "How can I download VTU notes from our website?",
        a: "Simply visit notezy.online, navigate to your branch and semester, then download the required notes for free through our secure platform.",
      },
      {
        q: "How does the AI chatbot work?",
        a: "Our free AI chatbot helps you summarize study materials, explains complex topics, and answers questions about VTU curriculum content instantly.",
      },
      {
        q: "Are notes available for all VTU branches and semesters?",
        a: "We provide comprehensive coverage across different branches and semesters, with our collection continuously growing based on student needs.",
      },
      {
        q: "Is there any cost for using Notezy services?",
        a: "No, all our services including VTU notes downloads and AI chatbot are completely free for students.",
      },
      {
        q: "How can I contribute my notes to the platform?",
        a: "You can submit your high-quality notes by contacting us through our website. We review submissions before making them available to other students.",
      },
      {
        q: "Are the notes updated according to latest VTU syllabus?",
        a: "Yes, we regularly update our collection to align with the latest VTU syllabus changes and curriculum requirements.",
      },
      {
        q: "How secure is the platform?",
        a: "We use secure servers and encrypted connections to protect user data and ensure safe downloads while maintaining complete confidentiality.",
      },
      {
        q: "Can the chatbot help with exam preparation?",
        a: "Absolutely! Our AI chatbot assists with exam prep, explains difficult concepts, clarifies doubts, and provides targeted help for VTU curriculum topics.",
      },
      {
        q: "How can I get technical support?",
        a: "Contact us through our website for any technical issues, suggestions, or support needs. Our team responds promptly to resolve any concerns.",
      },
    ]
  },
  {
    category: "VTU Academic Information",
    questions: [
      {
        q: "What is the minimum passing grade in VTU?",
        a: "The minimum passing grade in VTU is 40% for each subject. Students must secure at least 40% marks in both internal assessment and external examination separately to pass a subject.",
      },
      {
        q: "How are internal marks evaluated in VTU?",
        a: "Internal marks in VTU are evaluated out of 50 marks and typically include:- Three Internal Assessment Tests (IATs) - Best two out of three are considered- Assignments and seminars- Attendance marks- Laboratory work and practical assessments (for practical subjects)- Mini projects or case studies (subject-specific)",
      },
      {
        q: "What is the VTU grading system?",
        a: "VTU follows a 10-point grading scale:- S Grade: 90-100% (Outstanding)- A Grade: 80-89% (Excellent)- B Grade: 70-79% (Very Good)- C Grade: 60-69% (Good)- D Grade: 50-59% (Average)- E Grade: 40-49% (Below Average)- F Grade: Below 40% (Fail).",
      },
      {
        q: "How is CGPA calculated in VTU?",
        a: "CGPA is calculated as the weighted average of grade points obtained in all subjects, considering the credit points of each subject. The formula is: CGPA = (Sum of Credit Points × Grade Points) ÷ (Total Credit Points)",
      },
      {
        q: "What is the revaluation process in VTU?",
        a: "Students can apply for revaluation within 15 days of result declaration by paying the prescribed fee. The answer scripts are re-evaluated by different examiners, and if there's a difference of 15% or more, the higher marks are awarded.",
      },
      {
        q: "How many backlogs are allowed in VTU?",
        a: "VTU allows students to carry forward a maximum of 5 backlogs to the next semester. However, for final year students, all backlogs must be cleared to be eligible for the degree.",
      },
      {
        q: "What is the attendance requirement in VTU?",
        a: "VTU requires a minimum of 75% attendance in each subject for students to be eligible to appear for the semester examination. Students with less than 75% attendance may be detained.",
      },
      {
        q: "How are practical/lab marks distributed in VTU?",
        a: "Practical/lab subjects typically have 100 marks distributed as:- Internal assessment: 50 marks (continuous evaluation, lab records, mini projects)- External assessment: 50 marks (practical examination conducted by external examiners)",
      },
      {
        q: "What is the VTU credit system?",
        a: "VTU follows a credit-based system where each subject is assigned credits based on contact hours per week. Typically:- Theory subjects: 3-4 credits- Practical/Lab subjects: 1-2 credits- Project work: 6-12 credits (depending on semester)",
      },
      {
        q: "Can I appear for improvement exams in VTU?",
        a: "Yes, VTU allows students to appear for improvement exams to better their grades. Students who have passed can reappear for examinations to improve their marks, but they must accept the new result regardless of whether it's higher or lower than the previous attempt.",
      },
    ]
  }
];

const Faq= () => {
  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions (FAQs)</h2>
      {FAQ_DATA.map((section, idx) => (
        <div key={idx} className="faq-category">
          <h3>{section.category}</h3>
          {section.questions.map((item, i) => (
            <div className="faq-item" key={i}>
              <h4 className="faq-question">{item.q}</h4>
              <p className="faq-answer">{item.a}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Faq;
