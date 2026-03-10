import { pdf } from '@react-pdf/renderer';
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register Fonts
Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKbxmcSA.woff'
});

// ── COMMON STYLES ──
const common = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#ffffff' },
  bulletRow: { flexDirection: 'row', marginBottom: 3 },
  bulletPoint: { width: 10, fontSize: 10 },
  bulletText: { flex: 1, fontSize: 10, lineHeight: 1.5, color: '#333333' }
});

// ── TEMPLATE 1 STYLES (Classic Alex Rivera) ──
const styles1 = StyleSheet.create({
  container: { fontFamily: 'Times-Roman' },
  header: { textAlign: 'center', marginBottom: 15 },
  name: { fontSize: 24, fontWeight: 'bold' },
  title: { fontSize: 12, marginBottom: 5, fontStyle: 'italic' },
  contact: { fontSize: 10, color: '#000000' },
  divider: { borderBottom: 1.5, borderColor: '#000000', marginVertical: 8 },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', textDecoration: 'underline', marginBottom: 2, textTransform: 'uppercase' },
  sectionLine: { borderBottom: 1, borderColor: '#000000', marginBottom: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  boldText: { fontSize: 11, fontWeight: 'bold' },
  italicText: { fontSize: 10, fontStyle: 'italic' },
  normalText: { fontSize: 10 },
  date: { fontSize: 10 },
  summary: { fontSize: 10, lineHeight: 1.5 },
  skillGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 5 },
  skillItem: { fontSize: 10 }
});

// ── TEMPLATE 2 STYLES (Modern Frederik Smith) ──
const styles2 = StyleSheet.create({
  container: { fontFamily: 'Helvetica' },
  header: { textAlign: 'center', marginBottom: 15 },
  name: { fontSize: 24, fontWeight: 'bold' },
  title: { fontSize: 12, marginBottom: 5 },
  contact: { fontSize: 10, color: '#222222' },
  summary: { fontSize: 10, fontStyle: 'italic', lineHeight: 1.5, marginBottom: 15 },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 2, paddingBottom: 2, borderBottomWidth: 2, borderBottomColor: '#1a56db' },
  sectionContent: { marginTop: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  boldText: { fontSize: 11, fontWeight: 'bold' },
  normalText: { fontSize: 10 },
  date: { fontSize: 10 },
  skillList: { fontSize: 10, lineHeight: 1.7 }
});

// ── TEMPLATE 1 COMPONENT ──
const Template1Layout = ({ data }) => (
  <View style={styles1.container}>
    <View style={styles1.header}>
      <Text style={styles1.name}>{data.name || "Your Name"}</Text>
      {data.title && <Text style={styles1.title}>{data.title}</Text>}
      <Text style={styles1.contact}>
        {[data.phone, data.email, data.linkedin, data.location].filter(Boolean).join('  ·  ')}
      </Text>
    </View>
    <View style={styles1.divider} />

    {data.summary && (
      <View style={styles1.section}>
        <Text style={styles1.sectionTitle}>Summary</Text>
        <View style={styles1.sectionLine} />
        <Text style={styles1.summary}>{data.summary}</Text>
      </View>
    )}

    {data.experience?.length > 0 && (
      <View style={styles1.section}>
        <Text style={styles1.sectionTitle}>Professional Experience</Text>
        <View style={styles1.sectionLine} />
        {data.experience.map((exp, i) => (
          <View key={i} style={{ marginBottom: 10 }}>
            <View style={styles1.row}>
              <Text style={styles1.boldText}>{exp.role || "Role"}</Text>
              <Text style={styles1.date}>{exp.duration}</Text>
            </View>
            <View style={styles1.row}>
              <Text style={styles1.italicText}>{exp.company}</Text>
              <Text style={styles1.italicText}>{exp.location || data.location}</Text>
            </View>
            {exp.bullets?.map((b, bi) => (
              <View key={bi} style={common.bulletRow}>
                <Text style={common.bulletPoint}>•</Text>
                <Text style={common.bulletText}>{b}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    )}

    {data.education?.length > 0 && (
      <View style={styles1.section}>
        <Text style={styles1.sectionTitle}>Education</Text>
        <View style={styles1.sectionLine} />
        {data.education.map((edu, i) => (
          <View key={i} style={{ marginBottom: 8 }}>
            <View style={styles1.row}>
              <Text style={styles1.boldText}>{edu.school}</Text>
              <Text style={styles1.date}>{edu.year}</Text>
            </View>
            <View style={styles1.row}>
              <Text style={styles1.italicText}>{edu.degree}</Text>
              <Text style={styles1.italicText}>{edu.location || ""}</Text>
            </View>
            
            {/* GPA */}
            {edu.gpa && (
              <View style={common.bulletRow}>
                <Text style={common.bulletPoint}>•</Text>
                <Text style={common.bulletText}>GPA: {edu.gpa}</Text>
              </View>
            )}

            {/* Achievement bullets */}
            {edu.bullets?.filter(Boolean).map((b, bi) => (
              <View key={bi} style={common.bulletRow}>
                <Text style={common.bulletPoint}>•</Text>
                <Text style={common.bulletText}>{b}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    )}

    {data.projects?.length > 0 && (
      <View style={styles1.section}>
        <Text style={styles1.sectionTitle}>Projects</Text>
        <View style={styles1.sectionLine} />
        {data.projects.map((proj, i) => (
          <View key={i} style={{ marginBottom: 10 }}>
            <View style={styles1.row}>
              <Text style={styles1.boldText}>{proj.name}</Text>
              <Text style={styles1.date}>{proj.date}</Text>
            </View>
            {proj.bullets?.map((b, bi) => (
              <View key={bi} style={common.bulletRow}>
                <Text style={common.bulletPoint}>•</Text>
                <Text style={common.bulletText}>{b}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    )}

    {data.skills?.length > 0 && (
      <View style={styles1.section}>
        <Text style={styles1.sectionTitle}>Skills</Text>
        <View style={styles1.sectionLine} />
        <View style={styles1.skillGrid}>
          {data.skills.map((s, i) => (
            <Text key={i} style={styles1.skillItem}>• {s}</Text>
          ))}
        </View>
      </View>
    )}

    {data.courses?.length > 0 && (
      <View style={styles1.section}>
        <Text style={styles1.sectionTitle}>Courses</Text>
        <View style={styles1.sectionLine} />
        {data.courses.map((c, i) => (
          <Text key={i} style={styles1.normalText}>
            <Text style={{ fontWeight: 'bold' }}>{c.name}</Text>
            {c.provider ? ` by ${c.provider}` : ""} {c.date ? ` | ${c.date}` : ""}
          </Text>
        ))}
      </View>
    )}
  </View>
);

// ── TEMPLATE 2 COMPONENT ──
const Template2Layout = ({ data }) => (
  <View style={styles2.container}>
    <View style={styles2.header}>
      <Text style={styles2.name}>{data.name || "Your Name"}</Text>
      {data.title && <Text style={styles2.title}>{data.title}</Text>}
      <Text style={styles2.contact}>
        {[data.location, data.phone, data.email, data.linkedin].filter(Boolean).join('  |  ')}
      </Text>
    </View>

    {data.summary && <Text style={styles2.summary}>{data.summary}</Text>}

    {data.skills?.length > 0 && (
      <View style={styles2.section}>
        <Text style={styles2.sectionTitle}>Areas of Expertise</Text>
        <View style={styles2.sectionContent}>
          <Text style={styles2.skillList}>{data.skills.join('  •  ')}</Text>
        </View>
      </View>
    )}

    {data.projects?.length > 0 && (
      <View style={styles2.section}>
        <Text style={styles2.sectionTitle}>Projects</Text>
        <View style={styles2.sectionContent}>
          {data.projects.map((proj, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <View style={styles2.row}>
                <Text style={styles2.boldText}>{proj.name}</Text>
                <Text style={styles2.date}>{proj.date}</Text>
              </View>
              {proj.bullets?.map((b, bi) => (
                <View key={bi} style={common.bulletRow}>
                  <Text style={common.bulletPoint}>•</Text>
                  <Text style={common.bulletText}>{b}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    )}

    {data.experience?.length > 0 && (
      <View style={styles2.section}>
        <Text style={styles2.sectionTitle}>Professional Experience</Text>
        <View style={styles2.sectionContent}>
          {data.experience.map((exp, i) => (
            <View key={i} style={{ marginBottom: 12 }}>
              <View style={styles2.row}>
                <Text style={styles2.boldText}>
                  {exp.company}{exp.location ? ` | ${exp.location}` : ""}
                </Text>
                <Text style={styles2.date}>{exp.duration}</Text>
              </View>
              <Text style={styles2.normalText}>{exp.role}</Text>
              <View style={{ marginTop: 3 }}>
                {exp.bullets?.map((b, bi) => (
                  <Text key={bi} style={[styles2.normalText, { marginBottom: 2 }]}>{b}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    )}

    {data.education?.length > 0 && (
      <View style={styles2.section}>
        <Text style={styles2.sectionTitle}>Education</Text>
        <View style={styles2.sectionContent}>
          {data.education.map((edu, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <View style={styles2.row}>
                <Text style={styles2.boldText}>
                  {edu.school}{edu.location ? ` | ${edu.location}` : ""}
                </Text>
                <Text style={[styles2.date, { fontStyle: 'italic' }]}>{edu.year}</Text>
              </View>
              <Text style={styles2.normalText}>{edu.degree}</Text>
              
              {/* GPA */}
              {edu.gpa && (
                <View style={[common.bulletRow, { marginTop: 2 }]}>
                  <Text style={common.bulletPoint}>•</Text>
                  <Text style={common.bulletText}>GPA: {edu.gpa}</Text>
                </View>
              )}

              {/* Achievement bullets */}
              {edu.bullets?.filter(Boolean).map((b, bi) => (
                <View key={bi} style={[common.bulletRow, { marginTop: 1 }]}>
                  <Text style={common.bulletPoint}>•</Text>
                  <Text style={common.bulletText}>{b}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    )}

    {data.courses?.length > 0 && (
      <View style={styles2.section}>
        <Text style={styles2.sectionTitle}>Courses</Text>
        <View style={styles2.sectionContent}>
          {data.courses.map((c, i) => (
            <Text key={i} style={[styles2.normalText, { marginBottom: 3 }]}>
              <Text style={{ color: '#0000EE', textDecoration: 'underline' }}>{c.name}</Text>
              {c.provider ? ` by ${c.provider}` : ""} {c.date ? ` | ${c.date}` : ""}
            </Text>
          ))}
        </View>
      </View>
    )}
  </View>
);

// ── MASTER PDF DOCUMENT ──
const ResumePDF = ({ data, templateId }) => (
  <Document>
    <Page size="A4" style={common.page}>
      {templateId === 1 ? (
        <Template1Layout data={data} />
      ) : (
        <Template2Layout data={data} />
      )}
    </Page>
  </Document>
);

import { supabase } from '../lib/supabaseClient';

export const generateAndDownloadPDF = async (resumeData, selectedTemplate, userId) => {
  try {
    // 1. Generate PDF blob
    const blob = await pdf(<ResumePDF data={resumeData} templateId={selectedTemplate} />).toBlob();
    
    // 2. Trigger browser download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = `Resume_${(resumeData.name || 'document').replace(/\s+/g, '_')}.pdf`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (!userId) {
      return { blob };
    }

    // 3. Upload to Supabase Storage
    const resumeId = crypto.randomUUID();
    const filePath = `${userId}/${resumeId}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(filePath, blob, { contentType: 'application/pdf', upsert: true });

    if (uploadError) {
      console.error('Upload failed:', uploadError);
      return { blob, resumeId: null, filePath: null };
    }

    return { filePath, resumeId, blob };
  } catch (error) {
    console.error("PDF generation error:", error);
    return null;
  }
};
