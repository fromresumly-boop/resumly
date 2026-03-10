import React from 'react';

// Template 1 — Classic (Based on reference image: Alex Rivera style)
// Single column, serif font, black/white, underlined section headings

const Template1 = ({ data }) => {
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
        fontFamily: "'Times New Roman', Times, serif",
        color: "#000000",
        padding: "48px 56px",
        boxSizing: "border-box",
        fontSize: "13px",
        lineHeight: "1.5",
      }}
    >
      {/* ── HEADER ── */}
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <h1
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            margin: "0 0 4px 0",
            letterSpacing: "0.5px",
          }}
        >
          {name || "Your Name"}
        </h1>
        
        {/* Title / Job Role */}
        {title && (
          <p style={{ fontSize: "14px", margin: "0 0 6px 0", fontWeight: "normal", fontStyle: "italic" }}>
            {title}
          </p>
        )}

        {/* Contact Row */}
        <p style={{ fontSize: "12.5px", margin: "0", color: "#000" }}>
          {[phone, email, linkedin, location]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>

      {/* Full-width divider under header */}
      <hr style={{ border: "none", borderTop: "1.5px solid #000", margin: "8px 0 12px 0" }} />

      {/* ── SUMMARY ── */}
      {summary && (
        <Section title="Summary">
          <p style={{ margin: "4px 0 0 0", fontSize: "13px" }}>{summary}</p>
        </Section>
      )}

      {/* ── PROFESSIONAL EXPERIENCE ── */}
      {experience?.length > 0 && (
        <Section title="Professional Experience">
          {experience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: "12px" }}>
              {/* Role + Date row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: "bold", fontSize: "13.5px" }}>
                  {exp.role || "Role"}
                </span>
                <span style={{ fontSize: "12.5px", whiteSpace: "nowrap", marginLeft: "8px" }}>
                  {exp.duration || ""}
                </span>
              </div>

              {/* Company + Location row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontStyle: "italic", fontSize: "13px" }}>
                  {exp.company || ""}
                </span>
                <span style={{ fontSize: "12.5px", fontStyle: "italic", whiteSpace: "nowrap", marginLeft: "8px" }}>
                  {exp.location || ""}
                </span>
              </div>

              {/* Bullets */}
              {exp.bullets?.filter(Boolean).length > 0 && (
                <ul style={{ margin: "4px 0 0 0", paddingLeft: "18px", listStyleType: "disc" }}>
                  {exp.bullets.filter(Boolean).map((b, i) => (
                    <li key={i} style={{ fontSize: "13px", marginBottom: "3px" }}>{b}</li>
                  ))}
                </ul>
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
              {/* School + Year row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: "bold", fontSize: "13.5px" }}>
                  {edu.school || "School"}
                </span>
                <span style={{ fontSize: "12.5px", whiteSpace: "nowrap", marginLeft: "8px" }}>
                  {edu.year || ""}
                </span>
              </div>

              {/* Degree + Location row */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontStyle: "italic", fontSize: "13px" }}>
                  {edu.degree || ""}
                </span>
                <span style={{ fontSize: "12.5px", fontStyle: "italic" }}>
                  {edu.location || ""}
                </span>
              </div>

              {/* Extra bullets (GPA, activities) */}
              {(edu.gpa || (edu.bullets?.filter(Boolean).length > 0)) && (
                <ul style={{ margin: "3px 0 0 0", paddingLeft: "18px", listStyleType: "disc" }}>
                  {edu.gpa && (
                    <li style={{ fontSize: "13px" }}>GPA: {edu.gpa}</li>
                  )}
                  {edu.bullets?.filter(Boolean).map((b, i) => (
                    <li key={i} style={{ fontSize: "13px" }}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ── PROJECTS ── */}
      {projects?.length > 0 && (
        <Section title="Projects">
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: "bold", fontSize: "13.5px" }}>
                   {proj.name || "Project Name"}
                </span>
                {proj.date && (
                  <span style={{ fontSize: "12.5px", whiteSpace: "nowrap", marginLeft: "8px" }}>
                    {proj.date}
                  </span>
                )}
              </div>
              {proj.bullets?.filter(Boolean).length > 0 && (
                <ul style={{ margin: "4px 0 0 0", paddingLeft: "18px", listStyleType: "disc" }}>
                  {proj.bullets.filter(Boolean).map((b, j) => (
                    <li key={j} style={{ fontSize: "13px", marginBottom: "3px" }}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ── SKILLS ── */}
      {skills?.length > 0 && (
        <Section title="Skills">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "2px 0",
              marginTop: "4px",
            }}
          >
            {skills.map((skill, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                <span style={{ fontSize: "13px" }}>•</span>
                <span style={{ fontSize: "13px" }}>{skill}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── COURSES ── */}
      {courses?.length > 0 && (
        <Section title="Courses">
          {courses.map((course, i) => (
            <p key={i} style={{ margin: "0 0 4px 0", fontSize: "13px" }}>
              <span style={{ fontWeight: "bold" }}>
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
    <div style={{ marginBottom: "14px" }}>
      <h2
        style={{
          fontSize: "13.5px",
          fontWeight: "bold",
          textDecoration: "underline",
          margin: "0 0 2px 0",
          letterSpacing: "0.3px",
        }}
      >
        {title}
      </h2>
      <hr style={{ border: "none", borderTop: "1px solid #000", margin: "0 0 6px 0" }} />
      {children}
    </div>
  );
}

export default Template1;
