import { useState, useEffect, useRef } from "react";
import { LanguageProvider, useLang } from "./i18n/LanguageContext";
import type { Lang } from "./i18n/translations";

// ─── COLORS & THEME ──────────────────────────────────────────────────────────
const C = {
  primary: "#8B0000", primaryLight: "#a30000", gold: "#C8960C", goldLight: "#f0c040",
  bg: "#f7f7f7", white: "#ffffff", card: "#ffffff", border: "#e8e0e0",
  text: "#1a1a1a", muted: "#666666", subtle: "#999999",
  success: "#16a34a", error: "#dc2626", warning: "#d97706", pending: "#7c3aed",
};

const calcAge = (dob) => { if (!dob) return ""; const diff = Date.now() - new Date(dob).getTime(); return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000)); };
const fmtDate = (s) => s ? new Date(s).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "N/A";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Ic = ({ n, s = 18, c = "currentColor" }) => {
  const p = {
    heart: <><path fill={c} d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></>,
    search: <><circle cx="11" cy="11" r="8" stroke={c} fill="none" strokeWidth="2"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke={c} strokeWidth="2"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={c} fill="none" strokeWidth="1.8"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={c} fill="none" strokeWidth="1.8"/></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={c} fill="none" strokeWidth="2"/><circle cx="12" cy="7" r="4" stroke={c} fill="none" strokeWidth="2"/></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={c} fill="none" strokeWidth="2"/><circle cx="9" cy="7" r="4" stroke={c} fill="none" strokeWidth="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke={c} fill="none" strokeWidth="2"/></>,
    chat: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke={c} fill="none" strokeWidth="2"/></>,
    home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke={c} fill="none" strokeWidth="2"/><polyline points="9 22 9 12 15 12 15 22" stroke={c} fill="none" strokeWidth="2"/></>,
    back: <><polyline points="15 18 9 12 15 6" stroke={c} fill="none" strokeWidth="2"/></>,
    check: <><polyline points="20 6 9 17 4 12" stroke={c} fill="none" strokeWidth="2.5"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18" stroke={c} strokeWidth="2"/><line x1="6" y1="6" x2="18" y2="18" stroke={c} strokeWidth="2"/></>,
    send: <><line x1="22" y1="2" x2="11" y2="13" stroke={c} strokeWidth="2"/><polygon points="22 2 15 22 11 13 2 9 22 2" stroke={c} fill="none" strokeWidth="2"/></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke={c} fill="none" strokeWidth="2"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke={c} fill="none" strokeWidth="2"/></>,
    trash: <><polyline points="3 6 5 6 21 6" stroke={c} fill="none" strokeWidth="2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke={c} fill="none" strokeWidth="2"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19" stroke={c} strokeWidth="2"/><line x1="5" y1="12" x2="19" y2="12" stroke={c} strokeWidth="2"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={c} fill="none" strokeWidth="2"/></>,
    pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke={c} fill="none" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke={c} fill="none" strokeWidth="2"/></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={c}/></>,
    chart: <><line x1="18" y1="20" x2="18" y2="10" stroke={c} strokeWidth="2"/><line x1="12" y1="20" x2="12" y2="4" stroke={c} strokeWidth="2"/><line x1="6" y1="20" x2="6" y2="14" stroke={c} strokeWidth="2"/></>,
    flag: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" stroke={c} fill="none" strokeWidth="2"/><line x1="4" y1="22" x2="4" y2="15" stroke={c} strokeWidth="2"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke={c} fill="none" strokeWidth="2"/><polyline points="16 17 21 12 16 7" stroke={c} fill="none" strokeWidth="2"/><line x1="21" y1="12" x2="9" y2="12" stroke={c} strokeWidth="2"/></>,
    phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6.61 6.61l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke={c} fill="none" strokeWidth="2"/></>,
    crown: <><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zM4 19h16" stroke={c} fill="none" strokeWidth="2"/></>,
    sliders: <><line x1="4" y1="21" x2="4" y2="14" stroke={c} strokeWidth="2"/><line x1="4" y1="10" x2="4" y2="3" stroke={c} strokeWidth="2"/><line x1="12" y1="21" x2="12" y2="12" stroke={c} strokeWidth="2"/><line x1="12" y1="8" x2="12" y2="3" stroke={c} strokeWidth="2"/><line x1="20" y1="21" x2="20" y2="16" stroke={c} strokeWidth="2"/><line x1="20" y1="12" x2="20" y2="3" stroke={c} strokeWidth="2"/><line x1="1" y1="14" x2="7" y2="14" stroke={c} strokeWidth="2"/><line x1="9" y1="8" x2="15" y2="8" stroke={c} strokeWidth="2"/><line x1="17" y1="16" x2="23" y2="16" stroke={c} strokeWidth="2"/></>,
    info: <><circle cx="12" cy="12" r="10" stroke={c} fill="none" strokeWidth="2"/><line x1="12" y1="16" x2="12" y2="12" stroke={c} strokeWidth="2"/><line x1="12" y1="8" x2="12.01" y2="8" stroke={c} strokeWidth="3"/></>,
    globe: <><circle cx="12" cy="12" r="10" stroke={c} fill="none" strokeWidth="2"/><line x1="2" y1="12" x2="22" y2="12" stroke={c} strokeWidth="2"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={c} fill="none" strokeWidth="2"/></>,
  };
  return <svg width={s} height={s} viewBox="0 0 24 24">{p[n]}</svg>;
};

// ─── BUTTON ────────────────────────────────────────────────────────────────
const Btn = ({ children, onClick, variant = "primary", size = "md", full = false, disabled = false, style: sx = {} }) => {
  const sizes = { sm: { padding: "6px 14px", fontSize: 12 }, md: { padding: "10px 20px", fontSize: 14 }, lg: { padding: "13px 28px", fontSize: 15 } };
  const variants = {
    primary: { background: C.primary, color: "#fff", border: `1px solid ${C.primary}` },
    outline: { background: "transparent", color: C.primary, border: `1.5px solid ${C.primary}` },
    gold: { background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: "#fff", border: "none" },
    ghost: { background: "transparent", color: C.muted, border: "1px solid #ddd" },
    danger: { background: C.error, color: "#fff", border: `1px solid ${C.error}` },
    success: { background: C.success, color: "#fff", border: `1px solid ${C.success}` },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...sizes[size], ...variants[variant], borderRadius: 8, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", width: full ? "100%" : "auto", opacity: disabled ? 0.6 : 1, fontFamily: "'Segoe UI', sans-serif", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all .15s", ...sx }}>
      {children}
    </button>
  );
};

// ─── INPUT ─────────────────────────────────────────────────────────────────
const Input = ({ label, value, onChange, placeholder, type = "text", required, style: sx = {} }: any) => (
  <div style={{ marginBottom: 14, ...sx }}>
    {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5 }}>{label}{required && <span style={{ color: C.error }}> *</span>}</label>}
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, color: C.text, outline: "none", fontFamily: "'Segoe UI', sans-serif", background: C.white, transition: "border .15s" }}
      onFocus={e => e.target.style.borderColor = C.primary}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  </div>
);

const Select = ({ label, value, onChange, options, required, style: sx = {} }: any) => (
  <div style={{ marginBottom: 14, ...sx }}>
    {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5 }}>{label}{required && <span style={{ color: C.error }}> *</span>}</label>}
    <select value={value} onChange={onChange} style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, color: C.text, outline: "none", fontFamily: "'Segoe UI', sans-serif", background: C.white, cursor: "pointer" }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

// ─── TOAST ─────────────────────────────────────────────────────────────────
function Toast({ msg, type }) {
  if (!msg) return null;
  const colors = { success: "#ecfdf5", error: "#fef2f2", info: "#eff6ff", warning: "#fffbeb" };
  const tc = { success: C.success, error: C.error, info: "#1d4ed8", warning: C.warning };
  return <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 9999, background: colors[type] || colors.info, color: tc[type] || tc.info, border: `1px solid ${tc[type] || tc.info}30`, borderRadius: 10, padding: "12px 20px", fontSize: 13, fontWeight: 600, fontFamily: "'Segoe UI', sans-serif", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", maxWidth: 360, whiteSpace: "nowrap" }}>{msg}</div>;
}
function useToast() {
  const [toast, setToast] = useState({ msg: "", type: "info" });
  const show = (msg, type = "info") => { setToast({ msg, type }); setTimeout(() => setToast({ msg: "", type: "info" }), 3000); };
  return [toast, show] as const;
}

// ═══════════════════════════════════════════════════════════════════════════
// ─── LANGUAGE SELECTION SCREEN ────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════
function LanguageSelectionScreen({ onDone }: { onDone: () => void }) {
  const { lang, setLang, t } = useLang();
  const [selected, setSelected] = useState<Lang>(lang);

  const langs: { code: Lang; native: string; flag: string }[] = [
    { code: "EN", native: "English", flag: "🇬🇧" },
    { code: "HI", native: "हिन्दी", flag: "🇮🇳" },
    { code: "GU", native: "ગુજરાતી", flag: "🇮🇳" },
  ];

  const handleContinue = () => {
    setLang(selected);
    localStorage.setItem("lang_selected", "1");
    onDone();
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.primary} 0%, #3a0000 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", padding: 24 }}>
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>💍</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", fontFamily: "Georgia, serif", letterSpacing: 1 }}>Dhobi Metromani</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 6 }}>धोबी मेट्रोमणि • ધોબી મેટ્રોમણિ</div>
      </div>

      {/* Card */}
      <div style={{ background: "#fff", borderRadius: 24, padding: 32, width: "100%", maxWidth: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${C.primary}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <Ic n="globe" s={24} c={C.primary} />
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 6 }}>Select Your Language</div>
          <div style={{ fontSize: 13, color: C.muted }}>अपनी भाषा चुनें • તમારી ભાષા પસંદ કરો</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {langs.map(({ code, native, flag }) => (
            <button
              key={code}
              onClick={() => setSelected(code)}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px 18px", borderRadius: 14,
                border: selected === code ? `2.5px solid ${C.primary}` : `1.5px solid ${C.border}`,
                background: selected === code ? `${C.primary}08` : C.white,
                cursor: "pointer", transition: "all .2s", textAlign: "left"
              }}
            >
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: selected === code ? C.primary : "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, transition: "all .2s" }}>
                {selected === code ? <Ic n="check" s={20} c="#fff" /> : flag}
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>{native}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{code === "EN" ? "English" : code === "HI" ? "Hindi" : "Gujarati"}</div>
              </div>
            </button>
          ))}
        </div>

        <Btn onClick={handleContinue} variant="primary" full size="lg">
          Continue →&nbsp;&nbsp;जारी रखें&nbsp;&nbsp;આગળ વધો
        </Btn>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ─── EMAIL OTP LOGIN SCREEN ───────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════
function EmailLoginScreen({ users, onUserLogin, onAdminLogin }: any) {
  const { t } = useLang();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [demoOtp, setDemoOtp] = useState("");
  const [adminMode, setAdminMode] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (step !== "otp" || timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [step, timeLeft]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => setCooldown(c => c - 1), 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const sendOTP = async () => {
    setError(""); setSuccessMsg("");
    if (!email) { setError(t('login.err.email')); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError(t('login.err.email.invalid')); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        setStep("otp"); setTimeLeft(300); setCooldown(60);
        if (data.otp) { setDemoOtp(data.otp); setSuccessMsg(t('otp.fallback')); }
        else { setDemoOtp(""); setSuccessMsg(t('otp.sent.success')); }
      } else { setError(data.message || t('login.err.network')); }
    } catch { setLoading(false); setError(t('login.err.network')); }
  };

  const verifyOTP = async () => {
    setError(""); setSuccessMsg("");
    if (!otp || otp.length !== 6) { setError(t('otp.err.digits')); return; }
    if (timeLeft <= 0) { setError(t('otp.err.expired')); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, otp }) });
      const data = await res.json();
      setLoading(false);
      if (data.success && data.verified) {
        setSuccessMsg(t('otp.success'));
        localStorage.setItem("token", data.token);
        onUserLogin({ isNew: data.isNew, email, user: data.user });
      } else { setError(data.message || t('otp.err.invalid')); }
    } catch { setLoading(false); setError(t('login.err.network')); }
  };

  const adminLogin = () => {
    setError("");
    if (email === "admin@example.com" && adminPass === "admin123") { onAdminLogin(); return; }
    setError(t('admin.err.creds'));
  };

  const fmtTime = (s) => `${Math.floor(s / 60)}:${(s % 60 < 10 ? "0" : "")}${s % 60}`;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: C.primary, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>💍</div>
        <div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase" }}>{t('app.community')}</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "Georgia, serif", letterSpacing: 0.5 }}>{t('app.name')}</div>
        </div>
      </div>

      <div style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #5a0000 100%)`, padding: "28px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🌸</div>
        <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, fontFamily: "Georgia, serif", marginBottom: 4 }}>{t('app.tagline')}</div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>{t('app.trusted')}</div>
      </div>

      <div style={{ flex: 1, padding: "24px 20px", maxWidth: 440, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "flex", background: "#f0f0f0", borderRadius: 10, padding: 4, marginBottom: 24 }}>
          {[[t('login.tab.user'), false], [t('login.tab.admin'), true]].map(([label, isAdmin]) => (
            <button key={String(label)} onClick={() => { setAdminMode(isAdmin as boolean); setError(""); setSuccessMsg(""); setStep("email"); }}
              style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all .2s", background: adminMode === isAdmin ? "#fff" : "transparent", color: adminMode === isAdmin ? C.primary : C.muted, boxShadow: adminMode === isAdmin ? "0 1px 6px rgba(0,0,0,0.1)" : "none" }}>
              {label}
            </button>
          ))}
        </div>

        {!adminMode ? (
          <div>
            {step === "email" ? (
              <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>{t('login.title')}</div>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>{t('login.subtitle')}</div>
                <Input label={t('login.email')} value={email} onChange={e => setEmail(e.target.value)} placeholder={t('login.email.placeholder')} required />
                {error && <div style={{ color: C.error, fontSize: 12, marginBottom: 10 }}>{error}</div>}
                <Btn onClick={sendOTP} variant="primary" full disabled={loading} size="lg">
                  {loading ? t('login.sending') : t('login.sendOtp')}
                </Btn>
              </div>
            ) : (
              <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
                <button onClick={() => { setStep("email"); setOtp(""); setError(""); setSuccessMsg(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: C.primary, display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, marginBottom: 16, padding: 0 }}>
                  <Ic n="back" s={16} c={C.primary} /> {t('otp.back')}
                </button>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>{t('otp.title')}</div>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>{t('otp.sent')} {email}</div>
                {demoOtp && (
                  <div style={{ background: `linear-gradient(135deg, ${C.primary}15, ${C.gold}15)`, border: `1px solid ${C.primary}30`, borderRadius: 12, padding: 14, marginBottom: 20, textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>{t('otp.simulated')}</div>
                    <div style={{ fontSize: 13, color: C.text }}>{t('otp.code.label')}</div>
                    <div style={{ fontSize: 32, fontWeight: 900, color: C.primary, letterSpacing: 8, marginTop: 6, fontFamily: "monospace" }}>{demoOtp}</div>
                  </div>
                )}
                <Input label={t('otp.enter')} value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="______" required />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.muted, marginBottom: 14 }}>
                  <span>{t('otp.expires')} <strong style={{ color: timeLeft <= 60 ? C.error : C.text }}>{fmtTime(timeLeft)}</strong></span>
                </div>
                {successMsg && <div style={{ color: C.success, fontSize: 12, marginBottom: 10, fontWeight: 600 }}>{successMsg}</div>}
                {error && <div style={{ color: C.error, fontSize: 12, marginBottom: 10 }}>{error}</div>}
                <Btn onClick={verifyOTP} variant="primary" full size="lg" disabled={loading || timeLeft <= 0}>{t('otp.verify')}</Btn>
                <button onClick={sendOTP} disabled={cooldown > 0 || loading} style={{ background: "none", border: "none", cursor: cooldown > 0 ? "not-allowed" : "pointer", color: cooldown > 0 ? C.subtle : C.primary, fontSize: 13, fontWeight: 600, width: "100%", marginTop: 12, padding: 8 }}>
                  {cooldown > 0 ? `${t('otp.resend.wait')} ${cooldown}s` : t('otp.resend')}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${C.primary}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}><Ic n="shield" s={24} c={C.primary} /></div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{t('admin.access')}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>admin@example.com | admin123</div>
            </div>
            <Input label={t('admin.email')} value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@example.com" />
            <Input label={t('admin.password')} type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)} placeholder="••••••••" />
            {error && <div style={{ color: C.error, fontSize: 12, marginBottom: 10 }}>{error}</div>}
            <Btn onClick={adminLogin} variant="primary" full size="lg"><Ic n="shield" s={16} c="#fff" /> {t('admin.login.btn')}</Btn>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ─── REGISTRATION SCREEN ──────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════
function RegistrationScreen({ email, onComplete, onBack }: any) {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [form, setForm] = useState({
    email, name: "", gender: "male", dob: "", height: "5'4\"",
    profileFor: "Myself", motherTongue: "Gujarati", religion: "Hindu", caste: "Dhobi",
    education: "Bachelor's Degree", institute: "",
    jobType: "Business", salary: "₹1,00,000 - ₹5,00,000",
    diet: "Vegetarian", challenged: "No", maritalStatus: "Never Married",
    location: "", about: "",
    profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    governmentIdType: "Aadhaar Card", governmentIdUrl: "",
  });
  const [toast, showToast] = useToast();
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const steps = [
    { title: t('reg.step.basic'), icon: "👤" },
    { title: t('reg.step.social'), icon: "🏛" },
    { title: t('reg.step.education'), icon: "🎓" },
    { title: t('reg.step.personal'), icon: "📋" },
    { title: t('reg.step.about'), icon: "📍" },
    { title: t('reg.step.verify'), icon: "🆔" },
  ];

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => { f("governmentIdUrl", e.target?.result as string); showToast(t('reg.upload.success'), "success"); };
    reader.onerror = () => showToast(t('reg.upload.fail'), "error");
    reader.readAsDataURL(file);
  };

  const generateDemoIdScan = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 400; canvas.height = 250;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#f3f4f6"; ctx.fillRect(0, 0, 400, 250);
      ctx.fillStyle = C.primary; ctx.fillRect(0, 0, 400, 45);
      ctx.fillStyle = "#ffffff"; ctx.font = "bold 14px sans-serif"; ctx.fillText("GOVERNMENT OF METROMANI", 15, 26);
      ctx.fillStyle = C.text; ctx.font = "bold 13px sans-serif"; ctx.fillText(`${form.governmentIdType || "GOVERNMENT ID CARD"}`, 15, 80);
      ctx.font = "11px sans-serif"; ctx.fillStyle = C.muted;
      ctx.fillText(`Holder Name: ${form.name || "Matrimony Candidate"}`, 15, 115);
      ctx.fillText(`Date of Birth: ${fmtDate(form.dob) || "Not Set"}`, 15, 135);
      ctx.fillText(`Gender: ${form.gender === "male" ? "MALE" : "FEMALE"}`, 15, 155);
      ctx.fillText("STATUS: VERIFICATION DEMO DOCUMENT", 15, 185);
      ctx.fillStyle = "#e5e7eb"; ctx.fillRect(270, 70, 110, 130);
      ctx.fillStyle = C.muted; ctx.font = "10px sans-serif"; ctx.fillText("PHOTO SCAN", 295, 135);
      ctx.fillStyle = C.gold; ctx.fillRect(0, 235, 400, 15);
      f("governmentIdUrl", canvas.toDataURL("image/png"));
      showToast(t('reg.demo.gen'), "success");
    }
  };

  const next = () => {
    if (step === 0 && (!form.name || !form.dob)) { showToast(t('reg.err.name.dob'), "error"); return; }
    if (step === 4 && !form.location) { showToast(t('reg.err.location'), "error"); return; }
    if (step < steps.length - 1) setStep(s => s + 1);
    else {
      if (!form.governmentIdType) { showToast(t('reg.err.idType'), "error"); return; }
      if (!form.governmentIdUrl) { showToast(t('reg.err.idUrl'), "error"); return; }
      setShowConfirmModal(true);
    }
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    onComplete({ ...form, age: calcAge(form.dob), uid: `u_${Date.now()}`, status: "pending", isVerified: false, membership: "free", createdAt: new Date().toISOString(),
      notifications: [{ id: `notif_${Date.now()}`, title: t('notif.submitted.title'), body: t('notif.submitted.body'), createdAt: new Date().toISOString(), read: false }]
    });
  };

  const selOpts = {
    gender: [{ value: "male", label: t('reg.gender.male') }, { value: "female", label: t('reg.gender.female') }],
    profileFor: ["Myself", "Son", "Daughter", "Brother", "Sister", "Relative"].map(v => ({ value: v, label: v })),
    height: ["4'10\"","4'11\"","5'0\"","5'1\"","5'2\"","5'3\"","5'4\"","5'5\"","5'6\"","5'7\"","5'8\"","5'9\"","5'10\"","5'11\"","6'0\"","6'1\"","6'2\""].map(v => ({ value: v, label: v })),
    motherTongue: ["Gujarati","Hindi","Marathi","Punjabi","Bengali","Tamil","Telugu","Kannada","Malayalam","Other"].map(v => ({ value: v, label: v })),
    religion: ["Hindu","Muslim","Sikh","Christian","Buddhist","Jain","Other"].map(v => ({ value: v, label: v })),
    education: ["10th Pass","12th Pass","Diploma","Bachelor's Degree","Master's Degree","PhD","Other"].map(v => ({ value: v, label: v })),
    jobType: ["Business","Private Job","Govt Job","Doctor","Engineer","Lawyer","Teacher","Homemaker","Other"].map(v => ({ value: v, label: v })),
    salary: ["Less than ₹50,000","₹50,000 - ₹1,00,000","₹1,00,000 - ₹5,00,000","₹5,00,000 - ₹10,00,000","Above ₹10,00,000","Not Disclosed"].map(v => ({ value: v, label: v })),
    diet: ["Vegetarian","Non-Vegetarian","Eggetarian","Jain Vegetarian"].map(v => ({ value: v, label: v })),
    maritalStatus: ["Never Married","Divorced","Widowed","Separated"].map(v => ({ value: v, label: v })),
    yesno: [{ value: "No", label: "No" }, { value: "Yes", label: "Yes" }],
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', sans-serif" }}>
      <Toast msg={toast.msg} type={toast.type} />
      <div style={{ background: C.primary, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 4 }}><Ic n="back" s={20} c="#fff" /></button>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif" }}>{t('reg.title')}</div>
      </div>
      <div style={{ background: C.white, padding: "14px 20px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: i < step ? C.success : i === step ? C.primary : "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: i <= step ? "#fff" : C.muted, fontWeight: 700 }}>
                {i < step ? <Ic n="check" s={14} c="#fff" /> : i + 1}
              </div>
              <div style={{ fontSize: 9, color: i === step ? C.primary : C.muted, marginTop: 3, textAlign: "center", fontWeight: i === step ? 700 : 400 }}>{s.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 20px 100px", maxWidth: 480, margin: "0 auto" }}>
        <div style={{ background: C.white, borderRadius: 16, padding: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 20, marginBottom: 4 }}>{steps[step].icon}</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 16 }}>{steps[step].title}</div>

          {step === 0 && <>
            <Select label={t('reg.profileFor')} value={form.profileFor} onChange={e => f("profileFor", e.target.value)} options={selOpts.profileFor} />
            <Input label={t('reg.fullName')} value={form.name} onChange={e => f("name", e.target.value)} placeholder={t('reg.name.placeholder')} required />
            <Select label={t('reg.gender')} value={form.gender} onChange={e => f("gender", e.target.value)} options={selOpts.gender} />
            <Input label={t('reg.dob')} type="date" value={form.dob} onChange={e => f("dob", e.target.value)} required />
            <Select label={t('reg.height')} value={form.height} onChange={e => f("height", e.target.value)} options={selOpts.height} />
          </>}

          {step === 1 && <>
            <Select label={t('reg.motherTongue')} value={form.motherTongue} onChange={e => f("motherTongue", e.target.value)} options={selOpts.motherTongue} />
            <Select label={t('reg.religion')} value={form.religion} onChange={e => f("religion", e.target.value)} options={selOpts.religion} />
            <Input label={t('reg.caste')} value={form.caste} onChange={e => f("caste", e.target.value)} placeholder={t('reg.caste.placeholder')} />
          </>}

          {step === 2 && <>
            <Select label={t('reg.education')} value={form.education} onChange={e => f("education", e.target.value)} options={selOpts.education} />
            <Input label={t('reg.institute')} value={form.institute} onChange={e => f("institute", e.target.value)} placeholder={t('reg.institute.ph')} />
            <Select label={t('reg.jobType')} value={form.jobType} onChange={e => f("jobType", e.target.value)} options={selOpts.jobType} />
            <Select label={t('reg.salary')} value={form.salary} onChange={e => f("salary", e.target.value)} options={selOpts.salary} />
          </>}

          {step === 3 && <>
            <Select label={t('reg.diet')} value={form.diet} onChange={e => f("diet", e.target.value)} options={selOpts.diet} />
            <Select label={t('reg.challenged')} value={form.challenged} onChange={e => f("challenged", e.target.value)} options={selOpts.yesno} />
            <Select label={t('reg.maritalStatus')} value={form.maritalStatus} onChange={e => f("maritalStatus", e.target.value)} options={selOpts.maritalStatus} />
          </>}

          {step === 4 && <>
            <Input label={t('reg.location')} value={form.location} onChange={e => f("location", e.target.value)} placeholder={t('reg.location.ph')} required />
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5 }}>{t('reg.about')}</label>
              <textarea value={form.about} onChange={e => f("about", e.target.value)} rows={4} placeholder={t('reg.about.ph')}
                style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, color: C.text, outline: "none", fontFamily: "'Segoe UI', sans-serif", resize: "vertical" }} />
            </div>
            <Input label={t('reg.photo')} value={form.profilePhoto} onChange={e => f("profilePhoto", e.target.value)} placeholder="https://..." />
            {form.profilePhoto && <img src={form.profilePhoto} alt="Preview" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: `3px solid ${C.primary}`, marginBottom: 14 }} onError={e => (e.target as any).style.display = "none"} />}
          </>}

          {step === 5 && <>
            <Select label={t('reg.idType')} value={form.governmentIdType} onChange={e => f("governmentIdType", e.target.value)} options={[
              { value: "Aadhaar Card", label: "Aadhaar Card" }, { value: "PAN Card", label: "PAN Card" },
              { value: "License", label: "Driving License" }, { value: "Ration Card", label: "Ration Card" }
            ]} required />
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5 }}>{t('reg.idUpload')} <span style={{ color: C.error }}>*</span></label>
              <div style={{ border: `2.5px dashed ${form.governmentIdUrl ? C.success : C.primary}40`, borderRadius: 12, padding: "20px 14px", textAlign: "center", background: `${C.bg}50`, cursor: "pointer", position: "relative", transition: "all 0.2s" }}
                onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); const file = e.dataTransfer.files[0]; if (file) handleFileUpload(file); }}>
                <input type="file" accept="image/*,application/pdf" style={{ display: "none" }} id="id-file-upload" onChange={e => { const file = e.target.files?.[0]; if (file) handleFileUpload(file); }} />
                <label htmlFor="id-file-upload" style={{ cursor: "pointer", display: "block" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>📤</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{form.governmentIdUrl ? t('reg.changeDoc') : t('reg.chooseFile')}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{t('reg.fileSupport')}</div>
                </label>
              </div>
              <div style={{ marginTop: 10, textAlign: "center" }}>
                <button type="button" onClick={generateDemoIdScan} style={{ background: "none", border: "none", color: C.primary, fontSize: 12, fontWeight: 600, textDecoration: "underline", cursor: "pointer" }}>{t('reg.genDemo')}</button>
              </div>
              {form.governmentIdUrl && (
                <div style={{ marginTop: 14, padding: 10, border: `1.5px solid ${C.border}`, borderRadius: 10, display: "flex", gap: 10, alignItems: "center" }}>
                  {form.governmentIdUrl.startsWith("data:image/") ? <img src={form.governmentIdUrl} alt="ID Preview" style={{ width: 50, height: 50, borderRadius: 6, objectFit: "cover" }} /> : <div style={{ width: 50, height: 50, background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, fontSize: 20 }}>📄</div>}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{form.governmentIdType}</div>
                    <div style={{ fontSize: 10, color: C.success, fontWeight: 600, marginTop: 2 }}>{t('reg.ready')}</div>
                  </div>
                  <button type="button" onClick={() => f("governmentIdUrl", "")} style={{ background: "none", border: "none", color: C.error, cursor: "pointer", padding: 4 }}>{t('reg.remove')}</button>
                </div>
              )}
            </div>
          </>}

          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            {step > 0 && <Btn onClick={() => setStep(s => s - 1)} variant="ghost" full>{t('reg.back')}</Btn>}
            <Btn onClick={next} variant="primary" full>{step === steps.length - 1 ? t('reg.submit') : t('reg.next')}</Btn>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99999, padding: 20 }}>
          <div style={{ background: C.white, borderRadius: 20, padding: 30, maxWidth: 400, width: "100%", textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 12 }}>{t('reg.docs.submitted')}</div>
            <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 24 }}>{t('reg.docs.desc')} <strong>{form.governmentIdType}</strong> {t('reg.docs.desc2')}</div>
            <Btn onClick={handleConfirm} variant="primary" full size="lg">{t('reg.goto.dashboard')}</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PENDING APPROVAL SCREEN ──────────────────────────────────────────────
function PendingApprovalScreen({ user, onLogout }) {
  const { t } = useLang();
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: C.white, borderRadius: 20, padding: 32, maxWidth: 380, width: "100%", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#fff8e1", border: "3px solid #ffd700", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 36 }}>⏳</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 8 }}>{t('pending.title')}</div>
        <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>
          {t('pending.hello')} <strong>{user.name || 'User'}</strong>, {t('pending.desc1')}
          <br /><br />{t('pending.email.notice')} <strong>{user.email}</strong> {t('pending.approved.note')}
        </div>
        <div style={{ background: "#f0f9ff", borderRadius: 10, padding: 14, marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: "#1e40af" }}>{t('pending.info')}</div>
        </div>
        <Btn onClick={onLogout} variant="outline" full>{t('pending.logout')}</Btn>
      </div>
    </div>
  );
}

// ─── PROFILE CARD ─────────────────────────────────────────────────────────
function ProfileCard({ user, onView, onInterest }: any) {
  const { t } = useLang();
  return (
    <div style={{ background: C.white, borderRadius: 14, marginBottom: 12, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex" }}>
        <div style={{ width: 110, flexShrink: 0, position: "relative" }}>
          <img src={user.profilePhoto} alt={user.name} style={{ width: "100%", height: 130, objectFit: "cover" }} />
          {user.isVerified && <div style={{ position: "absolute", top: 6, left: 6, background: "#fef3c7", borderRadius: 20, padding: "2px 6px", fontSize: 9, fontWeight: 700, color: "#92400e" }}>{t('profile.verified')}</div>}
          {user.membership === "premium" && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(139,0,0,0.85)", textAlign: "center", padding: "3px 0", fontSize: 9, color: "#ffd700", fontWeight: 700 }}>{t('profile.premium')}</div>}
        </div>
        <div style={{ flex: 1, padding: "12px 12px 8px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{user.name}, {user.age}</div>
          <div style={{ fontSize: 11, color: C.primary, fontWeight: 600, marginTop: 2 }}>{user.caste}</div>
          <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 3 }}>
            {[["🎓", user.education], ["💼", user.jobType], ["📍", user.location], ["🕊", user.maritalStatus]].map(([ic, val]) => val && (
              <div key={ic as string} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.muted }}>
                <span>{ic}</span><span>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", borderTop: `1px solid ${C.bg}` }}>
        <button onClick={onView} style={{ flex: 1, padding: "10px 0", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: C.primary, borderRight: `1px solid ${C.bg}` }}>{t('profile.view')}</button>
        <button onClick={onInterest} style={{ flex: 1, padding: "10px 0", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: C.primary }}>{t('profile.send.interest')}</button>
      </div>
    </div>
  );
}

// ─── PROFILE DETAIL VIEW ──────────────────────────────────────────────────
function ProfileDetailView({ user, currentUser, onBack, onChat, onInterest }) {
  const { t } = useLang();
  const sections = [
    { title: t('detail.personal'), icon: "👤", fields: [[t('field.profileFor'), user.profileFor], [t('field.name'), user.name], [t('field.gender'), user.gender], [t('field.dob'), user.dob], [t('field.height'), user.height]] },
    { title: t('detail.social'), icon: "🏛", fields: [[t('field.location'), user.location], [t('field.motherTongue'), user.motherTongue], [t('field.religion'), user.religion], [t('field.caste'), user.caste]] },
    { title: t('detail.education'), icon: "🎓", fields: [[t('field.education'), user.education], [t('field.institute'), user.institute]] },
    { title: t('detail.professional'), icon: "💼", fields: [[t('field.jobType'), user.jobType], [t('field.salary'), user.salary]] },
    { title: t('detail.more'), icon: "📋", fields: [[t('field.diet'), user.diet], [t('field.challenged'), user.challenged], [t('field.maritalStatus'), user.maritalStatus]] },
    { title: t('detail.contact'), icon: "📧", fields: [[t('field.email'), user.email]] },
  ];

  return (
    <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: C.primary, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 4 }}><Ic n="back" s={20} c="#fff" /></button>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{t('detail.viewProfile')}</div>
      </div>
      <div style={{ background: `linear-gradient(180deg, ${C.primary} 0%, ${C.bg} 100%)`, padding: "0 0 20px" }}>
        <div style={{ textAlign: "center", paddingTop: 20 }}>
          <img src={user.profilePhoto} style={{ width: 110, height: 110, borderRadius: "50%", objectFit: "cover", border: "4px solid #fff", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }} alt={user.name} />
          <div style={{ fontSize: 20, fontWeight: 700, color: C.text, marginTop: 10, fontFamily: "Georgia, serif" }}>{user.name}, {user.age}</div>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{user.caste} • {user.religion}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, fontSize: 12, color: C.muted, marginTop: 4 }}><Ic n="pin" s={13} c={C.muted} /> {user.location}</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
            {user.isVerified && <span style={{ background: "#fef3c7", color: "#92400e", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>{t('profile.verified')}</span>}
            {user.membership === "premium" && <span style={{ background: C.primary, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>{t('profile.premium')}</span>}
          </div>
        </div>
      </div>
      {user.about && (
        <div style={{ margin: "0 14px 14px", background: C.white, borderRadius: 12, padding: 14, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 6 }}>{t('detail.about')}</div>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{user.about}</div>
        </div>
      )}
      {sections.map(sec => (
        <div key={sec.title} style={{ margin: "0 14px 12px", background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ padding: "12px 14px", background: `${C.primary}08`, borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: C.primary }}><span>{sec.icon}</span> {sec.title}</div>
          </div>
          {sec.fields.map(([label, val]) => (
            <div key={label as string} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderBottom: `1px solid ${C.bg}`, fontSize: 13 }}>
              <span style={{ color: C.muted }}>{label}</span>
              <span style={{ fontWeight: 600, color: C.text, textAlign: "right", maxWidth: "55%" }}>{val || "-"}</span>
            </div>
          ))}
        </div>
      ))}
      <div style={{ padding: "14px 14px 90px", display: "flex", gap: 10 }}>
        <Btn onClick={onInterest} variant="primary" full size="lg"><Ic n="heart" s={16} c="#fff" /> {t('chat.interest')}</Btn>
        <Btn onClick={onChat} variant="outline" full size="lg"><Ic n="chat" s={16} c={C.primary} /> {t('chat.btn')}</Btn>
      </div>
    </div>
  );
}

// ─── SEARCH VIEW ──────────────────────────────────────────────────────────
function SearchView({ users, onView }) {
  const { t } = useLang();
  const [q, setQ] = useState("");
  const [filterReligion, setFilterReligion] = useState("");
  const filtered = users.filter(u =>
    (!q || u.name.toLowerCase().includes(q.toLowerCase()) || u.location?.toLowerCase().includes(q.toLowerCase()) || u.caste?.toLowerCase().includes(q.toLowerCase())) &&
    (!filterReligion || u.religion === filterReligion)
  );
  return (
    <div>
      <div style={{ position: "relative", marginBottom: 10 }}>
        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><Ic n="search" s={16} c={C.muted} /></span>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder={t('search.placeholder')}
          style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px 10px 36px", fontSize: 13, fontFamily: "'Segoe UI', sans-serif", outline: "none" }} />
      </div>
      <select value={filterReligion} onChange={e => setFilterReligion(e.target.value)} style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 12px", fontSize: 13, marginBottom: 12, fontFamily: "'Segoe UI', sans-serif", outline: "none" }}>
        <option value="">{t('search.all.religions')}</option>
        {["Hindu","Muslim","Sikh","Christian","Buddhist","Jain"].map(r => <option key={r} value={r}>{r}</option>)}
      </select>
      {filtered.length === 0 ? <div style={{ textAlign: "center", color: C.muted, padding: 24, fontSize: 13 }}>{t('search.no.results')}</div>
        : filtered.map(u => <ProfileCard key={u.uid} user={u} onView={() => onView(u)} onInterest={() => {}} />)}
    </div>
  );
}

// ─── CHAT ROOM ────────────────────────────────────────────────────────────
function ChatRoom({ me, other, messages, setMessages, onBack }) {
  const { t } = useLang();
  const [text, setText] = useState("");
  const thread = messages[other.uid] || [];
  const endRef = useRef(null);
  useEffect(() => { (endRef.current as any)?.scrollIntoView({ behavior: "smooth" }); }, [thread]);
  const send = () => {
    if (!text.trim()) return;
    const msg = { from: me.uid, text: text.trim(), time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) };
    setMessages(p => ({ ...p, [other.uid]: [...(p[other.uid] || []), msg] }));
    setText("");
  };
  return (
    <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: C.primary, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }}><Ic n="back" s={20} c="#fff" /></button>
        <img src={other.profilePhoto} style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.4)" }} alt={other.name} />
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{other.name}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{other.location}</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {thread.length === 0 && <div style={{ textAlign: "center", color: C.muted, fontSize: 12, padding: 24 }}>{t('chat.start')} {other.name} 🌸</div>}
        {thread.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.from === me.uid ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "72%", background: msg.from === me.uid ? C.primary : C.white, color: msg.from === me.uid ? "#fff" : C.text, borderRadius: msg.from === me.uid ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding: "9px 14px", fontSize: 13, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
              {msg.text}
              <div style={{ fontSize: 10, opacity: 0.65, marginTop: 3, textAlign: "right" }}>{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ background: C.white, padding: "10px 14px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 10, alignItems: "center" }}>
        <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder={t('chat.placeholder')}
          style={{ flex: 1, border: `1.5px solid ${C.border}`, borderRadius: 24, padding: "10px 16px", fontSize: 13, outline: "none", fontFamily: "'Segoe UI', sans-serif" }} />
        <button onClick={send} style={{ width: 40, height: 40, borderRadius: "50%", background: C.primary, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n="send" s={16} c="#fff" /></button>
      </div>
    </div>
  );
}

// ─── USER APP ─────────────────────────────────────────────────────────────
function UserApp({ currentUser, allUsers, setAllUsers, onLogout, onSwitchAdmin }) {
  const { t, lang, setLang } = useLang();
  const [tab, setTab] = useState("home");
  const [viewProfile, setViewProfile] = useState(null);
  const [messages, setMessages] = useState({});
  const [chatWith, setChatWith] = useState(null);
  const [toast, showToast] = useToast();

  const matches = allUsers.filter(u => u.uid !== currentUser.uid && u.status === "approved" && u.gender !== currentUser.gender);

  const deleteMyProfile = async () => {
    if (!window.confirm(t('profile.delete.confirm'))) return;
    try {
      const res = await fetch("/api/users/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ uid: currentUser.uid }) });
      const data = await res.json();
      if (data.success) { setAllUsers(prev => prev.filter(u => u.uid !== currentUser.uid)); onLogout(); }
    } catch (err) { console.error(err); }
  };

  const sendInterest = (uid) => showToast(t('profile.interest.sent'), "success");

  if (chatWith) return <ChatRoom me={currentUser} other={chatWith} messages={messages} setMessages={setMessages} onBack={() => setChatWith(null)} />;
  if (viewProfile) return <ProfileDetailView user={viewProfile} currentUser={currentUser} onBack={() => setViewProfile(null)} onChat={() => { setChatWith(viewProfile); setViewProfile(null); setTab("messages"); }} onInterest={() => { sendInterest((viewProfile as any).uid); setViewProfile(null); }} />;

  const profileFields = [
    [t('field.profileFor'), currentUser.profileFor], [t('field.gender'), currentUser.gender], [t('field.dob'), currentUser.dob],
    [t('field.height'), currentUser.height], [t('field.motherTongue'), currentUser.motherTongue], [t('field.religion'), currentUser.religion],
    [t('field.caste'), currentUser.caste], [t('field.education'), currentUser.education], [t('field.institute'), currentUser.institute],
    [t('field.jobType'), currentUser.jobType], [t('field.salary'), currentUser.salary], [t('field.diet'), currentUser.diet],
    [t('field.maritalStatus'), currentUser.maritalStatus], [t('field.email'), currentUser.email],
  ];

  return (
    <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', sans-serif", position: "relative" }}>
      <Toast msg={toast.msg} type={toast.type} />
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 22 }}>💍</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: C.primary, fontFamily: "Georgia, serif" }}>{t('app.name')}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Notifications bell */}
          <button style={{ background: "none", border: "none", cursor: "pointer", position: "relative", padding: 4 }} onClick={() => setTab("notifications")}>
            <Ic n="bell" s={22} c={tab === "notifications" ? C.primary : C.muted} />
            {(currentUser.notifications || []).filter(n => !n.read).length > 0 && (
              <span style={{ position: "absolute", top: 0, right: 0, background: C.error, color: "#fff", borderRadius: "50%", width: 14, height: 14, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                {(currentUser.notifications || []).filter(n => !n.read).length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
        {tab === "home" && (
          <div style={{ padding: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 10 }}>
              {currentUser.gender === "male" ? t('home.matches.male') : t('home.matches.female')}
            </div>
            {matches.length === 0 ? (
              <div style={{ background: C.white, borderRadius: 12, padding: 24, textAlign: "center", color: C.muted, fontSize: 13 }}>{t('home.no.profiles')}</div>
            ) : matches.map(u => <ProfileCard key={u.uid} user={u} onView={() => setViewProfile(u)} onInterest={() => sendInterest(u.uid)} />)}
          </div>
        )}

        {tab === "search" && (
          <div style={{ padding: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 14 }}>{t('search.title')}</div>
            <SearchView users={matches} onView={u => setViewProfile(u)} />
          </div>
        )}

        {tab === "messages" && (
          <div style={{ padding: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 14 }}>{t('messages.title')}</div>
            {matches.slice(0, 3).map(u => {
              const lastMsg = messages[u.uid]?.slice(-1)[0];
              return (
                <div key={u.uid} onClick={() => setChatWith(u)} style={{ background: C.white, borderRadius: 12, padding: 14, marginBottom: 10, display: "flex", gap: 12, alignItems: "center", cursor: "pointer", border: `1px solid ${C.border}` }}>
                  <img src={u.profilePhoto} style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.border}` }} alt={u.name} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: C.text, fontSize: 14 }}>{u.name}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{lastMsg ? lastMsg.text : t('messages.tap')}</div>
                  </div>
                  {messages[u.uid]?.length > 0 && <div style={{ fontSize: 10, color: C.gold, fontWeight: 600 }}>{messages[u.uid].slice(-1)[0].time}</div>}
                </div>
              );
            })}
          </div>
        )}

        {tab === "notifications" && (
          <div style={{ padding: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 14 }}>{t('nav.notifications')}</div>
            {(currentUser.notifications || []).length === 0 ? (
              <div style={{ background: C.white, borderRadius: 12, padding: 24, textAlign: "center", color: C.muted, fontSize: 13 }}>{t('notif.no.notifs')}</div>
            ) : [...(currentUser.notifications || [])].reverse().map((n: any) => (
              <div key={n.id} style={{ background: C.white, borderRadius: 12, padding: 14, marginBottom: 10, border: `1px solid ${C.border}`, borderLeft: `3px solid ${n.read ? C.border : C.primary}` }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.text, marginBottom: 4 }}>{n.title}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{n.body}</div>
                <div style={{ fontSize: 10, color: C.subtle, marginTop: 6 }}>{fmtDate(n.createdAt)}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "profile" && (
          <div style={{ padding: 14 }}>
            <div style={{ background: C.white, borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}`, marginBottom: 14 }}>
              <div style={{ background: `linear-gradient(135deg, ${C.primary}, #5a0000)`, padding: "20px 16px", textAlign: "center" }}>
                <img src={currentUser.profilePhoto || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(255,255,255,0.5)", marginBottom: 8 }} alt={currentUser.name} />
                <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif" }}>{currentUser.name || 'User'}, {currentUser.age || ''}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>{currentUser.location || t('profile.location.notset')}</div>
              </div>
              <div style={{ padding: 16 }}>
                {profileFields.map(([label, val]) => val && (
                  <div key={label as string} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.bg}`, fontSize: 13 }}>
                    <span style={{ color: C.muted }}>{label}</span>
                    <span style={{ fontWeight: 600, color: C.text, textAlign: "right", maxWidth: "55%" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Language Settings */}
            <div style={{ background: C.white, borderRadius: 16, padding: 16, border: `1px solid ${C.border}`, marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <Ic n="globe" s={18} c={C.primary} />
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{t('settings.language')}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {([["EN", "English"], ["HI", "हिन्दी"], ["GU", "ગુજરાતી"]] as [Lang, string][]).map(([code, label]) => (
                  <button key={code} onClick={() => { setLang(code); showToast(t('settings.lang.changed'), "success"); }}
                    style={{ flex: 1, padding: "10px 6px", borderRadius: 10, border: lang === code ? `2px solid ${C.primary}` : `1.5px solid ${C.border}`, background: lang === code ? `${C.primary}10` : C.white, cursor: "pointer", fontSize: 12, fontWeight: 700, color: lang === code ? C.primary : C.muted, transition: "all .2s" }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {onSwitchAdmin && <Btn onClick={onSwitchAdmin} variant="outline" full><Ic n="shield" s={16} c={C.primary} /> {t('profile.admin.panel')}</Btn>}
              <Btn onClick={deleteMyProfile} variant="danger" full><Ic n="trash" s={16} c="#fff" /> {t('profile.delete')}</Btn>
              <Btn onClick={onLogout} variant="ghost" full><Ic n="logout" s={16} c={C.muted} /> {t('profile.logout')}</Btn>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: C.white, borderTop: `2px solid ${C.border}`, display: "flex", zIndex: 20 }}>
        {([["home", "home", t('nav.home')], ["search", "search", t('nav.search')], ["messages", "chat", t('nav.messages')], ["notifications", "bell", t('nav.notifications')], ["profile", "user", t('nav.profile')]] as [string, string, string][]).map(([id, icon, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: "10px 0 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: tab === id ? C.primary : C.muted, transition: "color .15s" }}>
            <Ic n={icon} s={20} c={tab === id ? C.primary : C.muted} />
            <span style={{ fontSize: 9, fontWeight: tab === id ? 700 : 400 }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────
function AdminPanel({ users, setUsers, onLogout, onSwitchUser }) {
  const { t } = useLang();
  const [tab, setTab] = useState("dashboard");
  const [toast, showToast] = useToast();

  const pending = users.filter(u => u.status === "pending");
  const approved = users.filter(u => u.status === "approved");
  const total = users.length;

  const approve = async (uid) => {
    try {
      const notif = { id: `notif_${Date.now()}`, title: t('notif.approved.title'), body: t('notif.approved.body'), createdAt: new Date().toISOString(), read: false };
      const res = await fetch("/api/users/update", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ uid, updates: { status: "approved", notifications: [notif] } }) });
      const data = await res.json();
      if (data.success) { setUsers(p => p.map(u => u.uid === uid ? { ...u, status: "approved", notifications: [notif] } : u)); showToast(t('admin.toast.approved'), "success"); }
    } catch (err) { console.error(err); }
  };

  const reject = async (uid) => {
    try {
      const res = await fetch("/api/users/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ uid }) });
      const data = await res.json();
      if (data.success) { setUsers(p => p.filter(u => u.uid !== uid)); showToast(t('admin.toast.rejected'), "info"); }
    } catch (err) { console.error(err); }
  };

  const toggleVerify = async (uid) => {
    const targetUser = users.find(u => u.uid === uid); if (!targetUser) return;
    try {
      const res = await fetch("/api/users/update", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ uid, updates: { isVerified: !targetUser.isVerified } }) });
      const data = await res.json();
      if (data.success) { setUsers(p => p.map(u => u.uid === uid ? { ...u, isVerified: !u.isVerified } : u)); showToast(t('admin.toast.verified'), "success"); }
    } catch (err) { console.error(err); }
  };

  const toggleBlock = async (uid) => {
    const targetUser = users.find(u => u.uid === uid); if (!targetUser) return;
    const nextStatus = targetUser.status === "blocked" ? "approved" : "blocked";
    try {
      const res = await fetch("/api/users/update", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ uid, updates: { status: nextStatus } }) });
      const data = await res.json();
      if (data.success) { setUsers(p => p.map(u => u.uid === uid ? { ...u, status: nextStatus } : u)); showToast(t('admin.toast.blocked'), "info"); }
    } catch (err) { console.error(err); }
  };

  const deleteUser = async (uid, name) => {
    if (!window.confirm(`Delete ${name}'s profile?`)) return;
    try {
      const res = await fetch("/api/users/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ uid }) });
      const data = await res.json();
      if (data.success) { setUsers(p => p.filter(u => u.uid !== uid)); showToast(`${name} deleted.`, "info"); }
    } catch (err) { console.error(err); }
  };

  const navItems = [
    { id: "dashboard", label: t('admin.nav.dashboard'), icon: "chart" },
    { id: "pending", label: t('admin.nav.pending'), icon: "bell", badge: pending.length, badgeRed: true },
    { id: "users", label: t('admin.nav.profiles'), icon: "users" },
    { id: "create", label: t('admin.nav.create'), icon: "plus" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "'Segoe UI', sans-serif" }}>
      <Toast msg={toast.msg} type={toast.type} />
      <div style={{ background: C.primary, padding: "0 24px", display: "flex", alignItems: "center", gap: 16, borderBottom: `3px solid ${C.gold}` }}>
        <div style={{ padding: "14px 0", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 22 }}>💍</div>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase" }}>{t('admin.console')}</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", fontFamily: "Georgia, serif" }}>{t('app.name')}</div>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>{t('admin.badge')}</span>
          <button onClick={onSwitchUser} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "6px 12px", color: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>{t('admin.user.view')}</button>
          <button onClick={onLogout} style={{ background: "none", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "6px 10px", color: "rgba(255,255,255,0.8)", cursor: "pointer" }}><Ic n="logout" s={14} c="rgba(255,255,255,0.8)" /></button>
        </div>
      </div>
      <div style={{ display: "flex", minHeight: "calc(100vh - 58px)" }}>
        <aside style={{ width: 210, background: C.white, borderRight: `1px solid ${C.border}`, flexShrink: 0, paddingTop: 16 }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)}
              style={{ width: "100%", padding: "11px 18px", background: tab === item.id ? `${C.primary}10` : "transparent", borderLeft: tab === item.id ? `3px solid ${C.primary}` : "3px solid transparent", border: "none", borderRadius: 0, display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif", fontSize: 13, fontWeight: tab === item.id ? 700 : 500, color: tab === item.id ? C.primary : C.text, transition: "all .15s" }}>
              <Ic n={item.icon} s={16} c={tab === item.id ? C.primary : C.muted} />
              <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
              {(item as any).badge > 0 && <span style={{ background: (item as any).badgeRed ? C.error : C.primary, color: "#fff", borderRadius: 99, padding: "1px 7px", fontSize: 10, fontWeight: 800 }}>{(item as any).badge}</span>}
            </button>
          ))}
        </aside>
        <main style={{ flex: 1, padding: 28, overflowY: "auto" }}>
          {tab === "dashboard" && <AdminDashboard users={users} pending={pending} approved={approved} total={total} />}
          {tab === "pending" && <AdminPending users={pending} onApprove={approve} onReject={reject} />}
          {tab === "users" && <AdminUsers users={users} onVerify={toggleVerify} onBlock={toggleBlock} onDelete={deleteUser} />}
          {tab === "create" && <AdminCreateProfile onSave={async (u) => {
            try {
              const res = await fetch("/api/users/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(u) });
              const data = await res.json();
              if (data.success) { setUsers(p => [...p, u]); showToast(`${u.name} added.`, "success"); setTab("users"); }
            } catch (err) { console.error(err); }
          }} />}
        </main>
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────
function AdminDashboard({ users, pending, approved, total }) {
  const { t } = useLang();
  const males = users.filter(u => u.gender === "male").length;
  const females = users.filter(u => u.gender === "female").length;
  const premium = users.filter(u => u.membership === "premium").length;
  const stats = [
    { label: t('admin.stat.total'), val: total, icon: "users", color: C.primary },
    { label: t('admin.stat.approved'), val: approved.length, icon: "check", color: C.success },
    { label: t('admin.stat.pending'), val: pending.length, icon: "bell", color: C.warning },
    { label: t('admin.stat.premium'), val: premium, icon: "crown", color: C.gold },
    { label: t('admin.stat.grooms'), val: males, icon: "user", color: "#2563eb" },
    { label: t('admin.stat.brides'), val: females, icon: "user", color: "#db2777" },
  ];
  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 20 }}>{t('admin.dashboard.title')}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: C.white, borderRadius: 14, padding: 18, border: `1px solid ${C.border}`, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n={s.icon} s={18} c={s.color} /></div>
              <div style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{s.label}</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>
      <div style={{ background: C.white, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 14 }}>{t('admin.recent')}</div>
        {users.slice(-5).reverse().map(u => (
          <div key={u.uid} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.bg}` }}>
            <img src={u.profilePhoto} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} alt={u.name} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{u.name}, {u.age}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{u.caste} • {u.location}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: u.status === "approved" ? "#ecfdf5" : u.status === "pending" ? "#fef9c3" : "#fef2f2", color: u.status === "approved" ? C.success : u.status === "pending" ? C.warning : C.error }}>
              {u.status === "approved" ? t('status.approved') : u.status === "pending" ? t('status.pending') : t('status.blocked')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ADMIN PENDING ────────────────────────────────────────────────────────
function AdminPending({ users, onApprove, onReject }: any) {
  const { t } = useLang();
  const [activeScanUrl, setActiveScanUrl] = useState<string | null>(null);
  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 20 }}>{t('admin.pending.title')} ({users.length})</div>
      {users.length === 0 ? (
        <div style={{ background: C.white, borderRadius: 14, padding: 40, textAlign: "center", color: C.muted, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>{t('admin.pending.empty')}</div>
        </div>
      ) : users.map((u: any) => (
        <div key={u.uid} style={{ background: C.white, borderRadius: 14, padding: 20, marginBottom: 14, border: `1px solid ${C.border}`, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <img src={u.profilePhoto} style={{ width: 70, height: 70, borderRadius: 12, objectFit: "cover", border: `2px solid ${C.border}` }} alt={u.name} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{u.name}, {u.age}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{u.caste} • {u.religion} • {u.gender}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px", marginTop: 8, fontSize: 12 }}>
                {[["📍", u.location], ["🎓", u.education], ["💼", u.jobType], ["📧", u.email]].map(([ic, val]) => (
                  <div key={ic as string} style={{ color: C.muted }}><span>{ic}</span> {val}</div>
                ))}
              </div>
              {u.about && <div style={{ fontSize: 12, color: C.muted, marginTop: 8, fontStyle: "italic", lineHeight: 1.5 }}>"{u.about}"</div>}
              {u.governmentIdType && (
                <div style={{ marginTop: 14, padding: 12, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 40, height: 40, background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, fontSize: 18 }}>💳</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: C.muted }}>{t('admin.doc.submitted')}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{u.governmentIdType}</div>
                  </div>
                  {u.governmentIdUrl ? (
                    <button type="button" onClick={() => setActiveScanUrl(u.governmentIdUrl)} style={{ background: C.primary, color: "#fff", border: "none", padding: "6px 12px", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{t('admin.view.scan')}</button>
                  ) : (
                    <span style={{ fontSize: 11, color: C.error, fontWeight: 600 }}>{t('admin.no.scan')}</span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <Btn onClick={() => onApprove(u.uid)} variant="success" full><Ic n="check" s={14} c="#fff" /> {t('admin.approve')}</Btn>
            <Btn onClick={() => onReject(u.uid)} variant="danger" full><Ic n="x" s={14} c="#fff" /> {t('admin.reject')}</Btn>
          </div>
        </div>
      ))}
      {activeScanUrl && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 99999, padding: 20 }} onClick={() => setActiveScanUrl(null)}>
          <div style={{ maxWidth: "90%", maxHeight: "80%", marginBottom: 15 }}>
            {activeScanUrl.startsWith("data:image/") ? <img src={activeScanUrl} alt="Government ID Full Scan" style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: 8, boxShadow: "0 4px 25px rgba(0,0,0,0.5)" }} onClick={e => e.stopPropagation()} />
              : <iframe src={activeScanUrl} title="ID PDF Scan" style={{ width: "80vw", height: "80vh", background: "#fff", border: "none", borderRadius: 8 }} />}
          </div>
          <button type="button" onClick={() => setActiveScanUrl(null)} style={{ background: C.white, color: C.text, border: "none", padding: "10px 24px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{t('admin.close.viewer')}</button>
        </div>
      )}
    </div>
  );
}

// ─── ADMIN USERS ──────────────────────────────────────────────────────────
function AdminUsers({ users, onVerify, onBlock, onDelete }) {
  const { t } = useLang();
  const [search, setSearch] = useState("");
  const [gFilter, setGFilter] = useState("all");
  const [sFilter, setSFilter] = useState("all");
  const filtered = users.filter(u =>
    (u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase())) &&
    (gFilter === "all" || u.gender === gFilter) && (sFilter === "all" || u.status === sFilter)
  );
  const statusColor = { approved: C.success, pending: C.warning, blocked: C.error };
  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>{t('admin.all.title')} ({filtered.length})</div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><Ic n="search" s={16} c={C.muted} /></span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('admin.search.ph')} style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "9px 14px 9px 34px", fontSize: 13, outline: "none" }} />
        </div>
        <select value={gFilter} onChange={e => setGFilter(e.target.value)} style={{ border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", fontSize: 13, outline: "none" }}>
          <option value="all">{t('admin.all.genders')}</option>
          <option value="male">{t('admin.male')}</option>
          <option value="female">{t('admin.female')}</option>
        </select>
        <select value={sFilter} onChange={e => setSFilter(e.target.value)} style={{ border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", fontSize: 13, outline: "none" }}>
          <option value="all">{t('admin.all.status')}</option>
          <option value="approved">{t('status.approved')}</option>
          <option value="pending">{t('status.pending')}</option>
          <option value="blocked">{t('status.blocked')}</option>
        </select>
      </div>
      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: `${C.primary}08` }}>
              {[t('admin.th.profile'), t('admin.th.location'), t('admin.th.status'), t('admin.th.actions')].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 700, color: C.text, borderBottom: `1px solid ${C.border}`, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.uid} style={{ borderBottom: `1px solid ${C.bg}` }}>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img src={u.profilePhoto} style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.border}` }} alt={u.name} />
                    <div>
                      <div style={{ fontWeight: 700, color: C.text, display: "flex", alignItems: "center", gap: 6 }}>{u.name}, {u.age}{u.isVerified && <span style={{ color: C.gold, fontSize: 13 }}>⭐</span>}</div>
                      <div style={{ fontSize: 11, color: C.muted }}>{u.email}</div>
                      <div style={{ fontSize: 10, color: C.muted }}>{u.gender === "male" ? t('admin.groom') : t('admin.bride')}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ color: C.muted, fontSize: 12 }}>{u.caste}</div>
                  <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>{u.education}</div>
                  <div style={{ color: C.muted, fontSize: 11, display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}><Ic n="pin" s={10} c={C.muted} /> {u.location}</div>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <span style={{ background: `${statusColor[u.status]}20`, color: statusColor[u.status], borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
                    {u.status === "approved" ? t('status.approved') : u.status === "pending" ? t('status.pending') : t('status.blocked')}
                  </span>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{fmtDate(u.createdAt)}</div>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <button onClick={() => onVerify(u.uid)} style={{ background: u.isVerified ? "#fef3c7" : "#ecfdf5", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer", fontSize: 11, fontWeight: 600, color: u.isVerified ? "#92400e" : C.success }}>{u.isVerified ? t('admin.unverify') : t('admin.verify')}</button>
                    <button onClick={() => onBlock(u.uid)} style={{ background: u.status === "blocked" ? "#ecfdf5" : "#fef2f2", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer", fontSize: 11, fontWeight: 600, color: u.status === "blocked" ? C.success : C.error }}>{u.status === "blocked" ? t('admin.unblock') : t('admin.block')}</button>
                    <button onClick={() => onDelete(u.uid, u.name)} style={{ background: "#fef2f2", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: C.error }}><Ic n="trash" s={13} c={C.error} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── ADMIN CREATE PROFILE ─────────────────────────────────────────────────
function AdminCreateProfile({ onSave }) {
  const { t } = useLang();
  const [form, setForm] = useState({
    name: "", email: "", gender: "male", dob: "", age: 25, height: "5'4\"",
    profileFor: "Myself", motherTongue: "Gujarati", religion: "Hindu", caste: "Dhobi",
    education: "Bachelor's Degree", institute: "", jobType: "Business", salary: "₹50,000 - ₹1,00,000",
    diet: "Vegetarian", challenged: "No", maritalStatus: "Never Married", location: "", about: "",
    profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    status: "approved", isVerified: false, membership: "free",
  });
  const [toast, showToast] = useToast();
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const save = () => {
    if (!form.name || !form.email) { showToast(t('admin.name.req'), "error"); return; }
    onSave({ ...form, uid: `admin_${Date.now()}`, createdAt: new Date().toISOString(), age: form.dob ? calcAge(form.dob) : form.age });
  };
  return (
    <div>
      <Toast msg={toast.msg} type={toast.type} />
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 20 }}>{t('admin.add.title')}</div>
      <div style={{ background: C.white, borderRadius: 14, padding: 24, border: `1px solid ${C.border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <Input label={t('reg.fullName')} value={form.name} onChange={e => f("name", e.target.value)} placeholder={t('reg.fullName')} required />
          <Input label={t('field.email')} value={form.email} onChange={e => f("email", e.target.value)} placeholder="name@example.com" required />
          <Select label={t('reg.gender')} value={form.gender} onChange={e => f("gender", e.target.value)} options={[{ value: "male", label: t('reg.gender.male') }, { value: "female", label: t('reg.gender.female') }]} />
          <Input label={t('reg.dob')} type="date" value={form.dob} onChange={e => f("dob", e.target.value)} />
          <Input label={t('reg.location')} value={form.location} onChange={e => f("location", e.target.value)} placeholder={t('reg.location.ph')} />
          <Select label={t('reg.religion')} value={form.religion} onChange={e => f("religion", e.target.value)} options={["Hindu","Muslim","Sikh","Christian","Buddhist","Jain","Other"].map(v => ({ value: v, label: v }))} />
          <Input label={t('field.caste')} value={form.caste} onChange={e => f("caste", e.target.value)} placeholder="e.g. Dhobi (Madivala)" />
          <Select label={t('reg.education')} value={form.education} onChange={e => f("education", e.target.value)} options={["10th Pass","12th Pass","Diploma","Bachelor's Degree","Master's Degree","PhD"].map(v => ({ value: v, label: v }))} />
          <Select label={t('reg.jobType')} value={form.jobType} onChange={e => f("jobType", e.target.value)} options={["Business","Private Job","Govt Job","Doctor","Engineer","Teacher","Homemaker","Other"].map(v => ({ value: v, label: v }))} />
          <Select label={t('reg.maritalStatus')} value={form.maritalStatus} onChange={e => f("maritalStatus", e.target.value)} options={["Never Married","Divorced","Widowed","Separated"].map(v => ({ value: v, label: v }))} />
          <Select label="Status" value={form.status} onChange={e => f("status", e.target.value)} options={[{ value: "approved", label: t('status.approved') }, { value: "pending", label: t('status.pending') }]} />
          <Input label={t('reg.photo')} value={form.profilePhoto} onChange={e => f("profilePhoto", e.target.value)} placeholder="https://..." />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5 }}>{t('admin.about.label')}</label>
          <textarea value={form.about} onChange={e => f("about", e.target.value)} rows={3} placeholder={t('admin.about.ph')} style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, outline: "none", fontFamily: "'Segoe UI', sans-serif", resize: "vertical" }} />
        </div>
        <Btn onClick={save} variant="primary" size="lg"><Ic n="plus" s={16} c="#fff" /> {t('admin.add.btn')}</Btn>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ─── ROOT APP ─────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════
function AppInner() {
  const [users, setUsers] = useState([]);
  const [screen, setScreen] = useState("lang"); // lang | login | register | pending | userapp | admin
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [toast, showToast] = useToast();
  const { t } = useLang();

  // Check if language already selected
  useEffect(() => {
    const alreadySelected = localStorage.getItem("lang_selected");
    if (alreadySelected) setScreen("login");
  }, []);

  useEffect(() => {
    if (screen === "lang") return;
    fetch("/api/users").then(res => res.json()).then(data => {
      if (data.success && data.users) {
        setUsers(data.users);
        if (currentUser && currentUser.uid !== "admin") {
          const freshUser = data.users.find(u => u.uid === currentUser.uid);
          if (freshUser) setCurrentUser(freshUser);
        }
      }
    }).catch(err => console.error("Error loading users:", err));
  }, [screen]);

  useEffect(() => {
    if (!currentUser || currentUser.uid === "admin" || currentUser.status !== "pending") return;
    const interval = setInterval(() => {
      fetch("/api/users").then(res => res.json()).then(data => {
        if (data.success && data.users) {
          setUsers(data.users);
          const freshUser = data.users.find((u: any) => u.uid === currentUser.uid);
          if (freshUser) {
            setCurrentUser(freshUser);
            if (freshUser.status === "approved") {
              showToast(t('toast.profile.approved'), "success");
              setScreen("userapp");
            }
          }
        }
      }).catch(err => console.error("Polling failed:", err));
    }, 4000);
    return () => clearInterval(interval);
  }, [currentUser, screen]);

  const handleUserLogin = ({ isNew, email, user }) => {
    if (isNew) { setNewUserEmail(email); setScreen("register"); }
    else { setCurrentUser(user); setScreen(user.status === "approved" ? "userapp" : "pending"); }
  };

  const handleRegistration = async (userData) => {
    try {
      const res = await fetch("/api/users/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(userData) });
      const data = await res.json();
      if (data.success) { setUsers(prev => [...prev, userData]); setCurrentUser(userData); setScreen("pending"); }
    } catch (err) { console.error("Registration failed:", err); }
  };

  const handleAdminLogin = () => { setCurrentUser({ uid: "admin", name: "Admin", isAdmin: true }); setScreen("admin"); };
  const handleLogout = () => { localStorage.removeItem("token"); setCurrentUser(null); setScreen("login"); };

  if (screen === "lang") return <LanguageSelectionScreen onDone={() => setScreen("login")} />;
  if (screen === "login") return <EmailLoginScreen users={users} onUserLogin={handleUserLogin} onAdminLogin={handleAdminLogin} />;
  if (screen === "register") return <RegistrationScreen email={newUserEmail} onComplete={handleRegistration} onBack={() => setScreen("login")} />;
  if (screen === "pending") return <PendingApprovalScreen user={currentUser} onLogout={handleLogout} />;
  if (screen === "admin") return <AdminPanel users={users} setUsers={setUsers} onLogout={handleLogout} onSwitchUser={() => { setCurrentUser(users.find(u => u.status === "approved") || users[0]); setScreen("userapp"); }} />;
  if (screen === "userapp") return <UserApp currentUser={currentUser} allUsers={users} setAllUsers={setUsers} onLogout={handleLogout} onSwitchAdmin={() => setScreen("admin")} />;
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}
