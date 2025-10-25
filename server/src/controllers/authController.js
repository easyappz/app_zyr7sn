const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('@src/models/User');
const OtpCode = require('@src/models/OtpCode');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('@src/config/jwt');

function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '');
}

async function sendOtp(req, res) {
  try {
    const rawPhone = req.body && req.body.phone;
    const phone = normalizePhone(rawPhone);

    if (!phone) {
      return res.status(400).json({ error: { message: 'Phone is required' } });
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const codeHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OtpCode.findOneAndUpdate(
      { phone },
      { codeHash, expiresAt, attempts: 0 },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // demoCode is returned for development only
    return res.json({ success: true, demoCode: code, expiresAt: expiresAt.toISOString() });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message } });
  }
}

async function verifyOtp(req, res) {
  try {
    const rawPhone = req.body && req.body.phone;
    const code = req.body && String(req.body.code || '');
    const phone = normalizePhone(rawPhone);

    if (!phone || !code) {
      return res.status(400).json({ error: { message: 'Phone and code are required' } });
    }

    const otp = await OtpCode.findOne({ phone });
    if (!otp) {
      return res.status(400).json({ error: { message: 'OTP code not found. Please request a new code.' } });
    }

    if (otp.attempts >= 5) {
      return res.status(429).json({ error: { message: 'Too many attempts. Code is blocked. Please request a new code.' } });
    }

    if (otp.expiresAt.getTime() < Date.now()) {
      await OtpCode.deleteOne({ _id: otp._id });
      return res.status(400).json({ error: { message: 'OTP code expired. Please request a new code.' } });
    }

    const isMatch = await bcrypt.compare(code, otp.codeHash);
    if (!isMatch) {
      otp.attempts += 1;
      await otp.save();

      const remaining = Math.max(0, 5 - otp.attempts);
      const msg = remaining > 0
        ? `Invalid code. Attempts left: ${remaining}`
        : 'Too many attempts. Code is blocked. Please request a new code.';

      return res.status(400).json({ error: { message: msg } });
    }

    // Success: delete OTP to prevent reuse
    await OtpCode.deleteOne({ _id: otp._id });

    // Create user if not exists
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({ phone });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.json({ token, user });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message } });
  }
}

async function me(req, res) {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: { message: 'Unauthorized' } });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: { message: 'User not found' } });
    }

    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message } });
  }
}

module.exports = {
  sendOtp,
  verifyOtp,
  me
};
