import { useState, useRef, useEffect } from "react";

const ADMIN_EMAILS = ["paswanjee123098@gmail.com", "paswanboss11@gmail.com"];
const CLASSES = Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`);
const SUBJECTS = {
  "Class 1-2": ["English", "Mathematics", "EVS", "Hindi", "Drawing"],
  "Class 3-5": ["English", "Mathematics", "Science", "Social Studies", "Hindi", "Computer"],
  "Class 6-8": ["English", "Mathematics", "Science", "Social Studies", "Hindi", "Sanskrit", "Computer"],
  "Class 9-10": ["English", "Mathematics", "Science", "Social Studies", "Hindi", "Sanskrit", "IT"],
};

const IGRAM = "https://instagram.com/ur_pankaj_kumar_";
const IGSVG = <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;

// ─── SHARED DATA (simulated persistent store) ────────────────
const sharedData = {
  appName: "Study AI Hub",
  pdfs: [
    { id: 1, title: "NCERT Mathematics Class 9", class: "Class 9", subject: "Mathematics", size: "12 MB", date: "2024-01-10" },
    { id: 2, title: "NCERT Science Class 8", class: "Class 8", subject: "Science", size: "9 MB", date: "2024-01-12" },
    { id: 3, title: "English Grammar Guide", class: "Class 6-10", subject: "English", size: "5 MB", date: "2024-01-15" },
  ],
  videos: [
    { id: 1, title: "Quadratic Equations Explained", class: "Class 10", subject: "Mathematics", duration: "18:32", views: "2.4K", date: "2024-01-08" },
    { id: 2, title: "Newton's Laws of Motion", class: "Class 9", subject: "Science", duration: "22:10", views: "1.8K", date: "2024-01-11" },
    { id: 3, title: "Essay Writing Tips", class: "Class 8", subject: "English", duration: "14:45", views: "980", date: "2024-01-14" },
  ],
  notes: [
    { id: 1, title: "Algebra Formulas Sheet", class: "Class 9", subject: "Mathematics", date: "2024-01-09" },
    { id: 2, title: "Chemical Reactions Notes", class: "Class 10", subject: "Science", date: "2024-01-13" },
    { id: 3, title: "History — Mughal Empire", class: "Class 7", subject: "Social Studies", date: "2024-01-16" },
  ],
  announcements: [
    { id: 1, title: "Exam Schedule Released", body: "Final exams start from March 10. Download the schedule from PDFs section.", date: "2024-01-20" },
    { id: 2, title: "New Videos Added", body: "10 new video lectures added for Class 9 & 10 Mathematics.", date: "2024-01-18" },
  ],
  students: [
    { name: "Ravi Kumar", class: "Class 10", school: "Delhi Public School", joined: "2024-01-01" },
    { name: "Priya Singh", class: "Class 8", school: "St. Mary's School", joined: "2024-01-03" },
    { name: "Amit Yadav", class: "Class 6", school: "Kendriya Vidyalaya", joined: "2024-01-05" },
    { name: "Sneha Jha", class: "Class 9", school: "DAV School", joined: "2024-01-07" },
    { name: "Rohit Paswan", class: "Class 7", school: "Govt. High School", joined: "2024-01-09" },
  ],
};

export default function StudyAIHub() {
  const [screen, setScreen] = useState("login");
  const [darkMode, setDarkMode] = useState(false);
  const [loginTab, setLoginTab] = useState("mobile");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [selectedClass, setSelectedClass] = useState("Class 9");
  const [activeSection, setActiveSection] = useState("home");

  // AI Creator state
  const [aiTab, setAiTab] = useState("chat");
  const [aiMessages, setAiMessages] = useState([
    { role: "assistant", text: "Namaste! 🙏 Main hoon aapka AI Study Creator. Aap mujhse koi bhi sawaal poochh sakte hain — padhai ke baare mein, homework mein, ya kisi bhi topic ke baare mein. Main Hindi aur English dono mein baat kar sakta hoon!" }
  ]);
  const [aiQuery, setAiQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMode, setAiMode] = useState("chat");
  const chatEndRef = useRef(null);

  // Admin state
  const [adminTab, setAdminTab] = useState("dashboard");
  const [appName, setAppName] = useState(sharedData.appName);
  const [editingAppName, setEditingAppName] = useState(false);
  const [tempAppName, setTempAppName] = useState(sharedData.appName);
  const [pdfs, setPdfs] = useState(sharedData.pdfs);
  const [videos, setVideos] = useState(sharedData.videos);
  const [notes, setNotes] = useState(sharedData.notes);
  const [announcements, setAnnouncements] = useState(sharedData.announcements);
  const [students, setStudents] = useState(sharedData.students);
  const [newPdf, setNewPdf] = useState({ title: "", class: "Class 9", subject: "Mathematics", size: "" });
  const [newVideo, setNewVideo] = useState({ title: "", class: "Class 9", subject: "Mathematics", duration: "" });
  const [newNote, setNewNote] = useState({ title: "", class: "Class 9", subject: "Mathematics" });
  const [newAnn, setNewAnn] = useState({ title: "", body: "" });
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [adminSubTab, setAdminSubTab] = useState("list");

  // Other state
  const [bookmarks, setBookmarks] = useState([]);
  const [notifications, setNotifications] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [regData, setRegData] = useState({ name: "", classVal: "Class 1", school: "", location: "", parentMobile: "" });
  const [themeColor, setThemeColor] = useState("#D72638");

  const dm = darkMode;
  const bg = dm ? "#0f0f0f" : "#ffffff";
  const surface = dm ? "#1a1a1a" : "#f8f8f8";
  const card = dm ? "#212121" : "#ffffff";
  const text = dm ? "#f0f0f0" : "#111111";
  const sub = dm ? "#888" : "#666";
  const border = dm ? "#2e2e2e" : "#ebebeb";
  const red = themeColor;
  const redLight = dm ? "#3a0e18" : "#fff0f2";

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [aiMessages, aiLoading]);

  const S = {
    app: { fontFamily: "'DM Sans', sans-serif", background: bg, color: text, minHeight: "100vh", maxWidth: 430, margin: "0 auto", position: "relative" },
    hdr: { background: red, color: "#fff", padding: "13px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 },
    card: { background: card, border: `1px solid ${border}`, borderRadius: 14, padding: 16, marginBottom: 12 },
    btn: { background: red, color: "#fff", border: "none", borderRadius: 10, padding: "13px 0", width: "100%", fontSize: 15, fontWeight: 700, cursor: "pointer" },
    btnSm: { background: red, color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" },
    btnOut: { background: "transparent", color: red, border: `1.5px solid ${red}`, borderRadius: 10, padding: "12px 0", width: "100%", fontSize: 15, fontWeight: 600, cursor: "pointer" },
    inp: { background: surface, border: `1.5px solid ${border}`, borderRadius: 10, padding: "11px 13px", width: "100%", fontSize: 14, color: text, outline: "none", boxSizing: "border-box" },
    tab: (a) => ({ padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", background: a ? red : "transparent", color: a ? "#fff" : sub, border: "none", whiteSpace: "nowrap" }),
    nav: (a) => ({ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "6px 10px", borderRadius: 10, cursor: "pointer", background: a ? redLight : "transparent", color: a ? red : sub, fontSize: 9, fontWeight: a ? 700 : 500, minWidth: 48 }),
    chip: { display: "inline-block", background: redLight, color: red, borderRadius: 20, padding: "4px 11px", fontSize: 12, fontWeight: 600 },
    ttl: { fontSize: 16, fontWeight: 700, marginBottom: 12, color: text },
    lbl: { fontSize: 12, fontWeight: 600, color: sub, marginBottom: 4, display: "block" },
    scroll: { overflowY: "auto", height: "calc(100vh - 116px)", paddingBottom: 80 },
    badge: { background: red, color: "#fff", borderRadius: 12, padding: "2px 8px", fontSize: 11, fontWeight: 700 },
  };

  const showSuccess = (msg) => { setUploadSuccess(msg); setTimeout(() => setUploadSuccess(""), 3000); };

  // ── LOGIN ────────────────────────────────────────────────────
  const handleLogin = () => {
    const isAdm = loginTab === "email" && ADMIN_EMAILS.includes(email.trim().toLowerCase());
    setIsAdmin(isAdm);
    setAdminEmail(isAdm ? email.trim().toLowerCase() : "");
    setScreen("home");
    if (isAdm) setActiveSection("admin");
  };

  // ── AI CHAT ──────────────────────────────────────────────────
  const AI_MODES = [
    { id: "chat", label: "💬 Free Chat", sys: "You are a friendly, expert AI tutor for Indian school students (Class 1-10). You can speak in both Hindi and English (Hinglish too). Be encouraging, clear, and educational. Cover NCERT syllabus." },
    { id: "homework", label: "📚 Homework Help", sys: "You are a homework helper for Indian school students. Solve problems step by step, explain each step clearly. Use simple language. Support Hindi and English." },
    { id: "exam", label: "🎯 Exam Prep", sys: "You are an exam preparation coach for Indian school students. Give important questions, tips, mnemonics, and short notes. Focus on NCERT and board exam patterns." },
    { id: "notes", label: "📋 Notes Generator", sys: "Generate clear, well-structured study notes from the given topic for Indian school students. Use bullet points, headings, and simple language. Output in the same language the user writes in." },
    { id: "quiz", label: "🧠 Quiz Me", sys: "Create interactive quiz questions on the topic the student mentions. Give 1 MCQ at a time with 4 options. After the student answers, tell if correct and explain. Keep it fun!" },
    { id: "summary", label: "📄 PDF Summary", sys: "Summarize or explain study topics as if summarizing a textbook chapter. Be concise but thorough. Use headings and bullet points." },
  ];

  const sendAI = async () => {
    if (!aiQuery.trim()) return;
    const msg = aiQuery.trim();
    setAiQuery("");
    const modeObj = AI_MODES.find(m => m.id === aiMode) || AI_MODES[0];
    const history = aiMessages.map(m => ({ role: m.role, content: m.text }));
    setAiMessages(prev => [...prev, { role: "user", text: msg }]);
    setAiLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: modeObj.sys,
          messages: [...history, { role: "user", content: msg }],
        })
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text || "").join("") || "Kuch problem aa gayi. Dobara try karein!";
      setAiMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setAiMessages(prev => [...prev, { role: "assistant", text: "Connection error. Please try again! 🔄" }]);
    }
    setAiLoading(false);
  };

  // ── SCREENS ──────────────────────────────────────────────────

  if (screen === "login") return (
    <div style={{ ...S.app, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      {/* IG Banner */}
      <div style={{ background: redLight, borderBottom: `1px solid ${border}`, padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, color: red }}>{IGSVG}<span style={{ fontSize: 12, fontWeight: 700 }}>@ur_pankaj_kumar_</span></div>
        <a href={IGRAM} target="_blank" rel="noreferrer" style={{ background: red, color: "#fff", borderRadius: 6, padding: "4px 13px", fontSize: 11, fontWeight: 700, textDecoration: "none" }}>Follow ✨</a>
      </div>

      <div style={{ flex: 1, padding: "30px 22px 24px", display: "flex", flexDirection: "column" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 72, height: 72, background: red, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, color: red, letterSpacing: -1 }}>{appName}</div>
          <div style={{ fontSize: 13, color: sub, marginTop: 3 }}>Smart Learning for Class 1–10</div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: surface, borderRadius: 10, padding: 4, marginBottom: 22 }}>
          <button style={{ ...S.tab(loginTab === "mobile"), flex: 1 }} onClick={() => setLoginTab("mobile")}>📱 Mobile</button>
          <button style={{ ...S.tab(loginTab === "email"), flex: 1 }} onClick={() => setLoginTab("email")}>✉️ Email</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          {loginTab === "mobile" ? (
            <div>
              <label style={S.lbl}>Mobile Number</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: sub, fontWeight: 600 }}>+91</span>
                <input style={{ ...S.inp, paddingLeft: 44 }} placeholder="10-digit number" value={mobile} onChange={e => setMobile(e.target.value)} maxLength={10} />
              </div>
            </div>
          ) : (
            <div>
              <label style={S.lbl}>Email Address</label>
              <input style={S.inp} placeholder="Enter email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          )}
          <div>
            <label style={S.lbl}>Password</label>
            <input style={S.inp} placeholder="Enter password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div style={{ textAlign: "right" }}><span style={{ fontSize: 12, color: red, fontWeight: 600, cursor: "pointer" }}>Forgot Password?</span></div>
          <button style={S.btn} onClick={handleLogin}>Login →</button>
          <button style={S.btnOut} onClick={() => setScreen("register")}>Create New Account</button>
          <p style={{ textAlign: "center", fontSize: 11, color: sub, margin: 0 }}>Admin: Login with registered admin email</p>
        </div>
      </div>
    </div>
  );

  if (screen === "register") return (
    <div style={S.app}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <div style={S.hdr}>
        <button onClick={() => setScreen("login")} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer" }}>←</button>
        <span style={{ fontWeight: 700 }}>Student Registration</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ padding: "20px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
        {[["Full Name", "name", "Your full name"], ["School Name", "school", "School name"], ["Location / City", "location", "City/Town"], ["Parent Mobile", "parentMobile", "Parent's number"]].map(([lbl, key, ph]) => (
          <div key={key}>
            <label style={S.lbl}>{lbl}</label>
            <input style={S.inp} placeholder={ph} value={regData[key]} onChange={e => setRegData(p => ({ ...p, [key]: e.target.value }))} />
          </div>
        ))}
        <div>
          <label style={S.lbl}>Select Class</label>
          <select style={S.inp} value={regData.classVal} onChange={e => setRegData(p => ({ ...p, classVal: e.target.value }))}>
            {CLASSES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <button style={{ ...S.btn, marginTop: 6 }} onClick={() => { setSelectedClass(regData.classVal); setScreen("home"); }}>Register & Start Learning 🚀</button>
      </div>
    </div>
  );

  // ── MAIN APP ─────────────────────────────────────────────────

  // ── HOME ──────────────────────────────────────────────────────
  const Home = () => (
    <div style={{ padding: "16px 14px" }}>
      {/* Search */}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>🔍</span>
        <input style={{ ...S.inp, paddingLeft: 36 }} placeholder="Search subjects, notes, PDFs..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      </div>

      {/* Announcements */}
      {announcements.length > 0 && (
        <div style={{ ...S.card, background: redLight, border: `1px solid ${red}20`, marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: red, marginBottom: 6 }}>📢 LATEST ANNOUNCEMENT</div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{announcements[0].title}</div>
          <div style={{ fontSize: 12, color: sub, marginTop: 3 }}>{announcements[0].body}</div>
        </div>
      )}

      {/* Hero */}
      <div style={{ background: red, borderRadius: 16, padding: "18px 16px", marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginBottom: 3 }}>Welcome back 👋</div>
        <div style={{ fontSize: 19, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Ready to study today?</div>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", color: "#fff", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>{selectedClass}</div>
      </div>

      {/* Quick Access */}
      <div style={S.ttl}>Quick Access</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[
          { icon: "🤖", label: "AI Creator", action: () => setActiveSection("ai") },
          { icon: "📋", label: "Notes", action: () => setActiveSection("notes") },
          { icon: "📄", label: "PDF Reader", action: () => setActiveSection("pdf") },
          { icon: "🎥", label: "Video Lessons", action: () => setActiveSection("videos") },
          { icon: "📝", label: "Daily Quiz", action: () => setActiveSection("quiz") },
          { icon: "📊", label: "My Progress", action: () => setActiveSection("progress") },
        ].map((item, i) => (
          <div key={i} onClick={item.action} style={{ ...S.card, cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: 13, margin: 0, transition: "all 0.15s" }}>
            <div style={{ width: 42, height: 42, background: redLight, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
            <span style={{ fontWeight: 600, fontSize: 13 }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Classes */}
      <div style={S.ttl}>Select Your Class</div>
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 16 }}>
        {CLASSES.map(c => (
          <div key={c} onClick={() => setSelectedClass(c)} style={{ padding: "6px 13px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", background: selectedClass === c ? red : surface, color: selectedClass === c ? "#fff" : text, border: `1.5px solid ${selectedClass === c ? red : border}` }}>{c}</div>
        ))}
      </div>

      {/* Subjects */}
      <div style={S.ttl}>Subjects — {selectedClass}</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {(() => {
          const n = parseInt(selectedClass.split(" ")[1]);
          const grp = n <= 2 ? "Class 1-2" : n <= 5 ? "Class 3-5" : n <= 8 ? "Class 6-8" : "Class 9-10";
          return SUBJECTS[grp].map(s => <div key={s} style={S.chip}>{s}</div>);
        })()}
      </div>

      {/* Recent PDFs */}
      <div style={S.ttl}>Recent PDFs</div>
      {pdfs.slice(0, 3).map(p => (
        <div key={p.id} style={{ ...S.card, display: "flex", alignItems: "center", gap: 12, padding: 13 }}>
          <div style={{ width: 38, height: 38, background: redLight, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📄</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{p.title}</div>
            <div style={{ fontSize: 11, color: sub }}>{p.class} · {p.size}</div>
          </div>
          <button style={S.btnSm}>Open</button>
        </div>
      ))}
    </div>
  );

  // ── AI CREATOR ───────────────────────────────────────────────
  const AICreator = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 116px)" }}>
      {/* Header banner */}
      <div style={{ background: red, padding: "12px 14px" }}>
        <div style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>🤖 AI Study Creator</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>Powered by Claude AI · Hindi & English</div>
      </div>

      {/* Mode selector */}
      <div style={{ display: "flex", gap: 7, overflowX: "auto", padding: "10px 12px", borderBottom: `1px solid ${border}`, background: surface }}>
        {AI_MODES.map(m => (
          <button key={m.id} onClick={() => { setAiMode(m.id); setAiMessages([{ role: "assistant", text: `Mode changed: **${m.label}**\n\nMain ab is mode mein help karunga! Kya poochna chahte hain?` }]); }} style={{ ...S.tab(aiMode === m.id), flexShrink: 0, border: `1px solid ${aiMode === m.id ? red : border}`, padding: "6px 12px", fontSize: 11 }}>{m.label}</button>
        ))}
      </div>

      {/* Chat messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 12px 0" }}>
        {aiMessages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 12, display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 8 }}>
            {msg.role === "assistant" && (
              <div style={{ width: 30, height: 30, background: red, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🤖</div>
            )}
            <div style={{ maxWidth: "80%", background: msg.role === "user" ? red : card, color: msg.role === "user" ? "#fff" : text, borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding: "10px 13px", fontSize: 13, lineHeight: 1.6, border: msg.role === "assistant" ? `1px solid ${border}` : "none", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {msg.text}
            </div>
            {msg.role === "user" && (
              <div style={{ width: 30, height: 30, background: surface, border: `1px solid ${border}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🧑</div>
            )}
          </div>
        ))}
        {aiLoading && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 30, height: 30, background: red, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🤖</div>
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: "16px 16px 16px 4px", padding: "12px 16px" }}>
              <div style={{ display: "flex", gap: 5 }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 7, height: 7, background: red, borderRadius: "50%", animation: `bounce 1s ${i * 0.2}s infinite` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick prompts */}
      <div style={{ display: "flex", gap: 6, padding: "8px 12px", overflowX: "auto", borderTop: `1px solid ${border}` }}>
        {["Maths formula explain karo", "Science ke important topics", "Essay kaise likhein?", "Exam tips do", "Quiz shuru karo"].map(q => (
          <div key={q} onClick={() => setAiQuery(q)} style={{ ...S.chip, whiteSpace: "nowrap", cursor: "pointer", flexShrink: 0, fontSize: 11 }}>{q}</div>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: "10px 12px", borderTop: `1px solid ${border}`, display: "flex", gap: 8, background: bg }}>
        <input style={{ ...S.inp, flex: 1, fontSize: 13 }} placeholder="Apna sawaal type karein... (Hindi/English)" value={aiQuery} onChange={e => setAiQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendAI()} />
        <button onClick={sendAI} disabled={aiLoading} style={{ background: red, border: "none", borderRadius: 10, width: 44, height: 44, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: aiLoading ? 0.6 : 1 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  );

  // ── NOTES ────────────────────────────────────────────────────
  const Notes = () => (
    <div style={{ padding: "16px 14px" }}>
      <div style={S.ttl}>📋 Study Notes ({notes.length})</div>
      {notes.filter(n => !searchQuery || n.title.toLowerCase().includes(searchQuery.toLowerCase())).map((note, i) => (
        <div key={note.id} style={{ ...S.card, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{note.title}</div>
            <div style={{ fontSize: 11, color: sub, marginTop: 2 }}>{note.class} · {note.subject} · {note.date}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ cursor: "pointer", fontSize: 18 }} onClick={() => setBookmarks(b => b.includes(note.id) ? b.filter(x => x !== note.id) : [...b, note.id])}>{bookmarks.includes(note.id) ? "🔖" : "📌"}</span>
            <span style={{ cursor: "pointer", fontSize: 18 }}>⬇️</span>
          </div>
        </div>
      ))}
      {notes.length === 0 && <div style={{ textAlign: "center", color: sub, padding: 32 }}>No notes yet. Admin will upload soon!</div>}
    </div>
  );

  // ── PDFs ─────────────────────────────────────────────────────
  const PDFs = () => (
    <div style={{ padding: "16px 14px" }}>
      <div style={S.ttl}>📄 PDF Library ({pdfs.length})</div>
      {pdfs.filter(p => !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase())).map(pdf => (
        <div key={pdf.id} style={{ ...S.card, display: "flex", alignItems: "center", gap: 12, padding: 13 }}>
          <div style={{ width: 44, height: 44, background: redLight, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>📄</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{pdf.title}</div>
            <div style={{ fontSize: 11, color: sub }}>{pdf.class} · {pdf.subject} · {pdf.size}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <button style={{ ...S.btnSm, fontSize: 11 }}>Open</button>
            <button style={{ ...S.btnSm, background: surface, color: red, border: `1px solid ${red}`, fontSize: 11 }}>⬇️</button>
          </div>
        </div>
      ))}
    </div>
  );

  // ── VIDEOS ───────────────────────────────────────────────────
  const Videos = () => (
    <div style={{ padding: "16px 14px" }}>
      <div style={S.ttl}>🎥 Video Lessons ({videos.length})</div>
      {videos.filter(v => !searchQuery || v.title.toLowerCase().includes(searchQuery.toLowerCase())).map(vid => (
        <div key={vid.id} style={{ ...S.card, padding: 0, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ height: 120, background: `linear-gradient(135deg, ${redLight}, ${surface})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ width: 50, height: 50, background: red, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.55)", color: "#fff", borderRadius: 4, padding: "2px 7px", fontSize: 11 }}>{vid.duration}</div>
          </div>
          <div style={{ padding: "11px 13px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{vid.title}</div>
              <div style={{ fontSize: 11, color: sub }}>{vid.class} · {vid.views} views</div>
            </div>
            <button style={S.btnSm}>▶ Play</button>
          </div>
        </div>
      ))}
    </div>
  );

  // ── QUIZ ─────────────────────────────────────────────────────
  const quizQuestions = [
    { q: "π (pi) ki approximate value kya hai?", opts: ["3.14159", "2.71828", "1.41421", "1.73205"], ans: 0 },
    { q: "Bharat ka rashtriya geet kisne likha?", opts: ["Rabindranath Tagore", "Bankim Chandra", "Subramanya Bharati", "Iqbal"], ans: 0 },
    { q: "Paani ka chemical formula kya hai?", opts: ["H₂O", "CO₂", "NaCl", "H₂SO₄"], ans: 0 },
    { q: "Newton ke kitne laws of motion hain?", opts: ["3", "2", "4", "5"], ans: 0 },
    { q: "Bharat ki rajdhani kya hai?", opts: ["New Delhi", "Mumbai", "Kolkata", "Chennai"], ans: 0 },
  ];
  const Quiz = () => {
    const handleAns = (i) => { if (i === quizQuestions[quizStep].ans) setQuizScore(s => s + 1); if (quizStep + 1 >= quizQuestions.length) setQuizDone(true); else setQuizStep(s => s + 1); };
    if (quizDone) return (
      <div style={{ padding: "16px 14px" }}>
        <div style={{ ...S.card, textAlign: "center", padding: 32 }}>
          <div style={{ fontSize: 52, marginBottom: 10 }}>{quizScore >= 4 ? "🏆" : quizScore >= 2 ? "⭐" : "📚"}</div>
          <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 6 }}>Quiz Complete!</div>
          <div style={{ fontWeight: 700, fontSize: 18, color: red, marginBottom: 12 }}>{quizScore}/{quizQuestions.length} Correct</div>
          <div style={{ color: sub, marginBottom: 20 }}>{quizScore >= 4 ? "Zabardast! Bahut achha kiya! 🎉" : quizScore >= 2 ? "Achha kiya! Aur practice karo! 💪" : "Koi baat nahi, phir se try karo! 📚"}</div>
          <button style={S.btn} onClick={() => { setQuizStep(0); setQuizScore(0); setQuizDone(false); }}>Dobara Khelein 🔄</button>
        </div>
      </div>
    );
    return (
      <div style={{ padding: "16px 14px" }}>
        <div style={S.ttl}>📝 Daily Quiz</div>
        <div style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: sub }}>Question {quizStep + 1}/{quizQuestions.length}</span>
            <span style={S.badge}>Score: {quizScore}</span>
          </div>
          <div style={{ height: 5, background: border, borderRadius: 3, marginBottom: 16 }}>
            <div style={{ width: `${((quizStep) / quizQuestions.length) * 100}%`, height: "100%", background: red, borderRadius: 3, transition: "width 0.3s" }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 18, lineHeight: 1.4 }}>{quizQuestions[quizStep].q}</div>
          {quizQuestions[quizStep].opts.map((opt, i) => (
            <div key={i} onClick={() => handleAns(i)} style={{ background: surface, border: `1.5px solid ${border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 9, cursor: "pointer", fontWeight: 500, fontSize: 13, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 24, height: 24, background: red, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{String.fromCharCode(65 + i)}</span>{opt}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── PROGRESS ─────────────────────────────────────────────────
  const Progress = () => (
    <div style={{ padding: "16px 14px" }}>
      <div style={S.ttl}>📊 My Progress</div>
      <div style={{ ...S.card, background: red, color: "#fff", textAlign: "center", padding: 22 }}>
        <div style={{ fontSize: 44, fontWeight: 900 }}>72%</div>
        <div style={{ fontSize: 13, opacity: 0.85 }}>Overall Completion</div>
      </div>
      {[["Mathematics", 80], ["Science", 65], ["English", 90], ["Social Studies", 55], ["Hindi", 70]].map(([subj, pct]) => (
        <div key={subj} style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>{subj}</span>
            <span style={{ fontWeight: 700, color: red }}>{pct}%</span>
          </div>
          <div style={{ height: 6, background: border, borderRadius: 3 }}>
            <div style={{ width: `${pct}%`, height: "100%", background: red, borderRadius: 3 }} />
          </div>
        </div>
      ))}
      <div style={S.card}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>🔖 Bookmarked Notes</div>
        {bookmarks.length === 0 ? <div style={{ color: sub, fontSize: 13 }}>Koi bookmark nahi. Notes section mein bookmark karein!</div> :
          bookmarks.map(id => { const n = notes.find(x => x.id === id); return n ? <div key={id} style={{ ...S.chip, display: "block", marginBottom: 6 }}>{n.title}</div> : null; })}
      </div>
    </div>
  );

  // ── ADMIN PANEL ──────────────────────────────────────────────
  const Admin = () => {
    if (!isAdmin) return (
      <div style={{ padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 48 }}>🔒</div>
        <div style={{ fontWeight: 700, fontSize: 18, margin: "14px 0 8px" }}>Admin Access Required</div>
        <div style={{ color: sub, fontSize: 13 }}>Sirf authorized admins hi yahan access kar sakte hain.</div>
      </div>
    );

    const tabs = [
      { id: "dashboard", label: "📊 Dashboard" },
      { id: "appSettings", label: "⚙️ App Settings" },
      { id: "uploadPdf", label: "📄 Upload PDF" },
      { id: "uploadVideo", label: "🎥 Upload Video" },
      { id: "shareNotes", label: "📋 Share Notes" },
      { id: "announce", label: "📢 Announce" },
      { id: "students", label: "👥 Students" },
    ];

    return (
      <div style={{ padding: "14px 14px" }}>
        {/* Admin badge */}
        <div style={{ ...S.card, background: red, color: "#fff", marginBottom: 12, padding: "12px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>🛡️ Admin Control Panel</div>
              <div style={{ fontSize: 11, opacity: 0.85 }}>{adminEmail}</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>ADMIN</div>
          </div>
        </div>

        {/* Tab scroll */}
        <div style={{ display: "flex", gap: 7, overflowX: "auto", marginBottom: 14, paddingBottom: 4 }}>
          {tabs.map(t => <button key={t.id} style={{ ...S.tab(adminTab === t.id), flexShrink: 0, border: `1px solid ${border}`, padding: "7px 13px", fontSize: 12 }} onClick={() => setAdminTab(t.id)}>{t.label}</button>)}
        </div>

        {/* Success toast */}
        {uploadSuccess && <div style={{ background: "#16a34a", color: "#fff", borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontWeight: 600, fontSize: 13 }}>✅ {uploadSuccess}</div>}

        {/* DASHBOARD */}
        {adminTab === "dashboard" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              {[["👥", "Students", students.length], ["📄", "PDFs", pdfs.length], ["🎥", "Videos", videos.length], ["📋", "Notes", notes.length], ["📢", "Announcements", announcements.length], ["🔖", "Bookmarks", bookmarks.length]].map(([icon, lbl, cnt]) => (
                <div key={lbl} style={{ ...S.card, textAlign: "center", padding: "16px 10px", margin: 0 }}>
                  <div style={{ fontSize: 26 }}>{icon}</div>
                  <div style={{ fontWeight: 800, fontSize: 22, color: red }}>{cnt}</div>
                  <div style={{ fontSize: 11, color: sub }}>{lbl}</div>
                </div>
              ))}
            </div>
            <div style={S.card}>
              <div style={{ fontWeight: 700, marginBottom: 10 }}>📢 Recent Announcements</div>
              {announcements.map(a => <div key={a.id} style={{ borderBottom: `1px solid ${border}`, paddingBottom: 8, marginBottom: 8 }}><div style={{ fontWeight: 600, fontSize: 13 }}>{a.title}</div><div style={{ fontSize: 11, color: sub }}>{a.body.substring(0, 60)}...</div></div>)}
            </div>
          </div>
        )}

        {/* APP SETTINGS */}
        {adminTab === "appSettings" && (
          <div>
            <div style={S.card}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>📱 App Name</div>
              {editingAppName ? (
                <div style={{ display: "flex", gap: 8 }}>
                  <input style={{ ...S.inp, flex: 1 }} value={tempAppName} onChange={e => setTempAppName(e.target.value)} />
                  <button style={{ ...S.btnSm }} onClick={() => { setAppName(tempAppName); setEditingAppName(false); showSuccess("App name updated!"); }}>Save</button>
                  <button style={{ ...S.btnSm, background: surface, color: text, border: `1px solid ${border}` }} onClick={() => setEditingAppName(false)}>Cancel</button>
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: 16, color: red }}>{appName}</span>
                  <button style={S.btnSm} onClick={() => { setTempAppName(appName); setEditingAppName(true); }}>✏️ Edit</button>
                </div>
              )}
            </div>

            <div style={S.card}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>🎨 Theme Color</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["#D72638", "#1d4ed8", "#16a34a", "#7c3aed", "#ea580c", "#0f172a"].map(c => (
                  <div key={c} onClick={() => { setThemeColor(c); showSuccess("Theme color changed!"); }} style={{ width: 40, height: 40, background: c, borderRadius: 10, cursor: "pointer", border: themeColor === c ? `3px solid ${text}` : "3px solid transparent" }} />
                ))}
              </div>
            </div>

            <div style={S.card}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>🌙 Dark Mode</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: sub, fontSize: 13 }}>Toggle dark/light theme</span>
                <div onClick={() => setDarkMode(d => !d)} style={{ width: 48, height: 26, background: darkMode ? red : border, borderRadius: 13, position: "relative", cursor: "pointer", transition: "background 0.2s" }}>
                  <div style={{ position: "absolute", top: 3, left: darkMode ? 24 : 3, width: 20, height: 20, background: "#fff", borderRadius: "50%", transition: "left 0.2s" }} />
                </div>
              </div>
            </div>

            <div style={S.card}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>📲 Push App Update</div>
              <input style={{ ...S.inp, marginBottom: 10 }} placeholder="Update version (e.g. v2.1.0)" />
              <textarea style={{ ...S.inp, minHeight: 70, resize: "vertical", marginBottom: 10 }} placeholder="What's new in this update..." />
              <button style={S.btn} onClick={() => showSuccess("Update notification sent to all students!")}>🚀 Send Update Notification</button>
            </div>
          </div>
        )}

        {/* UPLOAD PDF */}
        {adminTab === "uploadPdf" && (
          <div>
            <div style={S.card}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>📄 Upload New PDF</div>
              {[["PDF Title", "title", "e.g. NCERT Mathematics Class 10"], ["File Size", "size", "e.g. 12 MB"]].map(([lbl, key, ph]) => (
                <div key={key} style={{ marginBottom: 10 }}>
                  <label style={S.lbl}>{lbl}</label>
                  <input style={S.inp} placeholder={ph} value={newPdf[key]} onChange={e => setNewPdf(p => ({ ...p, [key]: e.target.value }))} />
                </div>
              ))}
              <div style={{ marginBottom: 10 }}>
                <label style={S.lbl}>Class</label>
                <select style={S.inp} value={newPdf.class} onChange={e => setNewPdf(p => ({ ...p, class: e.target.value }))}>
                  {CLASSES.map(c => <option key={c}>{c}</option>)}
                  <option>Class 6-10</option><option>All Classes</option>
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={S.lbl}>Subject</label>
                <select style={S.inp} value={newPdf.subject} onChange={e => setNewPdf(p => ({ ...p, subject: e.target.value }))}>
                  {["Mathematics", "Science", "English", "Social Studies", "Hindi", "Sanskrit", "Computer", "IT", "Other"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ background: surface, border: `2px dashed ${border}`, borderRadius: 10, padding: "20px", textAlign: "center", marginBottom: 12, cursor: "pointer" }}>
                <div style={{ fontSize: 28 }}>📁</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>Tap to select PDF file</div>
                <div style={{ fontSize: 11, color: sub }}>PDF, max 50MB</div>
              </div>
              <button style={S.btn} onClick={() => { if (newPdf.title) { setPdfs(p => [...p, { ...newPdf, id: Date.now(), date: new Date().toISOString().split("T")[0] }]); setNewPdf({ title: "", class: "Class 9", subject: "Mathematics", size: "" }); showSuccess("PDF uploaded & shared with students!"); } }}>📤 Upload & Share PDF</button>
            </div>

            <div style={S.card}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>📚 Uploaded PDFs ({pdfs.length})</div>
              {pdfs.map(p => (
                <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${border}`, paddingBottom: 8, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{p.title}</div>
                    <div style={{ fontSize: 11, color: sub }}>{p.class} · {p.subject}</div>
                  </div>
                  <button onClick={() => { setPdfs(ps => ps.filter(x => x.id !== p.id)); showSuccess("PDF deleted."); }} style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>🗑️ Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* UPLOAD VIDEO */}
        {adminTab === "uploadVideo" && (
          <div>
            <div style={S.card}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>🎥 Upload New Video</div>
              {[["Video Title", "title", "e.g. Algebra Basics"], ["Duration", "duration", "e.g. 18:32"]].map(([lbl, key, ph]) => (
                <div key={key} style={{ marginBottom: 10 }}>
                  <label style={S.lbl}>{lbl}</label>
                  <input style={S.inp} placeholder={ph} value={newVideo[key]} onChange={e => setNewVideo(p => ({ ...p, [key]: e.target.value }))} />
                </div>
              ))}
              <div style={{ marginBottom: 10 }}>
                <label style={S.lbl}>Class</label>
                <select style={S.inp} value={newVideo.class} onChange={e => setNewVideo(p => ({ ...p, class: e.target.value }))}>
                  {CLASSES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={S.lbl}>Subject</label>
                <select style={S.inp} value={newVideo.subject} onChange={e => setNewVideo(p => ({ ...p, subject: e.target.value }))}>
                  {["Mathematics", "Science", "English", "Social Studies", "Hindi", "Other"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ background: surface, border: `2px dashed ${border}`, borderRadius: 10, padding: "20px", textAlign: "center", marginBottom: 12, cursor: "pointer" }}>
                <div style={{ fontSize: 28 }}>🎬</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>Tap to select Video file</div>
                <div style={{ fontSize: 11, color: sub }}>MP4, max 500MB</div>
              </div>
              <button style={S.btn} onClick={() => { if (newVideo.title) { setVideos(v => [...v, { ...newVideo, id: Date.now(), views: "0", date: new Date().toISOString().split("T")[0] }]); setNewVideo({ title: "", class: "Class 9", subject: "Mathematics", duration: "" }); showSuccess("Video uploaded & shared with students!"); } }}>📤 Upload & Share Video</button>
            </div>

            <div style={S.card}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>🎬 Uploaded Videos ({videos.length})</div>
              {videos.map(v => (
                <div key={v.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${border}`, paddingBottom: 8, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{v.title}</div>
                    <div style={{ fontSize: 11, color: sub }}>{v.class} · {v.duration}</div>
                  </div>
                  <button onClick={() => { setVideos(vs => vs.filter(x => x.id !== v.id)); showSuccess("Video deleted."); }} style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>🗑️ Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SHARE NOTES */}
        {adminTab === "shareNotes" && (
          <div>
            <div style={S.card}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>📋 Share New Notes</div>
              <div style={{ marginBottom: 10 }}>
                <label style={S.lbl}>Notes Title</label>
                <input style={S.inp} placeholder="e.g. Algebra Formulas Sheet" value={newNote.title} onChange={e => setNewNote(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={S.lbl}>Class</label>
                <select style={S.inp} value={newNote.class} onChange={e => setNewNote(p => ({ ...p, class: e.target.value }))}>
                  {CLASSES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={S.lbl}>Subject</label>
                <select style={S.inp} value={newNote.subject} onChange={e => setNewNote(p => ({ ...p, subject: e.target.value }))}>
                  {["Mathematics", "Science", "English", "Social Studies", "Hindi", "Sanskrit", "Other"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={S.lbl}>Notes Content</label>
                <textarea style={{ ...S.inp, minHeight: 100, resize: "vertical" }} placeholder="Type the notes content here or paste text..." />
              </div>
              <button style={S.btn} onClick={() => { if (newNote.title) { setNotes(n => [...n, { ...newNote, id: Date.now(), date: new Date().toISOString().split("T")[0] }]); setNewNote({ title: "", class: "Class 9", subject: "Mathematics" }); showSuccess("Notes shared with students!"); } }}>📤 Share Notes</button>
            </div>

            <div style={S.card}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>📝 Shared Notes ({notes.length})</div>
              {notes.map(n => (
                <div key={n.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${border}`, paddingBottom: 8, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{n.title}</div>
                    <div style={{ fontSize: 11, color: sub }}>{n.class} · {n.subject}</div>
                  </div>
                  <button onClick={() => { setNotes(ns => ns.filter(x => x.id !== n.id)); showSuccess("Note deleted."); }} style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>🗑️ Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS */}
        {adminTab === "announce" && (
          <div>
            <div style={S.card}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>📢 New Announcement</div>
              <div style={{ marginBottom: 10 }}>
                <label style={S.lbl}>Title</label>
                <input style={S.inp} placeholder="Announcement title..." value={newAnn.title} onChange={e => setNewAnn(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={S.lbl}>Message</label>
                <textarea style={{ ...S.inp, minHeight: 90, resize: "vertical" }} placeholder="Write your message..." value={newAnn.body} onChange={e => setNewAnn(p => ({ ...p, body: e.target.value }))} />
              </div>
              <button style={S.btn} onClick={() => { if (newAnn.title && newAnn.body) { setAnnouncements(a => [{ ...newAnn, id: Date.now(), date: new Date().toISOString().split("T")[0] }, ...a]); setNewAnn({ title: "", body: "" }); showSuccess("Announcement sent to all students!"); } }}>📣 Send to All Students</button>
            </div>

            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Previous Announcements</div>
            {announcements.map(a => (
              <div key={a.id} style={{ ...S.card }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{a.title}</div>
                    <div style={{ fontSize: 12, color: sub, margin: "4px 0" }}>{a.body}</div>
                    <div style={{ fontSize: 11, color: sub }}>{a.date}</div>
                  </div>
                  <button onClick={() => { setAnnouncements(as => as.filter(x => x.id !== a.id)); showSuccess("Announcement deleted."); }} style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600, flexShrink: 0, marginLeft: 8 }}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STUDENTS */}
        {adminTab === "students" && (
          <div>
            <div style={{ ...S.card, textAlign: "center", padding: "14px", marginBottom: 12, background: redLight }}>
              <div style={{ fontWeight: 800, fontSize: 22, color: red }}>{students.length}</div>
              <div style={{ fontSize: 12, color: sub }}>Total Registered Students</div>
            </div>
            {students.map((s, i) => (
              <div key={i} style={{ ...S.card, display: "flex", alignItems: "center", gap: 12, padding: 13 }}>
                <div style={{ width: 40, height: 40, background: redLight, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: red, fontSize: 16, flexShrink: 0 }}>{s.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: sub }}>{s.class} · {s.school}</div>
                  <div style={{ fontSize: 10, color: sub }}>Joined: {s.joined}</div>
                </div>
                <button onClick={() => { setStudents(ss => ss.filter((_, j) => j !== i)); showSuccess("Student removed."); }} style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 7, padding: "5px 9px", fontSize: 11, cursor: "pointer" }}>✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ── RENDER ───────────────────────────────────────────────────
  const sectionMap = { home: <Home />, ai: <AICreator />, notes: <Notes />, pdf: <PDFs />, videos: <Videos />, quiz: <Quiz />, progress: <Progress />, admin: <Admin /> };

  const navItems = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "ai", icon: "🤖", label: "AI" },
    { id: "notes", icon: "📋", label: "Notes" },
    { id: "quiz", icon: "📝", label: "Quiz" },
    { id: "progress", icon: "📊", label: "Progress" },
    ...(isAdmin ? [{ id: "admin", icon: "🛡️", label: "Admin" }] : []),
  ];

  return (
    <div style={S.app}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        ::-webkit-scrollbar { width: 0; height: 0; }
      `}</style>

      {/* Header */}
      <div style={S.hdr}>
        <a href={IGRAM} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 5, textDecoration: "none", color: "rgba(255,255,255,0.92)" }}>
          {IGSVG}
          <span style={{ fontSize: 10, fontWeight: 700 }}>@ur_pankaj_kumar_</span>
        </a>
        <span style={{ fontWeight: 900, fontSize: 15, letterSpacing: -0.3 }}>{appName}</span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setDarkMode(d => !d)} style={{ background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 7, width: 30, height: 30, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>{dm ? "☀️" : "🌙"}</button>
          <div style={{ position: "relative" }}>
            <button onClick={() => setNotifications(n => !n)} style={{ background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 7, width: 30, height: 30, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>🔔</button>
            {notifications && announcements.length > 0 && <div style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, background: "#facc15", borderRadius: "50%", border: `2px solid ${red}` }} />}
          </div>
          {isAdmin && <div style={{ background: "rgba(255,255,255,0.25)", borderRadius: 7, padding: "3px 8px", fontSize: 10, fontWeight: 800 }}>ADMIN</div>}
        </div>
      </div>

      {/* Content */}
      <div style={S.scroll}>
        {sectionMap[activeSection] || <Home />}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: card, borderTop: `1px solid ${border}`, display: "flex", justifyContent: "space-around", padding: "7px 0 5px", zIndex: 100 }}>
        {navItems.map(item => (
          <div key={item.id} style={S.nav(activeSection === item.id)} onClick={() => setActiveSection(item.id)}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
        <div style={S.nav(false)} onClick={() => { setScreen("login"); setIsAdmin(false); setActiveSection("home"); }}>
          <span style={{ fontSize: 20 }}>🚪</span>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
