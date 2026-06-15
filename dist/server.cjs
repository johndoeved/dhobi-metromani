var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_dotenv = __toESM(require("dotenv"), 1);
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_bcryptjs = __toESM(require("bcryptjs"), 1);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var import_nodemailer = __toESM(require("nodemailer"), 1);
var import_fs = __toESM(require("fs"), 1);
import_dotenv.default.config();
var PORT = parseInt(process.env.PORT || "3000", 10);
var JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret_key_98765";
var DB_FILE = import_path.default.join(process.cwd(), "db.json");
var DEFAULT_USERS = [
  {
    uid: "u1",
    email: "rohit@example.com",
    name: "Rohit Parmar",
    gender: "male",
    dob: "1996-01-14",
    age: 30,
    height: `5'3"`,
    profileFor: "Myself",
    motherTongue: "Gujarati",
    religion: "Hindu",
    caste: "Madivala / Dhobi",
    education: "Master's Degree",
    institute: "IGNOU",
    jobType: "Business",
    salary: "\u20B91,00,000 - \u20B95,00,000",
    diet: "Vegetarian",
    challenged: "No",
    maritalStatus: "Never Married",
    location: "P\u0101lit\u0101na, Gujarat",
    profilePhoto: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop&face",
    about: "Looking for a life partner from the Dhobi community. Business owner based in Gujarat.",
    status: "approved",
    isVerified: true,
    membership: "premium",
    createdAt: "2026-01-15T10:00:00Z"
  },
  {
    uid: "u2",
    email: "priya@example.com",
    name: "Priya Kanojia",
    gender: "female",
    dob: "1999-05-20",
    age: 26,
    height: `5'4"`,
    profileFor: "Myself",
    motherTongue: "Hindi",
    religion: "Hindu",
    caste: "Dhobi (Kanojia)",
    education: "Bachelor's Degree",
    institute: "Gujarat University",
    jobType: "Private Job",
    salary: "\u20B950,000 - \u20B91,00,000",
    diet: "Vegetarian",
    challenged: "No",
    maritalStatus: "Never Married",
    location: "Ahmedabad, Gujarat",
    profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&face",
    about: "Simple, family-oriented girl looking for a well-settled match.",
    status: "approved",
    isVerified: true,
    membership: "premium",
    createdAt: "2026-01-20T10:00:00Z"
  },
  {
    uid: "u3",
    email: "suresh@example.com",
    name: "Suresh Baretha",
    gender: "male",
    dob: "1993-09-10",
    age: 32,
    height: `5'7"`,
    profileFor: "Myself",
    motherTongue: "Gujarati",
    religion: "Hindu",
    caste: "Dhobi (Baretha)",
    education: "12th Pass",
    institute: "Local School",
    jobType: "Business",
    salary: "\u20B950,000 - \u20B91,00,000",
    diet: "Non-Vegetarian",
    challenged: "No",
    maritalStatus: "Never Married",
    location: "Surat, Gujarat",
    profilePhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&face",
    about: "Running family business in Surat. Looking for a simple, homely partner.",
    status: "approved",
    isVerified: false,
    membership: "free",
    createdAt: "2026-02-01T10:00:00Z"
  },
  {
    uid: "u4",
    email: "meena@example.com",
    name: "Meena Rajak",
    gender: "female",
    dob: "2000-03-15",
    age: 25,
    height: `5'2"`,
    profileFor: "Myself",
    motherTongue: "Gujarati",
    religion: "Hindu",
    caste: "Dhobi (Rajak)",
    education: "Bachelor's Degree",
    institute: "Saurashtra University",
    jobType: "Homemaker",
    salary: "N/A",
    diet: "Vegetarian",
    challenged: "No",
    maritalStatus: "Never Married",
    location: "Rajkot, Gujarat",
    profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&face",
    about: "Calm, caring and family-oriented. Looking for a responsible life partner.",
    status: "pending",
    isVerified: false,
    membership: "free",
    createdAt: "2026-05-01T10:00:00Z"
  },
  {
    uid: "u5",
    email: "anita@example.com",
    name: "Anita Washerman",
    gender: "female",
    dob: "1997-11-22",
    age: 28,
    height: `5'5"`,
    profileFor: "Myself",
    motherTongue: "Gujarati",
    religion: "Hindu",
    caste: "Dhobi (Washerman)",
    education: "Master's Degree",
    institute: "Sardar Patel University",
    jobType: "Govt Job",
    salary: "\u20B950,000 - \u20B91,00,000",
    diet: "Vegetarian",
    challenged: "No",
    maritalStatus: "Never Married",
    location: "Vadodara, Gujarat",
    profilePhoto: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop&face",
    about: "Government employee, well-educated and cultured. Seeking a like-minded partner.",
    status: "approved",
    isVerified: true,
    membership: "free",
    createdAt: "2026-03-01T10:00:00Z"
  }
];
var UserDb = class {
  constructor() {
    this.users = [];
    this.load();
  }
  load() {
    try {
      if (import_fs.default.existsSync(DB_FILE)) {
        const data = import_fs.default.readFileSync(DB_FILE, "utf8");
        this.users = JSON.parse(data);
        console.log(`[UserDb] Loaded ${this.users.length} users from JSON store.`);
      } else {
        this.users = [...DEFAULT_USERS];
        this.save();
        console.log("[UserDb] Initialized database with default users.");
      }
    } catch (err) {
      console.error("[UserDb] Error loading database, falling back to defaults:", err);
      this.users = [...DEFAULT_USERS];
    }
  }
  save() {
    try {
      import_fs.default.writeFileSync(DB_FILE, JSON.stringify(this.users, null, 2), "utf8");
    } catch (err) {
      console.error("[UserDb] Error saving database:", err);
    }
  }
  getAll() {
    return this.users;
  }
  findByEmail(email) {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }
  create(user) {
    this.users.push(user);
    this.save();
  }
  update(uid, updates) {
    const index = this.users.findIndex((u) => u.uid === uid);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updates };
      this.save();
      return true;
    }
    return false;
  }
  delete(uid) {
    const index = this.users.findIndex((u) => u.uid === uid);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  }
};
var userDb = new UserDb();
var otpDb = /* @__PURE__ */ new Map();
var otpRequests = /* @__PURE__ */ new Map();
function cleanExpiredOtps() {
  const now = /* @__PURE__ */ new Date();
  for (const [email, record] of otpDb.entries()) {
    if (record.expiresAt < now) {
      otpDb.delete(email);
    }
  }
}
setInterval(cleanExpiredOtps, 60 * 1e3);
var NodemailerEmailProvider = class {
  constructor() {
    this.transporter = null;
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
      this.transporter = import_nodemailer.default.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT),
        secure: SMTP_PORT === "465",
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS
        }
      });
      console.log("[EmailService] Configured Nodemailer SMTP transporter.");
    } else {
      console.warn("[EmailService] Missing SMTP config. Running in Fallback Console mode.");
    }
  }
  async sendOtp(email, otp) {
    const from = process.env.SMTP_FROM || "Dhobi Metromani <noreply@dhobimetromani.com>";
    const subject = "Verify Your Email";
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 500px;
            background-color: #ffffff;
            margin: 0 auto;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            border: 1px solid #e8e0e0;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #8B0000;
            padding-bottom: 15px;
            margin-bottom: 20px;
          }
          .title {
            color: #8B0000;
            font-family: Georgia, serif;
            font-size: 24px;
            font-weight: bold;
            margin: 0;
          }
          .otp-box {
            background-color: #f5f5f5;
            border: 1px dashed #C8960C;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 6px;
            color: #8B0000;
            margin: 25px 0;
          }
          .footer {
            font-size: 12px;
            color: #666666;
            margin-top: 30px;
            text-align: center;
            border-top: 1px solid #e8e0e0;
            padding-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">Dhobi Metromani</h1>
          </div>
          <p>Hello,</p>
          <p>Your verification code is:</p>
          <div class="otp-box">${otp}</div>
          <p>This code will expire in 5 minutes.</p>
          <p>If you did not request this code, please ignore this email.</p>
          <div class="footer">
            Regards,<br>
            <strong>Dhobi Metromani</strong>
          </div>
        </div>
      </body>
      </html>
    `;
    if (this.transporter) {
      try {
        await this.transporter.sendMail({
          from,
          to: email,
          subject,
          text: `Hello,

Your verification code is: ${otp}

This code will expire in 5 minutes.

If you did not request this code, please ignore this email.

Regards,
Dhobi Metromani`,
          html
        });
        console.log(`[EmailService] OTP email sent successfully to ${email}`);
        return true;
      } catch (err) {
        console.warn(`[EmailService] Nodemailer sendMail failed: ${err instanceof Error ? err.message : String(err)}. Falling back to console logging.`);
      }
    }
    console.log("\n==================================================");
    console.log(`\u2709\uFE0F  EMAIL SENT TO: ${email}`);
    console.log(`\u{1F511}  SUBJECT: ${subject}`);
    console.log(`\u{1F522}  VERIFICATION CODE: ${otp}`);
    console.log("==================================================\n");
    try {
      const debugDir = import_path.default.join(process.cwd(), ".gemini_debug");
      if (!import_fs.default.existsSync(debugDir)) {
        import_fs.default.mkdirSync(debugDir, { recursive: true });
      }
      import_fs.default.writeFileSync(import_path.default.join(debugDir, "otp.txt"), otp, "utf8");
      console.log(`[EmailService] Saved OTP code to .gemini_debug/otp.txt for verification.`);
    } catch (e) {
      console.error("[EmailService] Failed to write OTP to .gemini_debug/otp.txt:", e);
    }
    return false;
  }
};
var emailProvider = new NodemailerEmailProvider();
async function startServer() {
  const app = (0, import_express.default)();
  app.use(import_express.default.json());
  app.get("/api/health", (req, res) => {
    res.json({
      status: "healthy",
      system: "Dhobi Metromani Admin API",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  });
  app.get("/api/users", (req, res) => {
    res.json({
      success: true,
      users: userDb.getAll()
    });
  });
  app.post("/api/users/register", (req, res) => {
    const userData = req.body;
    if (!userData.email || !userData.uid) {
      return res.status(400).json({ error: "Missing email or uid" });
    }
    userDb.create(userData);
    res.json({ success: true, user: userData });
  });
  app.post("/api/users/update", (req, res) => {
    const { uid, updates } = req.body;
    if (!uid || !updates) {
      return res.status(400).json({ error: "Missing uid or updates" });
    }
    const updated = userDb.update(uid, updates);
    res.json({ success: updated });
  });
  app.post("/api/users/delete", (req, res) => {
    const { uid } = req.body;
    if (!uid) {
      return res.status(400).json({ error: "Missing uid" });
    }
    const deleted = userDb.delete(uid);
    res.json({ success: deleted });
  });
  app.post("/api/auth/send-otp", async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email address is required." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email address format." });
    }
    const now = Date.now();
    const cleanEmail = email.toLowerCase().trim();
    const tenMinutesAgo = now - 10 * 60 * 1e3;
    const requests = otpRequests.get(cleanEmail) || [];
    const recentRequests = requests.filter((ts) => ts > tenMinutesAgo);
    if (recentRequests.length >= 3) {
      return res.status(429).json({
        success: false,
        message: "Too many OTP requests. Please wait a few minutes before trying again."
      });
    }
    if (recentRequests.length > 0) {
      const lastRequest = recentRequests[recentRequests.length - 1];
      if (now - lastRequest < 60 * 1e3) {
        return res.status(429).json({
          success: false,
          message: "Please wait 60 seconds before requesting a new OTP."
        });
      }
    }
    try {
      const otp = String(Math.floor(1e5 + Math.random() * 9e5));
      const salt = await import_bcryptjs.default.genSalt(10);
      const otpHash = await import_bcryptjs.default.hash(otp, salt);
      const expiresAt = new Date(now + 5 * 60 * 1e3);
      otpDb.set(cleanEmail, {
        email: cleanEmail,
        otpHash,
        expiresAt,
        attempts: 0,
        verified: false,
        createdAt: /* @__PURE__ */ new Date()
      });
      recentRequests.push(now);
      otpRequests.set(cleanEmail, recentRequests);
      const sentViaSmtp = await emailProvider.sendOtp(cleanEmail, otp);
      return res.status(200).json({
        success: true,
        message: sentViaSmtp ? "OTP sent successfully" : "OTP logged to console (Fallback Mode)"
      });
    } catch (error) {
      console.error("[AuthService] Error sending OTP:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error occurred while sending OTP."
      });
    }
  });
  app.post("/api/auth/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP code are required." });
    }
    const cleanEmail = email.toLowerCase().trim();
    const record = otpDb.get(cleanEmail);
    if (!record) {
      return res.status(400).json({ success: false, message: "No active OTP verification request found." });
    }
    if (record.attempts >= 5) {
      return res.status(400).json({
        success: false,
        message: "Maximum verification attempts exceeded. Please request a new OTP."
      });
    }
    if (/* @__PURE__ */ new Date() > record.expiresAt) {
      otpDb.delete(cleanEmail);
      return res.status(400).json({ success: false, message: "OTP expired." });
    }
    try {
      const isMatch = await import_bcryptjs.default.compare(otp, record.otpHash);
      if (!isMatch) {
        record.attempts += 1;
        otpDb.set(cleanEmail, record);
        return res.status(400).json({
          success: false,
          message: `Invalid OTP. ${5 - record.attempts} attempts remaining.`
        });
      }
      record.verified = true;
      otpDb.delete(cleanEmail);
      let user = userDb.findByEmail(cleanEmail);
      let isNew = false;
      if (!user) {
        isNew = true;
        user = {
          uid: `u_${Date.now()}`,
          email: cleanEmail,
          status: "pending",
          isVerified: false,
          membership: "free",
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        userDb.create(user);
      }
      const token = import_jsonwebtoken.default.sign(
        { uid: user.uid, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
      return res.status(200).json({
        success: true,
        verified: true,
        isNew,
        token,
        user
      });
    } catch (error) {
      console.error("[AuthService] Error verifying OTP:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error occurred while verifying OTP."
      });
    }
  });
  app.post("/api/send-notification", (req, res) => {
    const { title, body, target, targetUserId } = req.body;
    if (!title || !body || !target) {
      return res.status(400).json({ error: "Missing title, body or target parameter" });
    }
    console.log(`[Push Notification Service] Directing broadcast to [${target}]: "${title}" - "${body}"`);
    return res.status(200).json({
      success: true,
      messageId: `fcm_mock_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      dispatched: { title, body, target, targetUserId: targetUserId || "broadcasting" }
    });
  });
  app.get("/api/cms/status", (req, res) => {
    res.json({
      activeAnnouncementsCount: 1,
      bannerSystemStatus: "online"
    });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Dhobi Metromani API] Server listening on http://0.0.0.0:${PORT}`);
  });
}
startServer().catch((error) => {
  console.error("[Dhobi Metromani API] Crash on boot: ", error);
  process.exit(1);
});
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
//# sourceMappingURL=server.cjs.map
