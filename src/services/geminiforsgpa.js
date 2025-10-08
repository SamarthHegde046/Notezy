// services/geminiforsgpa.js (now renamed logic, but you can keep filename same)

export async function extractSubjectMarksFromText(file) {
  const formData = new FormData();
  formData.append("pdf", file);

  const response = await fetch("https://pdftextextractermodel-1.onrender.com/extract", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("❌ Failed to extract from PDF");
  }

  const data = await response.json();

  console.log(data);
  

  const semester = parseInt(data.SEM?.[0] || "0");
  const subjects = (data.SUBCODE || []).map((code, index) => ({
    code,
    marks: parseInt(data.TMARK?.[index] || "0")
  }));

  return {
    semester,
    subjects
  };
}
