import React from 'react';

// Template 2 — Modern (Based on reference image: Frederik Smith style)
// Single column, sans-serif, uppercase section headings with blue underline

const Template2 = ({ data }) => {
  const {
    name,
    title,
    email,
    phone,
    location,
    linkedin,
    summary,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    courses = []
  } = data || {};

  return (
    <div
      style={{
        width: "794px",
        minHeight: "1123px",
        background: "#ffffff",
        fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
        color: "#000000",
        padding: "44px 52px",
        boxSizing: "border-box",
        fontSize: "13px",
        lineHeight: "1.55",
      }}
    >
      {/* ── HEADER ── */}
      <div style={{ textAlign: "center", marginBottom: "14px" }}>
        {/* Name */}
        <h1
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            margin: "0 0 4px 0",
            letterSpacing: "0.3px",
          }}
        >
          {name || "Your Name"}
        </h1>

        {/* Title / Job Role */}
        {title && (
          <p style={{ fontSize: "14px", margin: "0 0 6px 0", fontWeight: "normal" }}>
            {title}
          </p>
        )}

        {/* Contact row */}
        <p style={{ fontSize: "12.5px", margin: "0", color: "#222" }}>
          {[location, phone, email, linkedin]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </div>

      {/* ── SUMMARY ── */}
      {summary && (
        <div style={{ marginBottom: "18px" }}>
          <p
            style={{
              fontStyle: "italic",
              fontSize: "13px",
              margin: "0",
              lineHeight: "1.6",
            }}
          >
            {summary}
          </p>
        </div>
      )}

      {/* ── AREAS OF EXPERTISE (Skills) ── */}
      {skills?.length > 0 && (
        <Section title="Areas of Expertise">
          <p style={{ margin: "4px 0 0 0", fontSize: "13px", lineHeight: "1.7" }}>
            {skills.join(" • ")}
          </p>
        </Section>
      )}

      {/* ── PROJECTS ── */}
      {projects?.length > 0 && (
        <Section title="Projects">
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              {/* Project name + date */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "2px",
                }}
              >
                <span style={{ fontWeight: "bold", fontSize: "13.5px" }}>
                  {proj.name || "Project Name"}
                </span>
                {proj.date && (
                  <span style={{ fontSize: "12.5px", whiteSpace: "nowrap", marginLeft: "8px" }}>
                    {proj.date}
                  </span>
                )}
              </div>

              {/* Bullets */}
              {proj.bullets?.filter(Boolean).length > 0 && (
                <ul style={{ margin: "3px 0 0 0", paddingLeft: "18px", listStyleType: "disc" }}>
                  {proj.bullets.filter(Boolean).map((b, j) => (
                    <li key={j} style={{ fontSize: "13px", marginBottom: "3px" }}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ── PROFESSIONAL EXPERIENCE ── */}
      {experience?.length > 0 && (
        <Section title="Professional Experience">
          {experience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: "14px" }}>
              {/* Company + date row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span style={{ fontWeight: "bold", fontSize: "13.5px" }}>
                  {exp.company || "Company"}
                  {exp.location ? ` | ${exp.location}` : ""}
                </span>
                <span style={{ fontSize: "12.5px", whiteSpace: "nowrap", marginLeft: "8px" }}>
                  {exp.duration || ""}
                </span>
              </div>

              {/* Role + type */}
              <div style={{ fontSize: "13px", marginBottom: "3px" }}>
                {exp.role || ""}
              </div>

              {/* Bullets (no bullet points, just paragraphs like image 2) */}
              {exp.bullets?.filter(Boolean).length > 0 && (
                <div style={{ marginTop: "3px" }}>
                  {exp.bullets.filter(Boolean).map((b, i) => (
                    <p key={i} style={{ margin: "0 0 3px 0", fontSize: "13px" }}>
                      {b}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ── EDUCATION ── */}
      {education?.length > 0 && (
        <Section title="Education">
          {education.map((edu, idx) => (
            <div key={idx} style={{ marginBottom: "10px" }}>
              {/* School + dates */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span style={{ fontWeight: "bold", fontSize: "13.5px" }}>
                  {edu.school || "School"}
                  {edu.location ? ` | ${edu.location}` : ""}
                </span>
                <span style={{ fontSize: "12.5px", fontStyle: "italic", whiteSpace: "nowrap" }}>
                  {edu.year || ""}
                </span>
              </div>

              {/* Degree */}
              <div style={{ fontSize: "13px" }}>{edu.degree || ""}</div>

              {/* GPA */}
              {edu.gpa && (
                <div style={{ fontSize: "13px", marginTop: "2px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>•</span>
                  <span style={{ fontWeight: "bold" }}>GPA: {edu.gpa}</span>
                </div>
              )}

              {/* Extra bullets (honors, activities) */}
              {edu.bullets?.filter(Boolean).length > 0 && (
                <div style={{ marginTop: "2px" }}>
                  {edu.bullets.filter(Boolean).map((b, i) => (
                    <p key={i} style={{ margin: "0", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>•</span>
                      <span>{b}</span>
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ── COURSES ── */}
      {courses?.length > 0 && (
        <Section title="Courses">
          {courses.map((course, i) => (
            <p key={i} style={{ margin: "0 0 4px 0", fontSize: "13px" }}>
              <span style={{ color: "#0000EE", textDecoration: "underline" }}>
                {course.name || "Course Name"}
              </span>
              {course.provider ? ` by ${course.provider}` : ""}
              {course.date ? ` | ${course.date}` : ""}
            </p>
          ))}
        </Section>
      )}
    </div>
  );
};

// ── Reusable Section Heading Component ──
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <h2
        style={{
          fontSize: "13px",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          margin: "0 0 3px 0",
          color: "#000",
          paddingBottom: "3px",
          borderBottom: "2px solid #1a56db",    // blue underline accent
        }}
      >
        {title}
      </h2>
      <div style={{ marginTop: "8px" }}>{children}</div>
    </div>
  );
}

export default Template2;
