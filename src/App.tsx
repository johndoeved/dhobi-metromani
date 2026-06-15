import { useState, useEffect, useRef } from "react";

// ─── COLORS & THEME ──────────────────────────────────────────────────────────
// Jeevansathi-inspired: white/light gray base, deep maroon accent, gold highlights
const C = {
  primary: "#8B0000",
  primaryLight: "#a30000",
  gold: "#C8960C",
  goldLight: "#f0c040",
  bg: "#f7f7f7",
  white: "#ffffff",
  card: "#ffffff",
  border: "#e8e0e0",
  text: "#1a1a1a",
  muted: "#666666",
  subtle: "#999999",
  success: "#16a34a",
  error: "#dc2626",
  warning: "#d97706",
  pending: "#7c3aed",
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const calcAge = (dob) => {
  if (!dob) return "";
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
};
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
  };
  return <svg width={s} height={s} viewBox="0 0 24 24">{p[n]}</svg>;
};

// ─── BUTTON COMPONENT ────────────────────────────────────────────────────────
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
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...sizes[size], ...variants[variant],
        borderRadius: 8, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
        width: full ? "100%" : "auto", opacity: disabled ? 0.6 : 1,
        fontFamily: "'Segoe UI', sans-serif", display: "inline-flex", alignItems: "center",
        justifyContent: "center", gap: 6, transition: "all .15s", ...sx,
      }}
    >{children}</button>
  );
};

// ─── INPUT COMPONENT ─────────────────────────────────────────────────────────
const Input = ({ label, value, onChange, placeholder, type = "text", required, style: sx = {} }: any) => (
  <div style={{ marginBottom: 14, ...sx }}>
    {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5 }}>{label}{required && <span style={{ color: C.error }}> *</span>}</label>}
    <input
      type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, color: C.text, outline: "none", fontFamily: "'Segoe UI', sans-serif", background: C.white, transition: "border .15s" }}
      onFocus={e => e.target.style.borderColor = C.primary}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  </div>
);

const Select = ({ label, value, onChange, options, required, style: sx = {} }: any) => (
  <div style={{ marginBottom: 14, ...sx }}>
    {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5 }}>{label}{required && <span style={{ color: C.error }}> *</span>}</label>}
    <select
      value={value} onChange={onChange}
      style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, color: C.text, outline: "none", fontFamily: "'Segoe UI', sans-serif", background: C.white, cursor: "pointer" }}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

// ─── TOAST ───────────────────────────────────────────────────────────────────
function Toast({ msg, type }) {
  if (!msg) return null;
  const colors = { success: "#ecfdf5", error: "#fef2f2", info: "#eff6ff", warning: "#fffbeb" };
  const tc = { success: C.success, error: C.error, info: "#1d4ed8", warning: C.warning };
  return (
    <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 9999, background: colors[type] || colors.info, color: tc[type] || tc.info, border: `1px solid ${tc[type] || tc.info}30`, borderRadius: 10, padding: "12px 20px", fontSize: 13, fontWeight: 600, fontFamily: "'Segoe UI', sans-serif", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", maxWidth: 360, whiteSpace: "nowrap" }}>
      {msg}
    </div>
  );
}

function useToast() {
  const [toast, setToast] = useState({ msg: "", type: "info" });
  const show = (msg, type = "info") => { setToast({ msg, type }); setTimeout(() => setToast({ msg: "", type: "info" }), 3000); };
  return [toast, show];
}

// ═══════════════════════════════════════════════════════════════════════════
// ─── EMAIL OTP LOGIN SCREEN ───────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════
function EmailLoginScreen({ users, onUserLogin, onAdminLogin }: any) {
  const [step, setStep] = useState("email"); // email | otp
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [demoOtp, setDemoOtp] = useState("");
  const [adminMode, setAdminMode] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Timer states
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [cooldown, setCooldown] = useState(0); // Resend cooldown in seconds

  useEffect(() => {
    if (step !== "otp" || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [step, timeLeft]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown(c => c - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const sendOTP = async () => {
    setError("");
    setSuccessMsg("");
    if (!email) { setError("Enter an email address"); return; }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setStep("otp");
        setTimeLeft(300); // Reset countdown
        setCooldown(60); // Set resend cooldown
        if (data.otp) {
          setDemoOtp(data.otp);
          setSuccessMsg("OTP generated in Fallback Console Mode.");
        } else {
          setDemoOtp("");
          setSuccessMsg("OTP sent to your email.");
        }
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setLoading(false);
      setError("Network error. Please try again.");
    }
  };

  const verifyOTP = async () => {
    setError("");
    setSuccessMsg("");
    if (!otp || otp.length !== 6) { setError("Enter a 6-digit OTP code"); return; }

    if (timeLeft <= 0) {
      setError("OTP expired.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      setLoading(false);

      if (data.success && data.verified) {
        setSuccessMsg("OTP verified successfully.");
        localStorage.setItem("token", data.token);
        onUserLogin({ isNew: data.isNew, email, user: data.user });
      } else {
        setError(data.message || "Invalid OTP.");
      }
    } catch (err) {
      setLoading(false);
      setError("Network error. Please verify your OTP code.");
    }
  };

  const adminLogin = () => {
    setError("");
    if (email === "admin@example.com" && adminPass === "admin123") {
      onAdminLogin();
      return;
    }
    setError("Invalid admin credentials.");
  };

  const fmtTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{ background: C.primary, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>💍</div>
        <div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase" }}>Dhobi Community</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "Georgia, serif", letterSpacing: 0.5 }}>Dhobi Metromani</div>
        </div>
      </div>

      {/* Hero Banner */}
      <div style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #5a0000 100%)`, padding: "28px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🌸</div>
        <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, fontFamily: "Georgia, serif", marginBottom: 4 }}>Find Your Life Partner</div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>Trusted by thousands of Dhobi families</div>
      </div>

      <div style={{ flex: 1, padding: "24px 20px", maxWidth: 440, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        {/* Mode toggle */}
        <div style={{ display: "flex", background: "#f0f0f0", borderRadius: 10, padding: 4, marginBottom: 24 }}>
          {[["Login / Register", false], ["Admin Login", true]].map(([label, isAdmin]) => (
            <button key={label} onClick={() => { setAdminMode(isAdmin); setError(""); setSuccessMsg(""); setStep("email"); }}
              style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all .2s", background: adminMode === isAdmin ? "#fff" : "transparent", color: adminMode === isAdmin ? C.primary : C.muted, boxShadow: adminMode === isAdmin ? "0 1px 6px rgba(0,0,0,0.1)" : "none" }}>
              {label}
            </button>
          ))}
        </div>

        {!adminMode ? (
          <div>
            {step === "email" ? (
              <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>Login / Register</div>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Enter your email address to continue</div>
                <div style={{ marginBottom: 14 }}>
                  <Input label="Email Address" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" required />
                </div>
                {error && <div style={{ color: C.error, fontSize: 12, marginBottom: 10 }}>{error}</div>}
                <Btn onClick={sendOTP} variant="primary" full disabled={loading} size="lg">
                  {loading ? "Sending..." : "Send OTP"}
                </Btn>
              </div>
            ) : (
              <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
                <button onClick={() => { setStep("email"); setOtp(""); setError(""); setSuccessMsg(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: C.primary, display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, marginBottom: 16, padding: 0 }}>
                  <Ic n="back" s={16} c={C.primary} /> Back
                </button>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>Verify OTP</div>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>OTP sent to {email}</div>
                
                {demoOtp && (
                  <div style={{ background: `linear-gradient(135deg, ${C.primary}15, ${C.gold}15)`, border: `1px solid ${C.primary}30`, borderRadius: 12, padding: 14, marginBottom: 20, textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>📬 Simulated Email Dispatch</div>
                    <div style={{ fontSize: 13, color: C.text }}>Your verification code is:</div>
                    <div style={{ fontSize: 32, fontWeight: 900, color: C.primary, letterSpacing: 8, marginTop: 6, fontFamily: "monospace" }}>{demoOtp}</div>
                  </div>
                )}

                <div style={{ marginBottom: 14 }}>
                  <Input label="Enter 6-digit OTP" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="______" required />
                </div>

                {/* Expiry Countdown */}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.muted, marginBottom: 14 }}>
                  <span>Code expires in: <strong style={{ color: timeLeft <= 60 ? C.error : C.text }}>{fmtTime(timeLeft)}</strong></span>
                </div>

                {successMsg && <div style={{ color: C.success, fontSize: 12, marginBottom: 10, fontWeight: 600 }}>{successMsg}</div>}
                {error && <div style={{ color: C.error, fontSize: 12, marginBottom: 10 }}>{error}</div>}
                
                <Btn onClick={verifyOTP} variant="primary" full size="lg" disabled={loading || timeLeft <= 0}>Verify & Continue</Btn>
                
                <button onClick={sendOTP} disabled={cooldown > 0 || loading} style={{ background: "none", border: "none", cursor: cooldown > 0 ? "not-allowed" : "pointer", color: cooldown > 0 ? C.subtle : C.primary, fontSize: 13, fontWeight: 600, width: "100%", marginTop: 12, padding: 8 }}>
                  {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${C.primary}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                <Ic n="shield" s={24} c={C.primary} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>Admin Access</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>Email: admin@example.com &nbsp;|&nbsp; Password: admin123</div>
            </div>
            <Input label="Admin Email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@example.com" />
            <Input label="Password" type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)} placeholder="Enter password" />
            {error && <div style={{ color: C.error, fontSize: 12, marginBottom: 10 }}>{error}</div>}
            <Btn onClick={adminLogin} variant="primary" full size="lg"><Ic n="shield" s={16} c="#fff" /> Login as Admin</Btn>
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
    governmentIdType: "Aadhaar Card",
    governmentIdUrl: "",
  });
  const [toast, showToast] = useToast();
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const steps = [
    { title: "Basic Details", icon: "👤" },
    { title: "Social Details", icon: "🏛" },
    { title: "Education & Career", icon: "🎓" },
    { title: "Personal Info", icon: "📋" },
    { title: "About & Location", icon: "📍" },
    { title: "Verification ID", icon: "🆔" },
  ];

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      f("governmentIdUrl", base64);
      showToast("Document scan uploaded successfully!", "success");
    };
    reader.onerror = () => {
      showToast("Failed to read file.", "error");
    };
    reader.readAsDataURL(file);
  };

  const generateDemoIdScan = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 250;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#f3f4f6";
      ctx.fillRect(0, 0, 400, 250);
      
      ctx.fillStyle = C.primary;
      ctx.fillRect(0, 0, 400, 45);
      
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText("GOVERNMENT OF METROMANI", 15, 26);
      
      ctx.fillStyle = C.text;
      ctx.font = "bold 13px sans-serif";
      ctx.fillText(`${form.governmentIdType || "GOVERNMENT ID CARD"}`, 15, 80);
      
      ctx.font = "11px sans-serif";
      ctx.fillStyle = C.muted;
      ctx.fillText(`Holder Name: ${form.name || "Matrimony Candidate"}`, 15, 115);
      ctx.fillText(`Date of Birth: ${fmtDate(form.dob) || "Not Set"}`, 15, 135);
      ctx.fillText(`Gender: ${form.gender === "male" ? "MALE" : "FEMALE"}`, 15, 155);
      ctx.fillText("STATUS: VERIFICATION DEMO DOCUMENT", 15, 185);
      
      ctx.fillStyle = "#e5e7eb";
      ctx.fillRect(270, 70, 110, 130);
      ctx.fillStyle = C.muted;
      ctx.font = "10px sans-serif";
      ctx.fillText("PHOTO SCAN", 295, 135);
      
      ctx.fillStyle = C.gold;
      ctx.fillRect(0, 235, 400, 15);
      
      const dataUrl = canvas.toDataURL("image/png");
      f("governmentIdUrl", dataUrl);
      showToast("Generated simulated ID Card scan!", "success");
    }
  };

  const next = () => {
    if (step === 0 && (!form.name || !form.dob)) { showToast("Please fill Name and Date of Birth", "error"); return; }
    if (step === 4 && !form.location) { showToast("Please fill City, State location", "error"); return; }
    if (step < steps.length - 1) setStep(s => s + 1);
    else {
      if (!form.governmentIdType) { showToast("Please select a government ID type", "error"); return; }
      if (!form.governmentIdUrl) { showToast("Please upload a scan of your government ID", "error"); return; }
      setShowConfirmModal(true);
    }
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    const age = calcAge(form.dob);
    onComplete({
      ...form,
      age,
      uid: `u_${Date.now()}`,
      status: "pending",
      isVerified: false,
      membership: "free",
      createdAt: new Date().toISOString(),
      notifications: [
        {
          id: `notif_${Date.now()}`,
          title: "Profile Submitted ⏳",
          body: "Your profile has been created and is awaiting verification by the administrator.",
          createdAt: new Date().toISOString(),
          read: false
        }
      ]
    });
  };

  const selOpts = {
    gender: [{ value: "male", label: "Male (Groom)" }, { value: "female", label: "Female (Bride)" }],
    profileFor: ["Myself", "Son", "Daughter", "Brother", "Sister", "Relative"].map(v => ({ value: v, label: v })),
    height: ["4'10\"", "4'11\"", "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"", "6'0\"", "6'1\"", "6'2\""].map(v => ({ value: v, label: v })),
    motherTongue: ["Gujarati", "Hindi", "Marathi", "Punjabi", "Bengali", "Tamil", "Telugu", "Kannada", "Malayalam", "Other"].map(v => ({ value: v, label: v })),
    religion: ["Hindu", "Muslim", "Sikh", "Christian", "Buddhist", "Jain", "Other"].map(v => ({ value: v, label: v })),
    education: ["10th Pass", "12th Pass", "Diploma", "Bachelor's Degree", "Master's Degree", "PhD", "Other"].map(v => ({ value: v, label: v })),
    jobType: ["Business", "Private Job", "Govt Job", "Doctor", "Engineer", "Lawyer", "Teacher", "Homemaker", "Other"].map(v => ({ value: v, label: v })),
    salary: ["Less than ₹50,000", "₹50,000 - ₹1,00,000", "₹1,00,000 - ₹5,00,000", "₹5,00,000 - ₹10,00,000", "Above ₹10,00,000", "Not Disclosed"].map(v => ({ value: v, label: v })),
    diet: ["Vegetarian", "Non-Vegetarian", "Eggetarian", "Jain Vegetarian"].map(v => ({ value: v, label: v })),
    maritalStatus: ["Never Married", "Divorced", "Widowed", "Separated"].map(v => ({ value: v, label: v })),
    yesno: [{ value: "No", label: "No" }, { value: "Yes", label: "Yes" }],
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', sans-serif" }}>
      <Toast msg={toast.msg} type={toast.type} />
      {/* Header */}
      <div style={{ background: C.primary, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 4 }}><Ic n="back" s={20} c="#fff" /></button>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif" }}>Create Profile</div>
      </div>
      {/* Steps */}
      <div style={{ background: C.white, padding: "14px 20px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
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
            <Select label="Profile For" value={form.profileFor} onChange={e => f("profileFor", e.target.value)} options={selOpts.profileFor} />
            <Input label="Full Name" value={form.name} onChange={e => f("name", e.target.value)} placeholder="As per Aadhaar" required />
            <Select label="Gender" value={form.gender} onChange={e => f("gender", e.target.value)} options={selOpts.gender} />
            <Input label="Date of Birth" type="date" value={form.dob} onChange={e => f("dob", e.target.value)} required />
            <Select label="Height" value={form.height} onChange={e => f("height", e.target.value)} options={selOpts.height} />
          </>}

          {step === 1 && <>
            <Select label="Mother Tongue" value={form.motherTongue} onChange={e => f("motherTongue", e.target.value)} options={selOpts.motherTongue} />
            <Select label="Religion" value={form.religion} onChange={e => f("religion", e.target.value)} options={selOpts.religion} />
            <Input label="Caste / Sub-caste" value={form.caste} onChange={e => f("caste", e.target.value)} placeholder="e.g. Dhobi, Madivala" />
          </>}

          {step === 2 && <>
            <Select label="Highest Education" value={form.education} onChange={e => f("education", e.target.value)} options={selOpts.education} />
            <Input label="Institute / University" value={form.institute} onChange={e => f("institute", e.target.value)} placeholder="e.g. Gujarat University" />
            <Select label="Job Type" value={form.jobType} onChange={e => f("jobType", e.target.value)} options={selOpts.jobType} />
            <Select label="Annual Income" value={form.salary} onChange={e => f("salary", e.target.value)} options={selOpts.salary} />
          </>}

          {step === 3 && <>
            <Select label="Dietary Habits" value={form.diet} onChange={e => f("diet", e.target.value)} options={selOpts.diet} />
            <Select label="Physically Challenged" value={form.challenged} onChange={e => f("challenged", e.target.value)} options={selOpts.yesno} />
            <Select label="Marital Status" value={form.maritalStatus} onChange={e => f("maritalStatus", e.target.value)} options={selOpts.maritalStatus} />
          </>}

          {step === 4 && <>
            <Input label="City, State" value={form.location} onChange={e => f("location", e.target.value)} placeholder="e.g. Ahmedabad, Gujarat" required />
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5 }}>About Yourself</label>
              <textarea value={form.about} onChange={e => f("about", e.target.value)} rows={4} placeholder="Briefly describe yourself, your family, and what you're looking for..."
                style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, color: C.text, outline: "none", fontFamily: "'Segoe UI', sans-serif", resize: "vertical" }} />
            </div>
            <Input label="Profile Photo URL" value={form.profilePhoto} onChange={e => f("profilePhoto", e.target.value)} placeholder="https://..." />
            {form.profilePhoto && <img src={form.profilePhoto} alt="Preview" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: `3px solid ${C.primary}`, marginBottom: 14 }} onError={e => e.target.style.display = "none"} />}
          </>}

          {step === 5 && <>
            <Select
              label="Select Government ID Type"
              value={form.governmentIdType}
              onChange={e => f("governmentIdType", e.target.value)}
              options={[
                { value: "Aadhaar Card", label: "Aadhaar Card" },
                { value: "PAN Card", label: "PAN Card" },
                { value: "License", label: "Driving License" },
                { value: "Ration Card", label: "Ration Card" }
              ]}
              required
            />
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5 }}>
                Upload Scan of ID Document <span style={{ color: C.error }}>*</span>
              </label>
              <div style={{
                border: `2.5px dashed ${form.governmentIdUrl ? C.success : C.primary}40`,
                borderRadius: 12,
                padding: "20px 14px",
                textAlign: "center",
                background: `${C.bg}50`,
                cursor: "pointer",
                position: "relative",
                transition: "all 0.2s"
              }}
              onDragOver={e => e.preventDefault()}
              onDrop={e => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) handleFileUpload(file);
              }}
              >
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  style={{ display: "none" }}
                  id="id-file-upload"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                />
                <label htmlFor="id-file-upload" style={{ cursor: "pointer", display: "block" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>📤</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>
                    {form.governmentIdUrl ? "Change Uploaded Document" : "Choose File or Drag & Drop"}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>
                    Supports PNG, JPG, JPEG, PDF (max 5MB)
                  </div>
                </label>
              </div>

              <div style={{ marginTop: 10, textAlign: "center" }}>
                <button
                  type="button"
                  onClick={generateDemoIdScan}
                  style={{
                    background: "none",
                    border: "none",
                    color: C.primary,
                    fontSize: 12,
                    fontWeight: 600,
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  Or click here to generate a simulated Demo ID Scan
                </button>
              </div>

              {form.governmentIdUrl && (
                <div style={{ marginTop: 14, padding: 10, border: `1.5px solid ${C.border}`, borderRadius: 10, display: "flex", gap: 10, alignItems: "center" }}>
                  {form.governmentIdUrl.startsWith("data:image/") ? (
                    <img src={form.governmentIdUrl} alt="ID Preview" style={{ width: 50, height: 50, borderRadius: 6, objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: 50, height: 50, background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, fontSize: 20 }}>📄</div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{form.governmentIdType} Document</div>
                    <div style={{ fontSize: 10, color: C.success, fontWeight: 600, marginTop: 2 }}>Ready for verification ✓</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => f("governmentIdUrl", "")}
                    style={{ background: "none", border: "none", color: C.error, cursor: "pointer", padding: 4 }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </>}

          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            {step > 0 && <Btn onClick={() => setStep(s => s - 1)} variant="ghost" full>← Back</Btn>}
            <Btn onClick={next} variant="primary" full>{step === steps.length - 1 ? "Submit Profile" : "Next →"}</Btn>
          </div>
        </div>
      </div>

      {/* Document Submission Confirmation Popup */}
      {showConfirmModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
          padding: 20
        }}>
          <div style={{
            background: C.white,
            borderRadius: 20,
            padding: 30,
            maxWidth: 400,
            width: "100%",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 12 }}>
              Documents Submitted!
            </div>
            <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 24 }}>
              Your profile information and <strong>{form.governmentIdType}</strong> have been securely uploaded to the admin panel for verification.
              <br /><br />
              Once verified by our administrators, your profile will be unlocked and you will gain full matchmaking and messaging access.
            </div>
            <Btn onClick={handleConfirm} variant="primary" full size="lg">
              Go to Dashboard
            </Btn>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PENDING APPROVAL SCREEN ──────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════
function PendingApprovalScreen({ user, onLogout }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyValue: "center", padding: 24, fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: C.white, borderRadius: 20, padding: 32, maxWidth: 380, width: "100%", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#fff8e1", border: "3px solid #ffd700", display: "flex", alignItems: "center", justifyValue: "center", margin: "0 auto 20px", fontSize: 36 }}>⏳</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 8 }}>Profile Under Review</div>
        <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>
          Hello <strong>{user.name || 'User'}</strong>, your profile has been submitted and is awaiting admin approval.
          <br /><br />
          You will receive an email on <strong>{user.email}</strong> once your profile is approved.
        </div>
        <div style={{ background: "#f0f9ff", borderRadius: 10, padding: 14, marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: "#1e40af" }}>ℹ️ This process usually takes 24-48 hours. Your privacy and data are secure.</div>
        </div>
        <Btn onClick={onLogout} variant="outline" full>Logout</Btn>
      </div>
    </div>
  );
}

// ─── USER APP (Mobile-style) ──────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════
function UserApp({ currentUser, allUsers, setAllUsers, onLogout, onSwitchAdmin }) {
  const [tab, setTab] = useState("home");
  const [viewProfile, setViewProfile] = useState(null);
  const [messages, setMessages] = useState({});
  const [chatWith, setChatWith] = useState(null);
  const [toast, showToast] = useToast();

  const matches = allUsers.filter(u =>
    u.uid !== currentUser.uid &&
    u.status === "approved" &&
    u.gender !== currentUser.gender
  );

  const deleteMyProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) return;
    try {
      const res = await fetch("/api/users/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: currentUser.uid })
      });
      const data = await res.json();
      if (data.success) {
        setAllUsers(prev => prev.filter(u => u.uid !== currentUser.uid));
        onLogout();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendInterest = (uid) => showToast("Interest sent! They will be notified. 💌", "success");

  if (chatWith) {
    return <ChatRoom me={currentUser} other={chatWith} messages={messages} setMessages={setMessages} onBack={() => setChatWith(null)} />;
  }
  if (viewProfile) {
    return <ProfileDetailView user={viewProfile} currentUser={currentUser} onBack={() => setViewProfile(null)} onChat={() => { setChatWith(viewProfile); setViewProfile(null); setTab("messages"); }} onInterest={() => { sendInterest(viewProfile.uid); setViewProfile(null); }} />;
  }

  return (
    <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', sans-serif", position: "relative" }}>
      <Toast msg={toast.msg} type={toast.type} />

      {/* Top Bar */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", alignItems: "center", justifyValue: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 22 }}>💍</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: C.primary, fontFamily: "Georgia, serif" }}>Dhobi Metromani</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {currentUser.isVerified && <span style={{ background: "#fef3c7", color: "#92400e", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99 }}>⭐ VERIFIED</span>}
          <button onClick={() => showToast("Notifications: No new alerts", "info")} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}>
            <Ic n="bell" s={20} c={C.muted} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 70 }}>

        {tab === "home" && (
          <div>
            <div style={{ background: `linear-gradient(135deg, ${C.primary}, #5a0000)`, padding: "18px 16px", color: "#fff" }}>
              <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>Welcome back,</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "Georgia, serif" }}>{currentUser.name || 'User'} 👋</div>
              <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>{matches.length} matches available for you</div>
            </div>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: "14px 14px 0" }}>
              {[["Matches", matches.length, "❤️"], ["Viewed", Math.floor(matches.length * 0.6), "👁"], ["Interests", 2, "💌"]].map(([label, val, ic]) => (
                <div key={label} style={{ background: C.white, borderRadius: 12, padding: "14px 10px", textAlign: "center", border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 20 }}>{ic}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: C.primary, marginTop: 4 }}>{val}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{label}</div>
                </div>
              ))}
            </div>
            {/* Matches */}
            <div style={{ padding: "14px 14px 0" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 10 }}>
                {currentUser.gender === "male" ? "Bride" : "Groom"} Profiles for You
              </div>
              {matches.length === 0 ? (
                <div style={{ background: C.white, borderRadius: 12, padding: 24, textAlign: "center", color: C.muted, fontSize: 13 }}>
                  No approved profiles found yet. Check back soon!
                </div>
              ) : matches.map(u => (
                <ProfileCard key={u.uid} user={u} onView={() => setViewProfile(u)} onInterest={() => sendInterest(u.uid)} />
              ))}
            </div>
          </div>
        )}

        {tab === "search" && (
          <div style={{ padding: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 14 }}>Search Profiles</div>
            <SearchView users={matches} onView={u => setViewProfile(u)} />
          </div>
        )}

        {tab === "messages" && (
          <div style={{ padding: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 14 }}>Messages</div>
            {matches.slice(0, 3).map(u => {
              const lastMsg = messages[u.uid]?.slice(-1)[0];
              return (
                <div key={u.uid} onClick={() => setChatWith(u)} style={{ background: C.white, borderRadius: 12, padding: 14, marginBottom: 10, display: "flex", gap: 12, alignItems: "center", cursor: "pointer", border: `1px solid ${C.border}` }}>
                  <img src={u.profilePhoto} style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.border}` }} alt={u.name} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: C.text, fontSize: 14 }}>{u.name}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{lastMsg ? lastMsg.text : "Tap to start a conversation"}</div>
                  </div>
                  {messages[u.uid]?.length > 0 && <div style={{ fontSize: 10, color: C.gold, fontWeight: 600 }}>{messages[u.uid].slice(-1)[0].time}</div>}
                </div>
              );
            })}
          </div>
        )}

        {tab === "profile" && (
          <div style={{ padding: 14 }}>
            {/* My Profile */}
            <div style={{ background: C.white, borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}`, marginBottom: 14 }}>
              <div style={{ background: `linear-gradient(135deg, ${C.primary}, #5a0000)`, padding: "20px 16px", textAlign: "center" }}>
                <img src={currentUser.profilePhoto || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(255,255,255,0.5)", marginBottom: 8 }} alt={currentUser.name} />
                <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif" }}>{currentUser.name || 'User'}, {currentUser.age || ''}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>{currentUser.location || "Location not set"}</div>
              </div>
              <div style={{ padding: 16 }}>
                {[
                  ["Profile For", currentUser.profileFor], ["Gender", currentUser.gender], ["Date of Birth", currentUser.dob],
                  ["Height", currentUser.height], ["Mother Tongue", currentUser.motherTongue], ["Religion", currentUser.religion],
                  ["Caste", currentUser.caste], ["Education", currentUser.education], ["Institute", currentUser.institute],
                  ["Job Type", currentUser.jobType], ["Salary", currentUser.salary], ["Diet", currentUser.diet],
                  ["Marital Status", currentUser.maritalStatus], ["Email Address", currentUser.email],
                ].map(([label, val]) => val && (
                  <div key={label} style={{ display: "flex", justifyValue: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.bg}`, fontSize: 13 }}>
                    <span style={{ color: C.muted }}>{label}</span>
                    <span style={{ fontWeight: 600, color: C.text, textAlign: "right", maxWidth: "55%" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {onSwitchAdmin && <Btn onClick={onSwitchAdmin} variant="outline" full><Ic n="shield" s={16} c={C.primary} /> Admin Panel</Btn>}
              <Btn onClick={deleteMyProfile} variant="danger" full><Ic n="trash" s={16} c="#fff" /> Delete My Profile</Btn>
              <Btn onClick={onLogout} variant="ghost" full><Ic n="logout" s={16} c={C.muted} /> Logout</Btn>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: C.white, borderTop: `2px solid ${C.border}`, display: "flex", zIndex: 20 }}>
        {[
          ["home", "home", "Home"],
          ["search", "search", "Search"],
          ["messages", "chat", "Chat"],
          ["profile", "user", "Profile"],
        ].map(([id, icon, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: "10px 0 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: tab === id ? C.primary : C.muted, transition: "color .15s" }}>
            <Ic n={icon} s={20} c={tab === id ? C.primary : C.muted} />
            <span style={{ fontSize: 10, fontWeight: tab === id ? 700 : 400 }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
// ─── PROFILE CARD ─────────────────────────────────────────────────────────
function ProfileCard({ user, onView, onInterest }: any) {
  return (
    <div style={{ background: C.white, borderRadius: 14, marginBottom: 12, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", gap: 0 }}>
        <div style={{ width: 110, flexShrink: 0, position: "relative" }}>
          <img src={user.profilePhoto} alt={user.name} style={{ width: "100%", height: 130, objectFit: "cover" }} />
          {user.isVerified && <div style={{ position: "absolute", top: 6, left: 6, background: "#fef3c7", borderRadius: 20, padding: "2px 6px", fontSize: 9, fontWeight: 700, color: "#92400e" }}>⭐ Verified</div>}
          {user.membership === "premium" && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(139,0,0,0.85)", textAlign: "center", padding: "3px 0", fontSize: 9, color: "#ffd700", fontWeight: 700 }}>PREMIUM</div>}
        </div>
        <div style={{ flex: 1, padding: "12px 12px 8px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{user.name}, {user.age}</div>
          <div style={{ fontSize: 11, color: C.primary, fontWeight: 600, marginTop: 2 }}>{user.caste}</div>
          <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 3 }}>
            {[
              ["🎓", user.education],
              ["💼", user.jobType],
              ["📍", user.location],
              ["🕊", user.maritalStatus],
            ].map(([ic, val]) => val && (
              <div key={ic} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.muted }}>
                <span>{ic}</span><span>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", borderTop: `1px solid ${C.bg}` }}>
        <button onClick={onView} style={{ flex: 1, padding: "10px 0", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: C.primary, borderRight: `1px solid ${C.bg}` }}>
          View Profile
        </button>
        <button onClick={onInterest} style={{ flex: 1, padding: "10px 0", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: C.primary }}>
          Send Interest 💌
        </button>
      </div>
    </div>
  );
}

// ─── PROFILE DETAIL VIEW ──────────────────────────────────────────────────
function ProfileDetailView({ user, currentUser, onBack, onChat, onInterest }) {
  const sections = [
    { title: "Personal Details", icon: "👤", fields: [["Profile For", user.profileFor], ["Name", user.name], ["Gender", user.gender], ["Date of Birth", user.dob], ["Height", user.height]] },
    { title: "Social Details", icon: "🏛", fields: [["Location", user.location], ["Mother Tongue", user.motherTongue], ["Religion", user.religion], ["Caste", user.caste]] },
    { title: "Educational Details", icon: "🎓", fields: [["Highest Education", user.education], ["Institute", user.institute]] },
    { title: "Professional Details", icon: "💼", fields: [["Job Type", user.jobType], ["Salary", user.salary]] },
    { title: "More Details", icon: "📋", fields: [["Dietary Habits", user.diet], ["Physically Challenged", user.challenged], ["Marital Status", user.maritalStatus]] },
    { title: "Contact Details", icon: "📧", fields: [["Email Address", user.email]] },
  ];

  return (
    <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{ background: C.primary, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 4 }}>
          <Ic n="back" s={20} c="#fff" />
        </button>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>View Profile</div>
      </div>

      {/* Photo & Name */}
      <div style={{ background: `linear-gradient(180deg, ${C.primary} 0%, ${C.bg} 100%)`, padding: "0 0 20px" }}>
        <div style={{ textAlign: "center", paddingTop: 20 }}>
          <img src={user.profilePhoto} style={{ width: 110, height: 110, borderRadius: "50%", objectFit: "cover", border: "4px solid #fff", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }} alt={user.name} />
          <div style={{ fontSize: 20, fontWeight: 700, color: C.text, marginTop: 10, fontFamily: "Georgia, serif" }}>{user.name}, {user.age}</div>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{user.caste} • {user.religion}</div>
          <div style={{ display: "flex", alignItems: "center", justifyValue: "center", gap: 4, fontSize: 12, color: C.muted, marginTop: 4 }}>
            <Ic n="pin" s={13} c={C.muted} /> {user.location}
          </div>
          <div style={{ display: "flex", gap: 8, justifyValue: "center", marginTop: 12 }}>
            {user.isVerified && <span style={{ background: "#fef3c7", color: "#92400e", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>⭐ Verified</span>}
            {user.membership === "premium" && <span style={{ background: C.primary, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>Premium</span>}
          </div>
        </div>
      </div>

      {/* About */}
      {user.about && (
        <div style={{ margin: "0 14px 14px", background: C.white, borderRadius: 12, padding: 14, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 6 }}>About</div>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{user.about}</div>
        </div>
      )}

      {/* Detail Sections */}
      {sections.map(sec => (
        <div key={sec.title} style={{ margin: "0 14px 12px", background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ padding: "12px 14px", background: `${C.primary}08`, borderBottom: `1px solid ${C.border}`, display: "flex", justifyValue: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: C.primary }}>
              <span>{sec.icon}</span> {sec.title}
            </div>
          </div>
          {sec.fields.map(([label, val]) => (
            <div key={label} style={{ display: "flex", justifyValue: "space-between", padding: "10px 14px", borderBottom: `1px solid ${C.bg}`, fontSize: 13 }}>
              <span style={{ color: C.muted }}>{label}</span>
              <span style={{ fontWeight: 600, color: C.text, textAlign: "right", maxWidth: "55%" }}>{val || "-"}</span>
            </div>
          ))}
        </div>
      ))}

      {/* CTA Buttons */}
      <div style={{ padding: "14px 14px 90px", display: "flex", gap: 10 }}>
        <Btn onClick={onInterest} variant="primary" full size="lg"><Ic n="heart" s={16} c="#fff" /> Send Interest</Btn>
        <Btn onClick={onChat} variant="outline" full size="lg"><Ic n="chat" s={16} c={C.primary} /> Chat</Btn>
      </div>
    </div>
  );
}

// ─── SEARCH VIEW ──────────────────────────────────────────────────────────
function SearchView({ users, onView }) {
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
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name, location, caste..."
          style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px 10px 36px", fontSize: 13, fontFamily: "'Segoe UI', sans-serif", outline: "none" }} />
      </div>
      <select value={filterReligion} onChange={e => setFilterReligion(e.target.value)}
        style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 12px", fontSize: 13, marginBottom: 12, fontFamily: "'Segoe UI', sans-serif", outline: "none" }}>
        <option value="">All Religions</option>
        {["Hindu", "Muslim", "Sikh", "Christian", "Buddhist", "Jain"].map(r => <option key={r} value={r}>{r}</option>)}
      </select>
      {filtered.length === 0 ? <div style={{ textAlign: "center", color: C.muted, padding: 24, fontSize: 13 }}>No profiles found</div>
        : filtered.map(u => <ProfileCard key={u.uid} user={u} onView={() => onView(u)} onInterest={() => {}} />)}
    </div>
  );
}

// ─── CHAT ROOM ────────────────────────────────────────────────────────────
function ChatRoom({ me, other, messages, setMessages, onBack }) {
  const [text, setText] = useState("");
  const thread = messages[other.uid] || [];
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [thread]);

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
        {thread.length === 0 && <div style={{ textAlign: "center", color: C.muted, fontSize: 12, padding: 24 }}>Start the conversation with {other.name} 🌸</div>}
        {thread.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyValue: msg.from === me.uid ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "72%", background: msg.from === me.uid ? C.primary : C.white, color: msg.from === me.uid ? "#fff" : C.text, borderRadius: msg.from === me.uid ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding: "9px 14px", fontSize: 13, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
              {msg.text}
              <div style={{ fontSize: 10, opacity: 0.65, marginTop: 3, textAlign: "right" }}>{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ background: C.white, padding: "10px 14px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 10, alignItems: "center" }}>
        <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message..."
          style={{ flex: 1, border: `1.5px solid ${C.border}`, borderRadius: 24, padding: "10px 16px", fontSize: 13, outline: "none", fontFamily: "'Segoe UI', sans-serif" }} />
        <button onClick={send} style={{ width: 40, height: 40, borderRadius: "50%", background: C.primary, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyValue: "center" }}>
          <Ic n="send" s={16} c="#fff" />
        </button>
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────
function AdminPanel({ users, setUsers, onLogout, onSwitchUser }) {
  const [tab, setTab] = useState("dashboard");
  const [toast, showToast] = useToast();

  const pending = users.filter(u => u.status === "pending");
  const approved = users.filter(u => u.status === "approved");
  const total = users.length;

  const approve = async (uid) => {
    try {
      const res = await fetch("/api/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid,
          updates: {
            status: "approved",
            notifications: [
              {
                id: `notif_${Date.now()}`,
                title: "Profile Approved! 🎉",
                body: "Congratulations! Your profile has been approved by the Admin. You can now view all matrimonial matches.",
                createdAt: new Date().toISOString(),
                read: false
              }
            ]
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        setUsers(p => p.map(u => u.uid === uid ? {
          ...u,
          status: "approved",
          notifications: [
            {
              id: `notif_${Date.now()}`,
              title: "Profile Approved! 🎉",
              body: "Congratulations! Your profile has been approved by the Admin. You can now view all matrimonial matches.",
              createdAt: new Date().toISOString(),
              read: false
            }
          ]
        } : u));
        showToast("Profile approved ✓", "success");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const reject = async (uid) => {
    try {
      const res = await fetch("/api/users/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid })
      });
      const data = await res.json();
      if (data.success) {
        setUsers(p => p.filter(u => u.uid !== uid));
        showToast("Profile rejected and removed.", "info");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleVerify = async (uid) => {
    const targetUser = users.find(u => u.uid === uid);
    if (!targetUser) return;
    try {
      const res = await fetch("/api/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, updates: { isVerified: !targetUser.isVerified } })
      });
      const data = await res.json();
      if (data.success) {
        setUsers(p => p.map(u => u.uid === uid ? { ...u, isVerified: !u.isVerified } : u));
        showToast("Verification status updated.", "success");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleBlock = async (uid) => {
    const targetUser = users.find(u => u.uid === uid);
    if (!targetUser) return;
    const nextStatus = targetUser.status === "blocked" ? "approved" : "blocked";
    try {
      const res = await fetch("/api/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, updates: { status: nextStatus } })
      });
      const data = await res.json();
      if (data.success) {
        setUsers(p => p.map(u => u.uid === uid ? { ...u, status: nextStatus } : u));
        showToast("Account status updated.", "info");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (uid, name) => {
    if (!window.confirm(`Delete ${name}'s profile?`)) return;
    try {
      const res = await fetch("/api/users/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid })
      });
      const data = await res.json();
      if (data.success) {
        setUsers(p => p.filter(u => u.uid !== uid));
        showToast(`${name}'s profile deleted.`, "info");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "chart" },
    { id: "pending", label: "Pending", icon: "bell", badge: pending.length, badgeRed: true },
    { id: "users", label: "All Profiles", icon: "users" },
    { id: "create", label: "Add Profile", icon: "plus" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "'Segoe UI', sans-serif" }}>
      <Toast msg={toast.msg} type={toast.type} />

      {/* Admin Top Bar */}
      <div style={{ background: C.primary, padding: "0 24px", display: "flex", alignItems: "center", gap: 16, borderBottom: `3px solid ${C.gold}` }}>
        <div style={{ padding: "14px 0", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 22 }}>💍</div>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase" }}>Admin Console</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", fontFamily: "Georgia, serif" }}>Dhobi Metromani</div>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>🛡️ Admin</span>
          <button onClick={onSwitchUser} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "6px 12px", color: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
            👤 User View
          </button>
          <button onClick={onLogout} style={{ background: "none", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "6px 10px", color: "rgba(255,255,255,0.8)", cursor: "pointer" }}>
            <Ic n="logout" s={14} c="rgba(255,255,255,0.8)" />
          </button>
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 58px)" }}>
        {/* Sidebar */}
        <aside style={{ width: 210, background: C.white, borderRight: `1px solid ${C.border}`, flexShrink: 0, paddingTop: 16 }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)}
              style={{ width: "100%", padding: "11px 18px", background: tab === item.id ? `${C.primary}10` : "transparent", borderLeft: tab === item.id ? `3px solid ${C.primary}` : "3px solid transparent", border: "none", borderRadius: 0, display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif", fontSize: 13, fontWeight: tab === item.id ? 700 : 500, color: tab === item.id ? C.primary : C.text, transition: "all .15s" }}>
              <Ic n={item.icon} s={16} c={tab === item.id ? C.primary : C.muted} />
              <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
              {item.badge > 0 && <span style={{ background: item.badgeRed ? C.error : C.primary, color: "#fff", borderRadius: 99, padding: "1px 7px", fontSize: 10, fontWeight: 800 }}>{item.badge}</span>}
            </button>
          ))}
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: 28, overflowY: "auto" }}>
          {tab === "dashboard" && <AdminDashboard users={users} pending={pending} approved={approved} total={total} />}
          {tab === "pending" && <AdminPending users={pending} onApprove={approve} onReject={reject} />}
          {tab === "users" && <AdminUsers users={users} onVerify={toggleVerify} onBlock={toggleBlock} onDelete={deleteUser} />}
          {tab === "create" && <AdminCreateProfile onSave={async (u) => {
            try {
              const res = await fetch("/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(u)
              });
              const data = await res.json();
              if (data.success) {
                setUsers(p => [...p, u]);
                showToast(`${u.name} added.`, "success");
                setTab("users");
              }
            } catch (err) {
              console.error(err);
            }
          }} />}
        </main>
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────
function AdminDashboard({ users, pending, approved, total }) {
  const males = users.filter(u => u.gender === "male").length;
  const females = users.filter(u => u.gender === "female").length;
  const premium = users.filter(u => u.membership === "premium").length;

  const stats = [
    { label: "Total Profiles", val: total, icon: "users", color: C.primary },
    { label: "Approved", val: approved.length, icon: "check", color: C.success },
    { label: "Pending Approval", val: pending.length, icon: "bell", color: C.warning },
    { label: "Premium Members", val: premium, icon: "crown", color: C.gold },
    { label: "Grooms (Male)", val: males, icon: "user", color: "#2563eb" },
    { label: "Brides (Female)", val: females, icon: "user", color: "#db2777" },
  ];

  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 20 }}>Dashboard Overview</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: C.white, borderRadius: 14, padding: 18, border: `1px solid ${C.border}`, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}15`, display: "flex", alignItems: "center", justifyValue: "center" }}>
                <Ic n={s.icon} s={18} c={s.color} />
              </div>
              <div style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{s.label}</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      <div style={{ background: C.white, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 14 }}>Recent Profiles</div>
        {users.slice(-5).reverse().map(u => (
          <div key={u.uid} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.bg}` }}>
            <img src={u.profilePhoto} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} alt={u.name} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{u.name}, {u.age}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{u.caste} • {u.location}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: u.status === "approved" ? "#ecfdf5" : u.status === "pending" ? "#fef9c3" : "#fef2f2", color: u.status === "approved" ? C.success : u.status === "pending" ? C.warning : C.error }}>
              {u.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ADMIN PENDING ────────────────────────────────────────────────────────
function AdminPending({ users, onApprove, onReject }: any) {
  const [activeScanUrl, setActiveScanUrl] = useState<string | null>(null);

  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 20 }}>Pending Approvals ({users.length})</div>
      {users.length === 0 ? (
        <div style={{ background: C.white, borderRadius: 14, padding: 40, textAlign: "center", color: C.muted, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>All caught up! No pending profiles.</div>
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
                  <div key={ic} style={{ color: C.muted }}><span>{ic}</span> {val}</div>
                ))}
              </div>
              {u.about && <div style={{ fontSize: 12, color: C.muted, marginTop: 8, fontStyle: "italic", lineHeight: 1.5 }}>"{u.about}"</div>}

              {u.governmentIdType && (
                <div style={{ marginTop: 14, padding: 12, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 40, height: 40, background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, fontSize: 18 }}>
                    💳
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: C.muted }}>Submitted Document</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{u.governmentIdType}</div>
                  </div>
                  {u.governmentIdUrl ? (
                    <button
                      type="button"
                      onClick={() => setActiveScanUrl(u.governmentIdUrl)}
                      style={{
                        background: C.primary,
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      View Scan 👁
                    </button>
                  ) : (
                    <span style={{ fontSize: 11, color: C.error, fontWeight: 600 }}>No document scan uploaded</span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <Btn onClick={() => onApprove(u.uid)} variant="success" full><Ic n="check" s={14} c="#fff" /> Approve Profile</Btn>
            <Btn onClick={() => onReject(u.uid)} variant="danger" full><Ic n="x" s={14} c="#fff" /> Reject</Btn>
          </div>
        </div>
      ))}

      {activeScanUrl && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
          padding: 20
        }}
        onClick={() => setActiveScanUrl(null)}
        >
          <div style={{ maxWidth: "90%", maxHeight: "80%", marginBottom: 15 }}>
            {activeScanUrl.startsWith("data:image/") ? (
              <img
                src={activeScanUrl}
                alt="Government ID Full Scan"
                style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: 8, boxShadow: "0 4px 25px rgba(0,0,0,0.5)" }}
                onClick={e => e.stopPropagation()}
              />
            ) : (
              <iframe
                src={activeScanUrl}
                title="ID PDF Scan"
                style={{ width: "80vw", height: "80vh", background: "#fff", border: "none", borderRadius: 8 }}
                onClick={e => e.stopPropagation()}
              />
            )}
          </div>
          <button
            type="button"
            onClick={() => setActiveScanUrl(null)}
            style={{
              background: C.white,
              color: C.text,
              border: "none",
              padding: "10px 24px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Close Viewer
          </button>
        </div>
      )}
    </div>
  );
}

// ─── ADMIN USERS ──────────────────────────────────────────────────────────
function AdminUsers({ users, onVerify, onBlock, onDelete }) {
  const [search, setSearch] = useState("");
  const [gFilter, setGFilter] = useState("all");
  const [sFilter, setSFilter] = useState("all");

  const filtered = users.filter(u =>
    (u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase())) &&
    (gFilter === "all" || u.gender === gFilter) &&
    (sFilter === "all" || u.status === sFilter)
  );

  const statusColor = { approved: C.success, pending: C.warning, blocked: C.error };

  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>All Profiles ({filtered.length})</div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><Ic n="search" s={16} c={C.muted} /></span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..."
            style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "9px 14px 9px 34px", fontSize: 13, outline: "none" }} />
        </div>
        <select value={gFilter} onChange={e => setGFilter(e.target.value)} style={{ border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", fontSize: 13, outline: "none" }}>
          <option value="all">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select value={sFilter} onChange={e => setSFilter(e.target.value)} style={{ border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", fontSize: 13, outline: "none" }}>
          <option value="all">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: `${C.primary}08` }}>
              {["Profile", "Location & Details", "Status", "Actions"].map(h => (
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
                      <div style={{ fontWeight: 700, color: C.text, display: "flex", alignItems: "center", gap: 6 }}>
                        {u.name}, {u.age}
                        {u.isVerified && <span style={{ color: C.gold, fontSize: 13 }}>⭐</span>}
                      </div>
                      <div style={{ fontSize: 11, color: C.muted }}>{u.email}</div>
                      <div style={{ fontSize: 10, color: C.muted }}>{u.gender === "male" ? "♂ Groom" : "♀ Bride"}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ color: C.muted, fontSize: 12 }}>{u.caste}</div>
                  <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>{u.education}</div>
                  <div style={{ color: C.muted, fontSize: 11, display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
                    <Ic n="pin" s={10} c={C.muted} /> {u.location}
                  </div>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <span style={{ background: `${statusColor[u.status]}20`, color: statusColor[u.status], borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
                    {u.status}
                  </span>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{fmtDate(u.createdAt)}</div>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <button onClick={() => onVerify(u.uid)} title={u.isVerified ? "Remove Verify" : "Verify"} style={{ background: u.isVerified ? "#fef3c7" : "#ecfdf5", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer", fontSize: 11, fontWeight: 600, color: u.isVerified ? "#92400e" : C.success }}>
                      {u.isVerified ? "⭐ Unverify" : "Verify ✓"}
                    </button>
                    <button onClick={() => onBlock(u.uid)} style={{ background: u.status === "blocked" ? "#ecfdf5" : "#fef2f2", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer", fontSize: 11, fontWeight: 600, color: u.status === "blocked" ? C.success : C.error }}>
                      {u.status === "blocked" ? "Unblock" : "Block"}
                    </button>
                    <button onClick={() => onDelete(u.uid, u.name)} style={{ background: "#fef2f2", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: C.error }}>
                      <Ic n="trash" s={13} c={C.error} />
                    </button>
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
  const [form, setForm] = useState({
    name: "", email: "", gender: "male", dob: "", age: 25, height: "5'4\"",
    profileFor: "Myself", motherTongue: "Gujarati", religion: "Hindu", caste: "Dhobi",
    education: "Bachelor's Degree", institute: "",
    jobType: "Business", salary: "₹50,000 - ₹1,00,000",
    diet: "Vegetarian", challenged: "No", maritalStatus: "Never Married",
    location: "", about: "",
    profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    status: "approved", isVerified: false, membership: "free",
  });
  const [toast, showToast] = useToast();
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const save = () => {
    if (!form.name || !form.email) { showToast("Name and Email are required.", "error"); return; }
    onSave({ ...form, uid: `admin_${Date.now()}`, createdAt: new Date().toISOString(), age: form.dob ? calcAge(form.dob) : form.age });
  };

  return (
    <div>
      <Toast msg={toast.msg} type={toast.type} />
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 20 }}>Add New Profile</div>
      <div style={{ background: C.white, borderRadius: 14, padding: 24, border: `1px solid ${C.border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <Input label="Full Name" value={form.name} onChange={e => f("name", e.target.value)} placeholder="Full Name" required />
          <Input label="Email Address" value={form.email} onChange={e => f("email", e.target.value)} placeholder="name@example.com" required />
          <Select label="Gender" value={form.gender} onChange={e => f("gender", e.target.value)} options={[{ value: "male", label: "Male (Groom)" }, { value: "female", label: "Female (Bride)" }]} />
          <Input label="Date of Birth" type="date" value={form.dob} onChange={e => f("dob", e.target.value)} />
          <Input label="City, State" value={form.location} onChange={e => f("location", e.target.value)} placeholder="e.g. Ahmedabad, Gujarat" />
          <Select label="Religion" value={form.religion} onChange={e => f("religion", e.target.value)} options={["Hindu", "Muslim", "Sikh", "Christian", "Buddhist", "Jain", "Other"].map(v => ({ value: v, label: v }))} />
          <Input label="Caste" value={form.caste} onChange={e => f("caste", e.target.value)} placeholder="e.g. Dhobi (Madivala)" />
          <Select label="Education" value={form.education} onChange={e => f("education", e.target.value)} options={["10th Pass", "12th Pass", "Diploma", "Bachelor's Degree", "Master's Degree", "PhD"].map(v => ({ value: v, label: v }))} />
          <Select label="Job Type" value={form.jobType} onChange={e => f("jobType", e.target.value)} options={["Business", "Private Job", "Govt Job", "Doctor", "Engineer", "Teacher", "Homemaker", "Other"].map(v => ({ value: v, label: v }))} />
          <Select label="Marital Status" value={form.maritalStatus} onChange={e => f("maritalStatus", e.target.value)} options={["Never Married", "Divorced", "Widowed", "Separated"].map(v => ({ value: v, label: v }))} />
          <Select label="Profile Status" value={form.status} onChange={e => f("status", e.target.value)} options={[{ value: "approved", label: "Approved" }, { value: "pending", label: "Pending" }]} />
          <Input label="Profile Photo URL" value={form.profilePhoto} onChange={e => f("profilePhoto", e.target.value)} placeholder="https://..." />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5 }}>About</label>
          <textarea value={form.about} onChange={e => f("about", e.target.value)} rows={3} placeholder="Brief description..."
            style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, outline: "none", fontFamily: "'Segoe UI', sans-serif", resize: "vertical" }} />
        </div>
        <Btn onClick={save} variant="primary" size="lg"><Ic n="plus" s={16} c="#fff" /> Add Profile</Btn>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [users, setUsers] = useState([]);
  const [screen, setScreen] = useState("login"); // login | register | pending | userapp | admin
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [toast, showToast] = useToast();

  // Sync with persistent backend database
  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.users) {
          setUsers(data.users);
          
          // Re-sync current logged in user details if they exist
          if (currentUser && currentUser.uid !== "admin") {
            const freshUser = data.users.find(u => u.uid === currentUser.uid);
            if (freshUser) {
              setCurrentUser(freshUser);
            }
          }
        }
      })
      .catch(err => console.error("Error loading users database:", err));
  }, [screen]);

  // Poll user status if they are pending approval
  useEffect(() => {
    if (!currentUser || currentUser.uid === "admin" || currentUser.status !== "pending") return;

    const interval = setInterval(() => {
      fetch("/api/users")
        .then(res => res.json())
        .then(data => {
          if (data.success && data.users) {
            setUsers(data.users);
            const freshUser = data.users.find((u: any) => u.uid === currentUser.uid);
            if (freshUser) {
              setCurrentUser(freshUser);
              if (freshUser.status === "approved") {
                showToast("Your profile has been approved! 🎉", "success");
                setScreen("userapp");
              }
            }
          }
        })
        .catch(err => console.error("Polling user status failed:", err));
    }, 4000); // Check every 4 seconds

    return () => clearInterval(interval);
  }, [currentUser, screen]);

  const handleUserLogin = ({ isNew, email, user }) => {
    if (isNew) {
      setNewUserEmail(email);
      setScreen("register");
    } else {
      setCurrentUser(user);
      setScreen(user.status === "approved" ? "userapp" : "pending");
    }
  };

  const handleRegistration = async (userData) => {
    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (data.success) {
        setUsers(prev => [...prev, userData]);
        setCurrentUser(userData);
        setScreen("pending");
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const handleAdminLogin = () => { setCurrentUser({ uid: "admin", name: "Admin", isAdmin: true }); setScreen("admin"); };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setScreen("login");
  };

  const getScreenComponent = () => {
    if (screen === "login") return <EmailLoginScreen users={users} onUserLogin={handleUserLogin} onAdminLogin={handleAdminLogin} />;
    if (screen === "register") return <RegistrationScreen email={newUserEmail} onComplete={handleRegistration} onBack={() => setScreen("login")} />;
    if (screen === "pending") return <PendingApprovalScreen user={currentUser} onLogout={handleLogout} />;
    if (screen === "admin") return <AdminPanel users={users} setUsers={setUsers} onLogout={handleLogout} onSwitchUser={() => { setCurrentUser(users.find(u => u.status === "approved") || users[0]); setScreen("userapp"); }} />;
    if (screen === "userapp") return (
      <UserApp
        currentUser={currentUser}
        allUsers={users}
        setAllUsers={setUsers}
        onLogout={handleLogout}
        onSwitchAdmin={() => setScreen("admin")}
      />
    );
    return null;
  };

  return (
    <>
      <Toast msg={toast.msg} type={toast.type} />
      {getScreenComponent()}
    </>
  );
}
