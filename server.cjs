var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server.ts
var server_exports = {};
__export(server_exports, {
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_bcryptjs = __toESM(require("bcryptjs"), 1);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var import_nodemailer = __toESM(require("nodemailer"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_mongoose = __toESM(require("mongoose"), 1);
import_dotenv.default.config();
var PORT = 3e3;
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
    createdAt: "2026-01-15T10:00:00Z",
    idType: "Aadhaar Card",
    idNumber: "9823-1823-1234",
    verificationSelfie: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop",
    governmentIdType: "Aadhaar Card",
    governmentIdUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop"
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
    createdAt: "2026-05-01T10:00:00Z",
    idType: "PAN Card",
    idNumber: "ABCDE1234F",
    verificationSelfie: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    governmentIdType: "PAN Card",
    governmentIdUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=250&fit=crop"
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
var userSchema = new import_mongoose.default.Schema({}, { strict: false });
var User = import_mongoose.default.model("User", userSchema);
var interestSchema = new import_mongoose.default.Schema({}, { strict: false });
var Interest = import_mongoose.default.model("Interest", interestSchema);
var messageSchema = new import_mongoose.default.Schema({}, { strict: false });
var Message = import_mongoose.default.model("Message", messageSchema);
var sessionSchema = new import_mongoose.default.Schema({}, { strict: false });
var Session = import_mongoose.default.model("Session", sessionSchema);
var reportSchema = new import_mongoose.default.Schema({}, { strict: false });
var Report = import_mongoose.default.model("Report", reportSchema);
var auditLogSchema = new import_mongoose.default.Schema({}, { strict: false });
var AuditLog = import_mongoose.default.model("AuditLog", auditLogSchema);
var adminNotificationSchema = new import_mongoose.default.Schema({}, { strict: false });
var AdminNotification = import_mongoose.default.model("AdminNotification", adminNotificationSchema);
var adminSettingsSchema = new import_mongoose.default.Schema({ key: String, value: import_mongoose.default.Schema.Types.Mixed }, { strict: false });
var AdminSettings = import_mongoose.default.model("AdminSettings", adminSettingsSchema);
var MongoUserDb = class {
  async getAll() {
    return await User.find({}).lean();
  }
  async findByEmail(email) {
    return await User.findOne({ email: new RegExp("^" + email + "$", "i") }).lean();
  }
  async findById(uid) {
    return await User.findOne({ uid }).lean();
  }
  async create(user) {
    await User.findOneAndUpdate({ uid: user.uid }, user, { upsert: true, new: true });
  }
  async update(uid, updates) {
    const res = await User.updateOne({ uid }, { $set: updates });
    return res.modifiedCount > 0;
  }
  async delete(uid) {
    const res = await User.deleteOne({ uid });
    if (res.deletedCount > 0) {
      await Interest.deleteMany({ $or: [{ senderId: uid }, { receiverId: uid }] });
      await Message.deleteMany({ $or: [{ senderId: uid }, { receiverId: uid }] });
      await Session.deleteMany({ uid });
      return true;
    }
    return false;
  }
  async getInterests() {
    return await Interest.find({}).lean();
  }
  async createInterest(interest) {
    await Interest.create(interest);
  }
  async updateInterest(id, status) {
    const res = await Interest.updateOne({ id }, { $set: { status } });
    return res.modifiedCount > 0;
  }
  async getMessages() {
    return await Message.find({}).lean();
  }
  async createMessage(message) {
    await Message.create(message);
  }
  async getSessions() {
    return await Session.find({}).lean();
  }
  async createSession(session) {
    await Session.create(session);
  }
  async updateSessionLastUsed(token) {
    await Session.updateOne({ token }, { $set: { lastUsedAt: (/* @__PURE__ */ new Date()).toISOString() } });
  }
  async revokeSession(token) {
    const res = await Session.updateOne({ token }, { $set: { status: "revoked" } });
    return res.modifiedCount > 0;
  }
  async revokeAllSessions(uid) {
    await Session.updateMany({ uid }, { $set: { status: "revoked" } });
  }
  async createReport(report) {
    await Report.create(report);
  }
  async getReports() {
    return await Report.find({}).lean();
  }
  async updateReportStatus(reportId, status) {
    const res = await Report.updateOne({ reportId }, { $set: { status } });
    return res.modifiedCount > 0;
  }
  async addAuditLog(log) {
    await AuditLog.create(log);
  }
  async getAuditLogs() {
    return await AuditLog.find({}).sort({ _id: -1 }).limit(5e3).lean();
  }
  async addNotification(n) {
    await AdminNotification.create(n);
  }
  async getNotifications() {
    return await AdminNotification.find({}).sort({ _id: -1 }).limit(1e3).lean();
  }
  async markNotificationsRead() {
    await AdminNotification.updateMany({}, { $set: { read: true } });
  }
  async getAdminCredentials() {
    const doc = await AdminSettings.findOne({ key: "admin_credentials" }).lean();
    if (doc && doc.value) return doc.value;
    return { email: "admin@dhobimatrimony.com", password: "DhobiMatrimony@Admin#2026!" };
  }
  async setAdminCredentials(email, password) {
    await AdminSettings.findOneAndUpdate({ key: "admin_credentials" }, { value: { email, password } }, { upsert: true });
  }
};
var LocalUserDb = class {
  constructor() {
    this.data = { users: [], interests: [], messages: [], sessions: [], reports: [], auditLogs: [], notifications: [], adminCredentials: null };
    this.load();
  }
  load() {
    try {
      if (import_fs.default.existsSync(DB_FILE)) {
        const fileContent = import_fs.default.readFileSync(DB_FILE, "utf8");
        const parsed = JSON.parse(fileContent);
        if (Array.isArray(parsed)) {
          this.data = { users: parsed, interests: [], messages: [], sessions: [], reports: [], auditLogs: [], notifications: [], adminCredentials: null };
        } else {
          this.data = {
            users: parsed.users || [],
            interests: parsed.interests || [],
            messages: parsed.messages || [],
            sessions: parsed.sessions || [],
            reports: parsed.reports || [],
            auditLogs: parsed.auditLogs || [],
            notifications: parsed.notifications || [],
            adminCredentials: parsed.adminCredentials || null
          };
        }
      } else {
        this.data = { users: [...DEFAULT_USERS], interests: [], messages: [], sessions: [], reports: [], auditLogs: [], notifications: [], adminCredentials: null };
      }
    } catch (err) {
      this.data = { users: [...DEFAULT_USERS], interests: [], messages: [], sessions: [], reports: [], auditLogs: [], notifications: [], adminCredentials: null };
    }
  }
  save() {
    try {
      import_fs.default.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), "utf8");
    } catch (err) {
    }
  }
  async getAll() {
    return this.data.users;
  }
  async findByEmail(email) {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }
  async findById(uid) {
    return this.data.users.find((u) => u.uid === uid);
  }
  async create(user) {
    const index = this.data.users.findIndex((u) => u.uid === user.uid || u.email.toLowerCase() === user.email.toLowerCase());
    if (index !== -1) this.data.users[index] = { ...this.data.users[index], ...user };
    else this.data.users.push(user);
    this.save();
  }
  async update(uid, updates) {
    const index = this.data.users.findIndex((u) => u.uid === uid);
    if (index !== -1) {
      this.data.users[index] = { ...this.data.users[index], ...updates };
      this.save();
      return true;
    }
    return false;
  }
  async delete(uid) {
    const index = this.data.users.findIndex((u) => u.uid === uid);
    if (index !== -1) {
      this.data.users.splice(index, 1);
      this.data.interests = this.data.interests.filter((i) => i.senderId !== uid && i.receiverId !== uid);
      this.data.messages = this.data.messages.filter((m) => m.senderId !== uid && m.receiverId !== uid);
      this.data.sessions = this.data.sessions.filter((s) => s.uid !== uid);
      this.save();
      return true;
    }
    return false;
  }
  async getInterests() {
    return this.data.interests;
  }
  async createInterest(interest) {
    this.data.interests.push(interest);
    this.save();
  }
  async updateInterest(id, status) {
    const index = this.data.interests.findIndex((i) => i.id === id);
    if (index !== -1) {
      this.data.interests[index].status = status;
      this.save();
      return true;
    }
    return false;
  }
  async getMessages() {
    return this.data.messages;
  }
  async createMessage(message) {
    this.data.messages.push(message);
    this.save();
  }
  async getSessions() {
    return this.data.sessions;
  }
  async createSession(session) {
    this.data.sessions.push(session);
    this.save();
  }
  async updateSessionLastUsed(token) {
    const sess = this.data.sessions.find((s) => s.token === token);
    if (sess) {
      sess.lastUsedAt = (/* @__PURE__ */ new Date()).toISOString();
      this.save();
    }
  }
  async revokeSession(token) {
    const sess = this.data.sessions.find((s) => s.token === token);
    if (sess) {
      sess.status = "revoked";
      this.save();
      return true;
    }
    return false;
  }
  async revokeAllSessions(uid) {
    this.data.sessions.forEach((s) => {
      if (s.uid === uid) s.status = "revoked";
    });
    this.save();
  }
  async createReport(report) {
    this.data.reports = this.data.reports || [];
    this.data.reports.push(report);
    this.save();
  }
  async getReports() {
    return this.data.reports || [];
  }
  async updateReportStatus(reportId, status) {
    this.data.reports = this.data.reports || [];
    const index = this.data.reports.findIndex((r) => r.reportId === reportId);
    if (index !== -1) {
      this.data.reports[index].status = status;
      this.save();
      return true;
    }
    return false;
  }
  async addAuditLog(log) {
    this.data.auditLogs = this.data.auditLogs || [];
    this.data.auditLogs.unshift(log);
    if (this.data.auditLogs.length > 5e3) this.data.auditLogs = this.data.auditLogs.slice(0, 5e3);
    this.save();
  }
  async getAuditLogs() {
    return this.data.auditLogs || [];
  }
  async addNotification(n) {
    this.data.notifications = this.data.notifications || [];
    this.data.notifications.unshift(n);
    if (this.data.notifications.length > 1e3) this.data.notifications = this.data.notifications.slice(0, 1e3);
    this.save();
  }
  async getNotifications() {
    return this.data.notifications || [];
  }
  async markNotificationsRead() {
    (this.data.notifications || []).forEach((n) => {
      n.read = true;
    });
    this.save();
  }
  async getAdminCredentials() {
    if (this.data.adminCredentials) return this.data.adminCredentials;
    return { email: "admin@dhobimatrimony.com", password: "DhobiMatrimony@Admin#2026!" };
  }
  async setAdminCredentials(email, password) {
    this.data.adminCredentials = { email, password };
    this.save();
  }
};
var userDb;
if (process.env.MONGODB_URI) {
  import_mongoose.default.connect(process.env.MONGODB_URI).then(async () => {
    console.log("[MongoDB] Connected successfully");
    try {
      await AdminSettings.findOneAndUpdate(
        { key: "admin_credentials" },
        { value: { email: "admin@dhobimatrimony.com", password: "DhobiMatrimony@Admin#2026!" } },
        { upsert: true }
      );
      console.log("[MongoDB] Admin settings synchronized.");
    } catch (e) {
      console.error("[MongoDB] Failed to sync admin credentials:", e);
    }
  }).catch((err) => console.error("[MongoDB] Error:", err));
  userDb = new MongoUserDb();
} else {
  console.log("[UserDb] MONGODB_URI not provided. Falling back to Local JSON database.");
  userDb = new LocalUserDb();
}
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
    this.init();
  }
  init() {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && SMTP_USER !== "test@gmail.com") {
      this.transporter = import_nodemailer.default.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT),
        secure: SMTP_PORT === "465",
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS
        }
      });
      console.log(`[EmailService] Configured Nodemailer SMTP transporter for ${SMTP_USER}.`);
    } else {
      this.transporter = null;
      console.warn("[EmailService] Missing or placeholder SMTP config. Running in Fallback Console mode.");
    }
  }
  reinitTransporter() {
    this.init();
  }
  async sendOtp(email, otp) {
    const from = process.env.SMTP_FROM || "Dhobi Matrimony <dhobimetromany@gmail.com>";
    const subject = "Your Dhobi Matrimony Verification Code";
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Dhobi Matrimony Verification Code</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
            color: #333333;
          }
          .container {
            max-width: 550px;
            background-color: #ffffff;
            margin: 0 auto;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.06);
            border: 1px solid #e2e8f0;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #990000;
            padding-bottom: 15px;
            margin-bottom: 20px;
          }
          .title {
            color: #990000;
            font-family: Georgia, serif;
            font-size: 24px;
            font-weight: bold;
            margin: 0;
          }
          .otp-box {
            background-color: #f7f7f7;
            border: 1px solid #D4AF37;
            border-radius: 6px;
            padding: 15px;
            text-align: center;
            font-size: 30px;
            font-weight: bold;
            letter-spacing: 4px;
            color: #990000;
            margin: 25px 0;
          }
          .footer {
            font-size: 11px;
            color: #888888;
            margin-top: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">Dhobi Matrimony</h1>
          </div>
          <p>Dear Member,</p>
          <p>Your one-time email verification code is:</p>
          <div class="otp-box">${otp}</div>
          <p>This code will expire in 5 minutes. For security reasons, please do not share this verification code with anyone.</p>
          <p>If you did not request this verification code, you can safely ignore this email.</p>
          <div class="footer">
            Best regards,<br>
            <strong>Dhobi Matrimony Security Team</strong><br>
            <span style="font-size: 10px; color: #aaaaaa;">This is an automated transactional security email. Please do not reply.</span>
          </div>
        </div>
      </body>
      </html>
    `;
    if (this.transporter && process.env.SMTP_USER !== "test@gmail.com") {
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
Dhobi Matrimony`,
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
      const browserDir = process.env.BROWSER_DIR || import_path.default.join(process.cwd(), "browser");
      if (!import_fs.default.existsSync(browserDir)) {
        import_fs.default.mkdirSync(browserDir, { recursive: true });
      }
      import_fs.default.writeFileSync(import_path.default.join(browserDir, "otp.txt"), otp, "utf8");
      console.log(`[EmailService] Saved OTP code to browser/otp.txt for verification.`);
    } catch (e) {
      console.error("[EmailService] Failed to write OTP to browser/otp.txt:", e);
    }
    return false;
  }
};
var emailProvider = new NodemailerEmailProvider();
var ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.SMTP_USER || "";
var sendGenericEmail = async (to, subject, html, text) => {
  const transporter = emailProvider.transporter;
  if (transporter && process.env.SMTP_USER && process.env.SMTP_USER !== "test@gmail.com") {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || `Dhobi Matrimony <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
        text
      });
      console.log(`[Email] Sent "${subject}" to ${to}`);
    } catch (err) {
      console.warn(`[Email] Failed to send to ${to}:`, err instanceof Error ? err.message : err);
    }
  } else {
    console.log(`[Email Console] TO: ${to} | SUBJECT: ${subject}`);
  }
};
var sendAdminEmail = (subject, html, text) => {
  if (!ADMIN_EMAIL) return;
  sendGenericEmail(ADMIN_EMAIL, subject, html, text);
};
var sendUserEmail = (userEmail, subject, html, text) => {
  if (!userEmail) return;
  sendGenericEmail(userEmail, subject, html, text);
};
var adminEmailHtml = (title, body) => `
<!DOCTYPE html><html><head><meta charset="utf-8"><style>
body{font-family:'Segoe UI',Arial,sans-serif;background:#f7f7f7;margin:0;padding:20px;}
.c{max-width:550px;background:#fff;margin:0 auto;padding:30px;border-radius:12px;border:1px solid #ddd;}
.h{border-bottom:3px solid #8B0000;padding-bottom:12px;margin-bottom:20px;}
.t{color:#8B0000;font-family:Georgia,serif;font-size:22px;font-weight:bold;margin:0;}
.b{color:#333;font-size:14px;line-height:1.6;}
table{width:100%;border-collapse:collapse;margin:14px 0;}
th{background:#8B000015;color:#8B0000;font-weight:700;padding:8px 12px;text-align:left;font-size:12px;}
td{padding:8px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;}
.footer{font-size:11px;color:#999;margin-top:20px;border-top:1px solid #eee;padding-top:12px;text-align:center;}
</style></head><body>
<div class="c">
  <div class="h"><h1 class="t">\u{1F48D} Dhobi Matrimony \u2014 Admin Alert</h1></div>
  <div class="b"><h3 style="color:#8B0000;">${title}</h3>${body}</div>
  <div class="footer">Dhobi Matrimony Admin System &bull; Auto-generated notification</div>
</div></body></html>`;
var userEmailHtml = (title, body) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 20px;
      color: #333333;
    }
    .c {
      max-width: 550px;
      background: #ffffff;
      margin: 0 auto;
      padding: 30px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .h {
      border-bottom: 2px solid #990000;
      padding-bottom: 12px;
      margin-bottom: 20px;
      text-align: center;
    }
    .t {
      color: #990000;
      font-family: Georgia, serif;
      font-size: 22px;
      font-weight: bold;
      margin: 0;
    }
    .b {
      color: #333333;
      font-size: 14px;
      line-height: 1.6;
    }
    .footer {
      font-size: 11px;
      color: #888888;
      margin-top: 25px;
      border-top: 1px solid #e2e8f0;
      padding-top: 12px;
      text-align: center;
      line-height: 1.5;
    }
  </style>
</head>
<body>
<div class="c">
  <div class="h"><h1 class="t">\u{1F48D} Dhobi Matrimony</h1></div>
  <div class="b"><h3 style="color:#990000; margin-top:0;">${title}</h3>${body}</div>
  <div class="footer">
    You are receiving this security notification because you registered on Dhobi Matrimony.<br>
    Please do not reply directly to this automated transactional email.<br>
    \xA9 2026 Dhobi Matrimony. All rights reserved.
  </div>
</div>
</body>
</html>`;
var sanitizeString = (str) => {
  if (typeof str !== "string") return str;
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
};
var sanitizeUserData = (userData) => {
  const sanitized = { ...userData };
  const textFields = [
    "name",
    "location",
    "about",
    "institute",
    "caste",
    "religion",
    "motherTongue",
    "timeOfBirth",
    "placeOfBirth",
    "rashi",
    "hobbies",
    "fatherName",
    "fatherOccupation",
    "motherName",
    "motherOccupation",
    "contactPerson"
  ];
  textFields.forEach((field) => {
    if (sanitized[field] && typeof sanitized[field] === "string") {
      sanitized[field] = sanitizeString(sanitized[field]);
    }
  });
  return sanitized;
};
var validateBase64Payload = (base64Str, maxMb = 5) => {
  if (!base64Str) return true;
  const mimeRegex = /^data:(image\/(jpeg|png|jpg|gif)|application\/pdf);base64,/;
  if (!mimeRegex.test(base64Str)) {
    return false;
  }
  const commaIndex = base64Str.indexOf(",");
  const rawBase64 = base64Str.substring(commaIndex + 1);
  const sizeInBytes = Math.ceil(rawBase64.length * 3 / 4) - (rawBase64.endsWith("==") ? 2 : rawBase64.endsWith("=") ? 1 : 0);
  if (sizeInBytes > maxMb * 1024 * 1024) {
    return false;
  }
  return true;
};
var isUnder18 = (age, dob) => {
  if (age !== void 0 && age < 18) return true;
  if (dob) {
    const dobDate = new Date(dob);
    const ageDiffMs = Date.now() - dobDate.getTime();
    const ageDate = new Date(ageDiffMs);
    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (calculatedAge < 18) return true;
  }
  return false;
};
var authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Authorization token required." });
  }
  import_jsonwebtoken.default.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid or expired token." });
    }
    const sessions = await userDb.getSessions();
    const activeSession = sessions.find((s) => s.token === token && s.status === "active");
    if (!activeSession) {
      return res.status(403).json({ success: false, message: "Session has been revoked or expired." });
    }
    if (new Date(activeSession.expiresAt) < /* @__PURE__ */ new Date()) {
      await userDb.revokeSession(token);
      return res.status(403).json({ success: false, message: "Session has expired." });
    }
    userDb.updateSessionLastUsed(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      role: decoded.role || "user"
    };
    req.sessionToken = token;
    next();
  });
};
var requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Administrator authorization required." });
  }
  next();
};
var rateLimiterStore = /* @__PURE__ */ new Map();
var apiRateLimiter = (windowMs, maxRequests, message) => {
  return (req, res, next) => {
    const key = req.ip || req.headers["x-forwarded-for"] || "anonymous";
    const now = Date.now();
    const limitRecord = rateLimiterStore.get(key) || { timestamps: [] };
    limitRecord.timestamps = limitRecord.timestamps.filter((ts) => now - ts < windowMs);
    if (limitRecord.timestamps.length >= maxRequests) {
      return res.status(429).json({ success: false, message });
    }
    limitRecord.timestamps.push(now);
    rateLimiterStore.set(key, limitRecord);
    next();
  };
};
async function startServer() {
  const app = (0, import_express.default)();
  app.use(import_express.default.json({ limit: "10mb" }));
  app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://images.unsplash.com 'unsafe-inline' 'unsafe-eval' data:; img-src 'self' data: https://images.unsplash.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; frame-ancestors 'none';");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.setHeader("Permissions-Policy", "camera=(self), microphone=(), geolocation=()");
    next();
  });
  app.get("/api/health", (req, res) => {
    res.json({
      status: "healthy",
      system: "Dhobi Matrimony Admin API",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  });
  app.get("/api/users/me", authenticateToken, (req, res) => {
    const uid = req.user.uid;
    const user = userDb.findById(uid);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    res.json({ success: true, user });
  });
  app.get("/api/users", authenticateToken, (req, res) => {
    const callerId = req.user.uid;
    const callerRole = req.user.role;
    const allUsers = userDb.getAll();
    if (callerRole === "admin") {
      return res.json({ success: true, users: allUsers });
    }
    const callerUser = userDb.findById(callerId);
    const callerBlocked = callerUser?.blockedUsers || [];
    const visibleUsers = allUsers.filter((u) => {
      if (u.uid === callerId) return true;
      if (u.status !== "approved") return false;
      if (callerBlocked.includes(u.uid)) return false;
      if (u.blockedUsers?.includes(callerId)) return false;
      return true;
    });
    const sanitizedUsers = visibleUsers.map((u) => {
      if (u.uid === callerId) {
        return u;
      }
      const activeConsent = userDb.getInterests().some(
        (i) => i.status === "accepted" && (i.senderId === callerId && i.receiverId === u.uid || i.senderId === u.uid && i.receiverId === callerId)
      );
      if (activeConsent) {
        const { idNumber, governmentIdUrl, governmentIdType, idType, verificationSelfie, ...rest } = u;
        return rest;
      } else {
        const { email, phone, whatsapp, socialLinks, idNumber, governmentIdUrl, governmentIdType, idType, verificationSelfie, ...rest } = u;
        return rest;
      }
    });
    res.json({
      success: true,
      users: sanitizedUsers
    });
  });
  app.post("/api/users/register", authenticateToken, (req, res) => {
    const rawUserData = req.body;
    if (!rawUserData.email || !rawUserData.uid) {
      return res.status(400).json({ error: "Missing email or uid" });
    }
    if (req.user.role !== "admin" && req.user.uid !== rawUserData.uid) {
      return res.status(403).json({ error: "Unauthorized profile creation attempt." });
    }
    if (!validateBase64Payload(rawUserData.profilePhoto) || !validateBase64Payload(rawUserData.governmentIdUrl)) {
      return res.status(400).json({ error: "Invalid profile photo or ID scan document type. Supports images/PDFs under 5MB only." });
    }
    if (rawUserData.name && rawUserData.name.length > 80) return res.status(400).json({ error: "Name length exceeds maximum limit." });
    if (rawUserData.about && rawUserData.about.length > 1e3) return res.status(400).json({ error: "About description exceeds maximum limit." });
    if (isUnder18(rawUserData.age, rawUserData.dob)) {
      return res.status(403).json({ error: "You must be at least 18 years old to use this service." });
    }
    const sanitizedUserData = sanitizeUserData(rawUserData);
    userDb.create(sanitizedUserData);
    userDb.addAuditLog({ id: `al_${Date.now()}`, timestamp: (/* @__PURE__ */ new Date()).toISOString(), userId: rawUserData.uid, userEmail: rawUserData.email, action: "PROFILE_REGISTERED", details: `New profile created for ${rawUserData.name || rawUserData.email}`, ip: req.headers["x-forwarded-for"] || req.ip || "unknown" });
    userDb.addNotification({ id: `n_${Date.now()}`, timestamp: (/* @__PURE__ */ new Date()).toISOString(), type: "new_registration", userId: rawUserData.uid, userName: rawUserData.name || rawUserData.email, userEmail: rawUserData.email, summary: `New registration: ${rawUserData.name || rawUserData.email}`, details: `Gender: ${rawUserData.gender || "N/A"} | Age: ${rawUserData.age || "N/A"} | Location: ${rawUserData.location || "N/A"}`, read: false });
    sendAdminEmail(
      `\u{1F195} New Profile Registration \u2014 ${rawUserData.name || rawUserData.email}`,
      adminEmailHtml("New User Registered", `<p>A new profile has been submitted and is awaiting your approval.</p><table><tr><th>Field</th><th>Value</th></tr><tr><td>Name</td><td>${rawUserData.name || "N/A"}</td></tr><tr><td>Email</td><td>${rawUserData.email}</td></tr><tr><td>Gender</td><td>${rawUserData.gender || "N/A"}</td></tr><tr><td>Age</td><td>${rawUserData.age || "N/A"}</td></tr><tr><td>Location</td><td>${rawUserData.location || "N/A"}</td></tr><tr><td>Submitted At</td><td>${(/* @__PURE__ */ new Date()).toLocaleString("en-IN")}</td></tr></table><p>Please log in to the admin panel to review and approve this profile.</p>`),
      `New registration: ${rawUserData.name || rawUserData.email} (${rawUserData.email}) at ${(/* @__PURE__ */ new Date()).toLocaleString("en-IN")}`
    );
    sendUserEmail(
      rawUserData.email,
      "\u2705 Your Profile Has Been Submitted \u2014 Dhobi Matrimony",
      userEmailHtml("Profile Submitted Successfully!", `<p>Dear ${rawUserData.name || "Candidate"},</p><p>Your profile has been successfully submitted on <strong>Dhobi Matrimony</strong>. Our team will review your profile and verify your documents.</p><p style="background:#fef9c3;padding:12px;border-radius:8px;">\u23F3 Verification may take <strong>24\u201348 hours</strong>. You will receive an email once your profile is approved.</p><p>While waiting, you can log in to view your profile status at any time.</p>`),
      `Your profile has been submitted. Verification may take 24-48 hours. You will be notified once approved.`
    );
    res.json({ success: true, user: sanitizedUserData });
  });
  app.post("/api/users/update", authenticateToken, (req, res) => {
    const { uid, updates, changedFields } = req.body;
    if (!uid || !updates) {
      return res.status(400).json({ error: "Missing uid or updates" });
    }
    if (req.user.role !== "admin" && req.user.uid !== uid) {
      return res.status(403).json({ error: "Access denied. You can only update your own profile." });
    }
    if (updates.profilePhoto && !validateBase64Payload(updates.profilePhoto)) {
      return res.status(400).json({ error: "Invalid profile photo file type. Supports images under 5MB only." });
    }
    if (updates.governmentIdUrl && !validateBase64Payload(updates.governmentIdUrl)) {
      return res.status(400).json({ error: "Invalid document upload. Supports images/PDFs under 5MB only." });
    }
    if (isUnder18(updates.age, updates.dob)) {
      return res.status(403).json({ error: "You must be at least 18 years old to use this service." });
    }
    const sanitizedUpdates = sanitizeUserData(updates);
    const targetUser = userDb.findById(uid);
    const updated = userDb.update(uid, sanitizedUpdates);
    if (updates.status === "blocked") {
      userDb.revokeAllSessions(uid);
    }
    if (updated && targetUser) {
      const actionBy = req.user.role === "admin" ? "admin" : "user";
      const isUserSelfEdit = actionBy === "user";
      const fieldsDesc = changedFields ? changedFields.map((f) => `${f.field}: "${f.oldValue}" \u2192 "${f.newValue}"`).join(", ") : Object.keys(updates).filter((k) => k !== "updatedAt").join(", ");
      userDb.addAuditLog({ id: `al_${Date.now()}`, timestamp: (/* @__PURE__ */ new Date()).toISOString(), userId: uid, userEmail: targetUser.email, action: isUserSelfEdit ? "PROFILE_UPDATED_BY_USER" : "PROFILE_UPDATED_BY_ADMIN", details: fieldsDesc, ip: req.headers["x-forwarded-for"] || req.ip || "unknown" });
      if (isUserSelfEdit && changedFields && changedFields.length > 0) {
        const changedSummary = changedFields.map((f) => `${f.field} changed from "${f.oldValue}" to "${f.newValue}"`).join("\n");
        userDb.addNotification({ id: `n_${Date.now()}`, timestamp: (/* @__PURE__ */ new Date()).toISOString(), type: "profile_update", userId: uid, userName: targetUser.name || targetUser.email, userEmail: targetUser.email, summary: `Profile updated by ${targetUser.name || targetUser.email}`, details: changedSummary, read: false, changedFields });
        const tableRows = changedFields.map((f) => `<tr><td><strong>${f.field}</strong></td><td style="color:#cc0000;">${f.oldValue || "(empty)"}</td><td style="color:#006600;">${f.newValue || "(empty)"}</td></tr>`).join("");
        sendAdminEmail(
          `\u270F\uFE0F Profile Updated \u2014 ${targetUser.name || targetUser.email}`,
          adminEmailHtml("User Profile Update Alert", `<p>A user has updated their profile. Details below:</p><table><tr><th>Field</th><th>Previous Value</th><th>New Value</th></tr>${tableRows}</table><table><tr><th>User</th><th>ID</th><th>Email</th><th>Date & Time</th></tr><tr><td>${targetUser.name || "N/A"}</td><td>${uid}</td><td>${targetUser.email}</td><td>${(/* @__PURE__ */ new Date()).toLocaleString("en-IN")}</td></tr></table>`),
          `Profile updated by ${targetUser.name || targetUser.email} (${uid}) at ${(/* @__PURE__ */ new Date()).toLocaleString("en-IN")}. Changes: ${fieldsDesc}`
        );
        sendUserEmail(
          targetUser.email,
          "\u270F\uFE0F Your Profile Has Been Updated \u2014 Dhobi Matrimony",
          userEmailHtml("Profile Updated", `<p>Dear ${targetUser.name || "User"},</p><p>Your profile has been updated successfully. The changes will be reviewed by our admin team.</p><p style="font-size:12px;color:#666;">If you did not make these changes, please contact us immediately.</p>`),
          `Your profile has been updated. Changes: ${fieldsDesc}`
        );
      }
      if (req.user.role === "admin" && updates.status === "approved") {
        sendUserEmail(
          targetUser.email,
          "\u{1F389} Your Profile Has Been Approved! \u2014 Dhobi Matrimony",
          userEmailHtml("Profile Approved!", `<p>Dear ${targetUser.name || "User"},</p><p>Congratulations! \u{1F389} Your profile on <strong>Dhobi Matrimony</strong> has been <strong style="color:#006600;">approved and verified</strong>.</p><p>You can now log in and browse potential matches from the Dhobi community.</p>`),
          `Your profile has been approved! You can now log in and find matches.`
        );
      } else if (req.user.role === "admin" && updates.status === "blocked") {
        sendUserEmail(
          targetUser.email,
          "Your Profile Status Has Changed \u2014 Dhobi Matrimony",
          userEmailHtml("Profile Status Update", `<p>Dear ${targetUser.name || "User"},</p><p>Your profile status has been updated by our admin team. Please contact support for more information.</p>`),
          `Your profile status has been updated. Please contact support.`
        );
      }
    }
    res.json({ success: updated });
  });
  app.post("/api/users/delete", authenticateToken, (req, res) => {
    const { uid } = req.body;
    if (!uid) {
      return res.status(400).json({ error: "Missing uid" });
    }
    if (req.user.role !== "admin" && req.user.uid !== uid) {
      return res.status(403).json({ error: "Access denied. You can only delete your own profile." });
    }
    const deleted = userDb.delete(uid);
    res.json({ success: deleted });
  });
  app.post("/api/admin/save-smtp", authenticateToken, requireAdmin, (req, res) => {
    const { smtpUser, smtpPass } = req.body;
    if (!smtpUser || !smtpPass) {
      return res.status(400).json({ error: "Gmail address and App Password are required." });
    }
    try {
      const envPath = import_path.default.join(process.cwd(), ".env");
      const envLocalPath = import_path.default.join(process.cwd(), ".env.local");
      let envContent = "";
      if (import_fs.default.existsSync(envPath)) {
        envContent = import_fs.default.readFileSync(envPath, "utf8");
      } else {
        envContent = `GEMINI_API_KEY="MY_GEMINI_API_KEY"
APP_URL="MY_APP_URL"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM=""
JWT_SECRET="d5b2c9e7a8f103b4c6e9a8d2f1c3e5a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3"
`;
      }
      const lines = envContent.split(/\r?\n/);
      const existingKeys = /* @__PURE__ */ new Set();
      const newLines = lines.map((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith("#") || !trimmed.includes("=")) {
          return line;
        }
        const eqIdx = trimmed.indexOf("=");
        const key = trimmed.substring(0, eqIdx).trim();
        existingKeys.add(key);
        if (key === "SMTP_USER") {
          return `SMTP_USER="${smtpUser}"`;
        }
        if (key === "SMTP_PASS") {
          return `SMTP_PASS="${smtpPass}"`;
        }
        if (key === "SMTP_FROM") {
          return `SMTP_FROM="Dhobi Matrimony <${smtpUser}>"`;
        }
        return line;
      });
      if (!existingKeys.has("SMTP_USER")) {
        newLines.push(`SMTP_USER="${smtpUser}"`);
      }
      if (!existingKeys.has("SMTP_PASS")) {
        newLines.push(`SMTP_PASS="${smtpPass}"`);
      }
      if (!existingKeys.has("SMTP_FROM")) {
        newLines.push(`SMTP_FROM="Dhobi Matrimony <${smtpUser}>"`);
      }
      envContent = newLines.join("\n");
      import_fs.default.writeFileSync(envPath, envContent, "utf8");
      import_fs.default.writeFileSync(envLocalPath, envContent, "utf8");
      process.env.SMTP_USER = smtpUser;
      process.env.SMTP_PASS = smtpPass;
      process.env.SMTP_FROM = `Dhobi Matrimony <${smtpUser}>`;
      emailProvider.reinitTransporter();
      console.log(`[EmailService] Dynamically updated SMTP credentials for ${smtpUser}.`);
      res.json({ success: true });
    } catch (err) {
      console.error("[EmailService] Error updating SMTP credentials:", err);
      res.status(500).json({ error: "Failed to update SMTP configurations." });
    }
  });
  app.post("/api/auth/admin-login", apiRateLimiter(15 * 60 * 1e3, 5, "Too many login attempts. Please wait 15 minutes."), async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }
    const adminCreds = await userDb.getAdminCredentials();
    if (email.trim().toLowerCase() === adminCreds.email.toLowerCase() && password === adminCreds.password) {
      const token = import_jsonwebtoken.default.sign(
        { uid: "admin", email: "admin@dhobimetromani.com", role: "admin" },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
      const now = /* @__PURE__ */ new Date();
      userDb.createSession({
        id: `sess_admin_${Date.now()}`,
        uid: "admin",
        token,
        deviceInfo: req.headers["user-agent"] || "Unknown Admin Device",
        ip: req.ip || req.headers["x-forwarded-for"] || "127.0.0.1",
        status: "active",
        createdAt: now.toISOString(),
        expiresAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1e3).toISOString(),
        lastUsedAt: now.toISOString()
      });
      return res.json({
        success: true,
        token,
        user: { uid: "admin", name: "Admin", isAdmin: true }
      });
    }
    res.status(401).json({ success: false, message: "Invalid admin credentials." });
  });
  app.post("/api/auth/admin-forgot-password-otp", apiRateLimiter(5 * 60 * 1e3, 3, "Too many OTP requests. Please wait a few minutes."), async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required." });
    const adminCreds = await userDb.getAdminCredentials();
    if (email.trim().toLowerCase() !== adminCreds.email.toLowerCase()) {
      return res.status(400).json({ error: "Invalid admin email." });
    }
    const otp = Math.floor(1e5 + Math.random() * 9e5).toString();
    otpDb.set(email.toLowerCase(), { otp, expiresAt: new Date(Date.now() + 5 * 60 * 1e3) });
    const emailSent = await emailProvider.sendEmail(
      email,
      "Dhobi Metromany - Admin Password Reset OTP",
      `Your OTP for resetting the Admin Password is: ${otp}

This OTP is valid for 5 minutes. If you did not request this, please ignore this email.`
    );
    if (emailSent) {
      res.json({ success: true, message: "OTP sent to your admin email." });
    } else {
      res.status(500).json({ error: "Failed to send OTP. Check SMTP settings." });
    }
  });
  app.post("/api/auth/admin-reset-password", async (req, res) => {
    const { email, otp, newEmail, newPassword } = req.body;
    if (!email || !otp || !newEmail || !newPassword) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const record = otpDb.get(email.toLowerCase());
    if (!record || record.otp !== otp || record.expiresAt < /* @__PURE__ */ new Date()) {
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }
    await userDb.setAdminCredentials(newEmail.trim(), newPassword);
    otpDb.delete(email.toLowerCase());
    res.json({ success: true, message: "Admin credentials updated successfully." });
  });
  app.get("/api/auth/me", authenticateToken, (req, res) => {
    const user = userDb.findById(req.user.uid);
    if (!user) {
      if (req.user.uid === "admin") {
        return res.json({ success: true, user: { uid: "admin", name: "Admin", isAdmin: true, status: "approved" } });
      }
      return res.status(404).json({ success: false, message: "Candidate profile not found." });
    }
    res.json({ success: true, user });
  });
  app.post("/api/auth/logout", authenticateToken, (req, res) => {
    userDb.revokeSession(req.sessionToken);
    res.json({ success: true, message: "Logged out successfully." });
  });
  app.post("/api/auth/logout-all", authenticateToken, (req, res) => {
    userDb.revokeAllSessions(req.user.uid);
    res.json({ success: true, message: "Revoked all active sessions successfully." });
  });
  app.post("/api/auth/send-otp", apiRateLimiter(5 * 60 * 1e3, 5, "Too many OTP requests. Please wait a few minutes."), async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email address is required." });
    }
    const cleanEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ success: false, message: "Invalid email address format." });
    }
    const now = Date.now();
    const tenMinutesAgo = now - 10 * 60 * 1e3;
    const requests = otpRequests.get(cleanEmail) || [];
    const recentRequests = requests.filter((ts) => ts > tenMinutesAgo);
    if (recentRequests.length >= 3) {
      return res.status(429).json({
        success: false,
        message: "Too many OTP requests. Please wait 10 minutes before trying again."
      });
    }
    if (recentRequests.length > 0) {
      const lastRequest = recentRequests[recentRequests.length - 1];
      if (now - lastRequest < 60 * 1e3) {
        return res.status(429).json({
          success: false,
          message: "Please wait 60 seconds before requesting a new OTP code."
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
      const emailSent = await emailProvider.sendOtp(cleanEmail, otp);
      const isDebug = !process.env.SMTP_USER || process.env.SMTP_USER === "test@gmail.com" || process.env.SMTP_USER.includes("your-email") || !emailSent;
      return res.status(200).json({
        success: true,
        message: emailSent ? "OTP sent successfully" : "OTP generated (Email delivery failed, returned in response for testing)",
        otp: isDebug ? otp : void 0
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
    const { email, otp, rememberMe } = req.body;
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
      return res.status(400).json({ success: false, message: "OTP code has expired." });
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
      if (user.status === "blocked") {
        return res.status(403).json({ success: false, message: "This account has been disabled/blocked by an administrator." });
      }
      if (isUnder18(user.age, user.dob)) {
        return res.status(403).json({ success: false, message: "You must be at least 18 years old to use this service." });
      }
      const tokenExpiry = rememberMe ? "30d" : "24h";
      const token = import_jsonwebtoken.default.sign(
        { uid: user.uid, email: user.email, role: "user" },
        JWT_SECRET,
        { expiresIn: tokenExpiry }
      );
      const now = /* @__PURE__ */ new Date();
      const sessionDurationMs = rememberMe ? 30 * 24 * 60 * 60 * 1e3 : 24 * 60 * 60 * 1e3;
      userDb.createSession({
        id: `sess_${Date.now()}`,
        uid: user.uid,
        token,
        deviceInfo: req.headers["user-agent"] || "Unknown Candidate Device",
        ip: req.ip || req.headers["x-forwarded-for"] || "127.0.0.1",
        status: "active",
        createdAt: now.toISOString(),
        expiresAt: new Date(now.getTime() + sessionDurationMs).toISOString(),
        lastUsedAt: now.toISOString()
      });
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
  app.post("/api/interests/send", authenticateToken, (req, res) => {
    const { receiverId } = req.body;
    const senderId = req.user.uid;
    if (!receiverId) {
      return res.status(400).json({ error: "Receiver ID is required." });
    }
    if (senderId === receiverId) {
      return res.status(400).json({ error: "You cannot send an interest request to yourself." });
    }
    const receiver = userDb.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ error: "Target user profile not found." });
    }
    const callerUser = userDb.findById(senderId);
    if (callerUser?.blockedUsers?.includes(receiverId) || receiver.blockedUsers?.includes(senderId)) {
      return res.status(400).json({ error: "Cannot send interest request. One of the users has blocked the other." });
    }
    const existing = userDb.getInterests().find(
      (i) => i.senderId === senderId && i.receiverId === receiverId || i.senderId === receiverId && i.receiverId === senderId
    );
    if (existing) {
      return res.status(400).json({ error: `An interest request already exists with status: ${existing.status}` });
    }
    const interest = {
      id: `int_${Date.now()}`,
      senderId,
      receiverId,
      status: "pending",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    userDb.createInterest(interest);
    res.json({ success: true, interest });
  });
  app.post("/api/interests/respond", authenticateToken, (req, res) => {
    const { interestId, status } = req.body;
    const callerId = req.user.uid;
    if (!interestId || !["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Missing interestId or invalid response status." });
    }
    const interest = userDb.getInterests().find((i) => i.id === interestId);
    if (!interest) {
      return res.status(404).json({ error: "Interest request record not found." });
    }
    if (interest.receiverId !== callerId) {
      return res.status(403).json({ error: "Permission denied. Only the recipient can respond to this request." });
    }
    const success = userDb.updateInterest(interestId, status);
    res.json({ success, status });
  });
  app.get("/api/interests/my", authenticateToken, (req, res) => {
    const callerId = req.user.uid;
    const interests = userDb.getInterests().filter((i) => i.senderId === callerId || i.receiverId === callerId);
    res.json({ success: true, interests });
  });
  app.get("/api/messages", authenticateToken, (req, res) => {
    const { otherId } = req.query;
    const callerId = req.user.uid;
    if (!otherId || typeof otherId !== "string") {
      return res.status(400).json({ error: "Target query parameter otherId is required." });
    }
    const activeConsent = userDb.getInterests().some(
      (i) => i.status === "accepted" && (i.senderId === callerId && i.receiverId === otherId || i.senderId === otherId && i.receiverId === callerId)
    );
    const callerUser = userDb.findById(callerId);
    const otherUser = userDb.findById(otherId);
    if (callerUser?.blockedUsers?.includes(otherId) || otherUser?.blockedUsers?.includes(callerId)) {
      return res.status(403).json({ error: "Chat locked. One of the users has blocked the other." });
    }
    if (!activeConsent && req.user.role !== "admin") {
      return res.status(403).json({ error: "Chat locked. You cannot retrieve messages until both users accept mutual interest." });
    }
    const chatHistory = userDb.getMessages().filter(
      (m) => m.senderId === callerId && m.receiverId === otherId || m.senderId === otherId && m.receiverId === callerId
    );
    res.json({ success: true, messages: chatHistory });
  });
  app.post("/api/messages", authenticateToken, (req, res) => {
    const { receiverId, text } = req.body;
    const senderId = req.user.uid;
    if (!receiverId || !text) {
      return res.status(400).json({ error: "Missing receiverId or message text." });
    }
    const activeConsent = userDb.getInterests().some(
      (i) => i.status === "accepted" && (i.senderId === senderId && i.receiverId === receiverId || i.senderId === receiverId && i.receiverId === senderId)
    );
    const callerUser = userDb.findById(senderId);
    const otherUser = userDb.findById(receiverId);
    if (callerUser?.blockedUsers?.includes(receiverId) || otherUser?.blockedUsers?.includes(senderId)) {
      return res.status(403).json({ error: "Chat locked. One of the users has blocked the other." });
    }
    if (!activeConsent) {
      return res.status(403).json({ error: "Chat locked. Messaging is restricted until interest request is mutually accepted." });
    }
    const sanitizedText = sanitizeString(text);
    const message = {
      id: `msg_${Date.now()}`,
      senderId,
      receiverId,
      text: sanitizedText,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    };
    userDb.createMessage(message);
  });
  app.post("/api/users/block", authenticateToken, (req, res) => {
    const { targetUserId } = req.body;
    const callerId = req.user.uid;
    if (!targetUserId) {
      return res.status(400).json({ error: "Target User ID is required." });
    }
    const caller = userDb.findById(callerId);
    if (!caller) {
      return res.status(404).json({ error: "Caller profile not found." });
    }
    const blockedUsers = caller.blockedUsers || [];
    let isBlocked = false;
    if (blockedUsers.includes(targetUserId)) {
      caller.blockedUsers = blockedUsers.filter((id) => id !== targetUserId);
    } else {
      caller.blockedUsers = [...blockedUsers, targetUserId];
      isBlocked = true;
      const interests = userDb.getInterests();
      const interest = interests.find(
        (i) => i.senderId === callerId && i.receiverId === targetUserId || i.senderId === targetUserId && i.receiverId === callerId
      );
      if (interest) {
        userDb.updateInterest(interest.id, "rejected");
      }
    }
    userDb.update(callerId, { blockedUsers: caller.blockedUsers });
    res.json({ success: true, isBlocked, blockedUsers: caller.blockedUsers });
  });
  app.post("/api/users/mute", authenticateToken, (req, res) => {
    const { targetUserId } = req.body;
    const callerId = req.user.uid;
    if (!targetUserId) {
      return res.status(400).json({ error: "Target User ID is required." });
    }
    const caller = userDb.findById(callerId);
    if (!caller) {
      return res.status(404).json({ error: "Caller profile not found." });
    }
    const mutedUsers = caller.mutedUsers || [];
    let isMuted = false;
    if (mutedUsers.includes(targetUserId)) {
      caller.mutedUsers = mutedUsers.filter((id) => id !== targetUserId);
    } else {
      caller.mutedUsers = [...mutedUsers, targetUserId];
      isMuted = true;
    }
    userDb.update(callerId, { mutedUsers: caller.mutedUsers });
    res.json({ success: true, isMuted, mutedUsers: caller.mutedUsers });
  });
  app.post("/api/interests/unmatch", authenticateToken, (req, res) => {
    const { targetUserId } = req.body;
    const callerId = req.user.uid;
    if (!targetUserId) {
      return res.status(400).json({ error: "Target User ID is required." });
    }
    const interest = userDb.getInterests().find(
      (i) => i.senderId === callerId && i.receiverId === targetUserId || i.senderId === targetUserId && i.receiverId === callerId
    );
    if (!interest) {
      return res.status(404).json({ error: "No active connection found with this user." });
    }
    const success = userDb.updateInterest(interest.id, "rejected");
    res.json({ success, status: "rejected" });
  });
  app.post("/api/reports/create", authenticateToken, (req, res) => {
    const { reportedUserId, type, details } = req.body;
    const reporterId = req.user.uid;
    if (!reportedUserId || !type || !details) {
      return res.status(400).json({ error: "Reported User ID, type, and details are required." });
    }
    const report = {
      reportId: `rep_${Date.now()}`,
      reporterId,
      reportedUserId,
      type: sanitizeString(type),
      details: sanitizeString(details),
      status: "pending",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    userDb.createReport(report);
    res.json({ success: true, report });
  });
  app.get("/api/admin/stats", authenticateToken, requireAdmin, (req, res) => {
    const allUsers = userDb.getAll();
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const stats = {
      total: allUsers.length,
      approved: allUsers.filter((u) => u.status === "approved").length,
      pending: allUsers.filter((u) => u.status === "pending").length,
      rejected: allUsers.filter((u) => u.status === "rejected" || u.status === "blocked").length,
      todayRegistrations: allUsers.filter((u) => u.createdAt && u.createdAt.startsWith(today)).length,
      premiumMembers: allUsers.filter((u) => u.membership === "premium").length,
      males: allUsers.filter((u) => u.gender === "male").length,
      females: allUsers.filter((u) => u.gender === "female").length
    };
    res.json({ success: true, stats });
  });
  app.get("/api/admin/notifications", authenticateToken, requireAdmin, (req, res) => {
    const notifications = userDb.getNotifications();
    const unreadCount = notifications.filter((n) => !n.read).length;
    res.json({ success: true, notifications, unreadCount });
  });
  app.post("/api/admin/notifications/mark-read", authenticateToken, requireAdmin, (req, res) => {
    userDb.markNotificationsRead();
    res.json({ success: true });
  });
  app.get("/api/admin/audit-logs", authenticateToken, requireAdmin, (req, res) => {
    const logs = userDb.getAuditLogs();
    res.json({ success: true, logs });
  });
  app.get("/api/admin/interests", authenticateToken, requireAdmin, (req, res) => {
    const interests = userDb.getInterests();
    const allUsers = userDb.getAll();
    const expanded = interests.map((i) => {
      const sender = allUsers.find((u) => u.uid === i.senderId);
      const receiver = allUsers.find((u) => u.uid === i.receiverId);
      return {
        ...i,
        senderName: sender?.name || "Unknown",
        senderEmail: sender?.email || "",
        receiverName: receiver?.name || "Unknown",
        receiverEmail: receiver?.email || ""
      };
    });
    res.json({ success: true, interests: expanded });
  });
  app.get("/api/admin/reports", authenticateToken, requireAdmin, (req, res) => {
    const reports = userDb.getReports();
    const allUsers = userDb.getAll();
    const expanded = reports.map((r) => {
      const reporter = allUsers.find((u) => u.uid === r.reporterId);
      const reported = allUsers.find((u) => u.uid === r.reportedUserId);
      return {
        ...r,
        reporterName: reporter?.name || "Unknown",
        reporterEmail: reporter?.email || "",
        reportedName: reported?.name || "Unknown",
        reportedEmail: reported?.email || "",
        reportedStatus: reported?.status || "approved"
      };
    });
    res.json({ success: true, reports: expanded });
  });
  app.post("/api/admin/reports/resolve", authenticateToken, requireAdmin, (req, res) => {
    const { reportId, status } = req.body;
    if (!reportId || !["pending", "resolved", "dismissed"].includes(status)) {
      return res.status(400).json({ error: "Missing reportId or invalid resolution status." });
    }
    const success = userDb.updateReportStatus(reportId, status);
    res.json({ success });
  });
  app.get("/api/admin/chats", authenticateToken, requireAdmin, (req, res) => {
    const messages = userDb.getMessages();
    const allUsers = userDb.getAll();
    const conversationsMap = /* @__PURE__ */ new Map();
    messages.forEach((m) => {
      const pair = [m.senderId, m.receiverId].sort();
      const key = pair.join("_");
      const existing = conversationsMap.get(key);
      if (existing) {
        existing.messagesCount += 1;
        existing.lastMessage = m.text;
        existing.lastTimestamp = m.timestamp;
      } else {
        conversationsMap.set(key, {
          participants: pair,
          messagesCount: 1,
          lastMessage: m.text,
          lastTimestamp: m.timestamp
        });
      }
    });
    const chatsList = Array.from(conversationsMap.values()).map((c) => {
      const u1 = allUsers.find((u) => u.uid === c.participants[0]);
      const u2 = allUsers.find((u) => u.uid === c.participants[1]);
      return {
        user1Name: u1?.name || "Unknown",
        user1Email: u1?.email || "",
        user2Name: u2?.name || "Unknown",
        user2Email: u2?.email || "",
        messagesCount: c.messagesCount,
        lastMessage: c.lastMessage,
        lastTimestamp: c.lastTimestamp
      };
    });
    res.json({ success: true, chats: chatsList });
  });
  app.get("/api/admin/sessions", authenticateToken, requireAdmin, async (req, res) => {
    const sessions = await userDb.getSessions();
    res.json({ success: true, sessions });
  });
  app.post("/api/admin/sessions/revoke", authenticateToken, requireAdmin, (req, res) => {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: "Missing token parameter to revoke." });
    }
    const revoked = userDb.revokeSession(token);
    res.json({ success: revoked });
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
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        allowedHosts: true
      },
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
  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`[Dhobi Metromani API] Server listening on http://0.0.0.0:${PORT}`);
    });
  }
  return app;
}
var appPromise = startServer().catch((error) => {
  console.error("[Dhobi Metromani API] Crash on boot: ", error);
  process.exit(1);
});
async function server_default(req, res) {
  const app = await appPromise;
  app(req, res);
}
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
//# sourceMappingURL=server.cjs.map
