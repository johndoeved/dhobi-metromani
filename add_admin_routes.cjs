const fs = require('fs');

let content = fs.readFileSync('server.ts', 'utf8');

// Update admin-login
content = content.replace(
  `    if (email.trim().toLowerCase() === "admin@dhobimetromani.com" && password === "DhobiMetromani@Admin#2026!") {`,
  `    const adminCreds = await userDb.getAdminCredentials();
    if (email.trim().toLowerCase() === adminCreds.email.toLowerCase() && password === adminCreds.password) {`
);

// Append new endpoints before the end of the file or after auth routes.
const newRoutes = `
  // Admin Forgot Password - Send OTP
  app.post('/api/auth/admin-forgot-password-otp', apiRateLimiter(5 * 60 * 1000, 3, 'Too many OTP requests. Please wait a few minutes.'), async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });
    
    const adminCreds = await userDb.getAdminCredentials();
    if (email.trim().toLowerCase() !== adminCreds.email.toLowerCase()) {
      // Return a vague message for security, or just success so they don't brute force emails
      return res.status(400).json({ error: 'Invalid admin email.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpDb.set(email.toLowerCase(), { otp, expiresAt: new Date(Date.now() + 5 * 60 * 1000) });

    const emailSent = await emailProvider.sendEmail(
      email,
      'Dhobi Metromany - Admin Password Reset OTP',
      \`Your OTP for resetting the Admin Password is: \${otp}\\n\\nThis OTP is valid for 5 minutes. If you did not request this, please ignore this email.\`
    );

    if (emailSent) {
      res.json({ success: true, message: 'OTP sent to your admin email.' });
    } else {
      res.status(500).json({ error: 'Failed to send OTP. Check SMTP settings.' });
    }
  });

  // Admin Forgot Password - Verify OTP and Reset
  app.post('/api/auth/admin-reset-password', async (req, res) => {
    const { email, otp, newEmail, newPassword } = req.body;
    if (!email || !otp || !newEmail || !newPassword) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const record = otpDb.get(email.toLowerCase());
    if (!record || record.otp !== otp || record.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired OTP.' });
    }

    await userDb.setAdminCredentials(newEmail.trim(), newPassword);
    otpDb.delete(email.toLowerCase());

    res.json({ success: true, message: 'Admin credentials updated successfully.' });
  });
`;

content = content.replace(`app.get('/api/auth/me',`, newRoutes + `\n  app.get('/api/auth/me',`);

fs.writeFileSync('server.ts', content, 'utf8');
console.log('Added admin routes and updated admin-login in server.ts');
