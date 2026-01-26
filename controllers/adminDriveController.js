//adminDriveController.js
const { google } = require("googleapis");
const Notes = require("../models/Note");
const { matchTitleWithAI } = require("../services/aiTitleMatcher");

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({ version: "v3", auth });

/* ----------------------------------
   Helpers
---------------------------------- */

function extractFolderId(link) {
  if (!link) return null;
  return link.split("/folders/")[1]?.split("?")[0];
}

/* ----------------------------------
   Controller
---------------------------------- */

exports.updateFromDrive = async (req, res) => {
  try {
    const { subject, sem, folderLink } = req.body;

    if (!subject || !sem || !folderLink) {
      return res.status(400).json({
        message: "subject, sem and folderLink are required",
      });
    }

    const folderId = extractFolderId(folderLink);
    if (!folderId) {
      return res.status(400).json({ message: "Invalid Google Drive folder link" });
    }

    /* 1️⃣ Fetch DB titles */
    const dbNotes = await Notes.find(
      { subject, sem },
      { title: 1, _id: 0 }
    );

    if (!dbNotes.length) {
      return res.status(404).json({
        message: "No notes found for given subject & semester",
      });
    }

    const titles = dbNotes.map((n) => n.title);

    /* 2️⃣ Fetch Drive files */
    const driveRes = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: "files(id, name)",
      pageSize: 1000,
    });

    const logs = [];
    let updatedCount = 0;

    /* 3️⃣ Match & update */
    for (const file of driveRes.data.files) {
      const result = await matchTitleWithAI(file.name, titles);

      if (!result.matchedTitle) {
        logs.push(`❌ No match → ${file.name}`);
        continue;
      }

      const fileUrl = `https://drive.google.com/file/d/${file.id}/view`;

      const updated = await Notes.findOneAndUpdate(
        {
          title: result.matchedTitle,
          subject,
          sem,
        },
        {
          $set: { fileUrl },
        },
        { new: true }
      );

      if (updated) {
        updatedCount++;
        logs.push(
          `✅ (${result.method}) ${file.name} → ${result.matchedTitle}`
        );
      } else {
        logs.push(
          `⚠️ Matched but not updated → ${file.name}`
        );
      }
    }

    /* 4️⃣ Response */
    res.json({
      message: "Google Drive AI sync completed",
      updatedCount,
      totalFiles: driveRes.data.files.length,
      logs,
    });

  } catch (err) {
    console.error("Drive Sync Error:", err.message);
    res.status(500).json({
      message: "AI Drive sync failed",
    });
  }
};
