import { useState } from "react";
import axios from "axios";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./AdminDriveUpload.css";

/* ---------------- Sortable Item ---------------- */

function SortableItem({ id, text }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="sortable-item"
    >
      {text}
    </li>
  );
}

/* ---------------- Main Component ---------------- */

export default function AdminDriveUpload() {
  const [subject, setSubject] = useState("");
  const [sem, setSem] = useState("");
  const [folderLink, setFolderLink] = useState("");

  const [loading, setLoading] = useState(false);

  const [matched, setMatched] = useState([]);
  const [unmatchedDB, setUnmatchedDB] = useState([]);
  const [unmatchedDrive, setUnmatchedDrive] = useState([]);

  /* ---------------- Submit ---------------- */

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE}/admin/update-drive-links`,
        { subject, sem, folderLink },
        { withCredentials: true }
      );

      setMatched(res.data.matched || []);
      setUnmatchedDB(res.data.unmatchedDB || []);
      setUnmatchedDrive(res.data.unmatchedDrive || []);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Drag Handler ---------------- */

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setUnmatchedDrive((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);

      const updated = [...items];
      const [moved] = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, moved);

      return updated;
    });
  };

  /* ---------------- Save Manual Matches ---------------- */

  const saveManualMatches = async () => {
    const matches = unmatchedDB.map((db, index) => ({
      dbTitle: db.title,
      driveId: unmatchedDrive[index]?.id,
    })).filter(m => m.driveId);

    await axios.post(
      `${process.env.REACT_APP_API_BASE}/admin/manual-match`,
      { subject, sem, matches },
      { withCredentials: true }
    );

    alert("Manual matches saved!");
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="admin-box">
      <h2>Update Notes from Google Drive</h2>

      <input
        placeholder="Subject (exact)"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <input
        placeholder="Semester (Sem4)"
        value={sem}
        onChange={(e) => setSem(e.target.value)}
      />

      <input
        placeholder="Google Drive Folder Link"
        value={folderLink}
        onChange={(e) => setFolderLink(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Syncing..." : "Update Notes"}
      </button>

      {/* -------- Auto Matched -------- */}
      {matched.length > 0 && (
        <>
          <h3>✅ Auto Matched</h3>
          <ul className="success-list">
            {matched.map((m, i) => (
              <li key={i}>
                {m.driveName} → {m.dbTitle} ({m.method})
              </li>
            ))}
          </ul>
        </>
      )}

      {/* -------- Manual Matching -------- */}
      {unmatchedDB.length > 0 && unmatchedDrive.length > 0 && (
        <>
          <h3>⚠ Manual Matching</h3>

          <div className="grid grid-cols-2 gap-6">
            {/* DB Titles */}
            <ul className="column">
              <h4>DB Titles</h4>
              {unmatchedDB.map((d) => (
                <li key={d._id} className="static-item">
                  {d.title}
                </li>
              ))}
            </ul>

            {/* Drive Files (Sortable) */}
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={unmatchedDrive.map((d) => d.id)}
                strategy={verticalListSortingStrategy}
              >
                <ul className="column">
                  <h4>Drive Files (Drag to Match)</h4>
                  {unmatchedDrive.map((f) => (
                    <SortableItem
                      key={f.id}
                      id={f.id}
                      text={f.name}
                    />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          </div>

          <button onClick={saveManualMatches} className="save-btn">
            Save Manual Matches
          </button>
        </>
      )}
    </div>
  );
}
