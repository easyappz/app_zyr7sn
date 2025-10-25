const webPush = require('web-push');
const PushSubscription = require('@src/models/PushSubscription');

// Hardcoded VAPID keys (demo/test only). Replace with your own keys for production.
const PUBLIC_VAPID_KEY = 'BPIB9JTZF5N3yMFb8y5g8YH0p1QhO9kK-3Hj1ZyZ3zz3bO0bQHk36c7Y6mE0pV2s2Rz9y5x2v3d7Qp7N3mP2m1o';
const PRIVATE_VAPID_KEY = '3Vw0z3J7e7Q8J7lW2cT3y1mZ6fX4bY9dM2pQ1rS0tU2';

webPush.setVapidDetails('mailto:support@easyappz.dev', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

async function sendPush(userId, title, body) {
  const result = { sent: 0, failed: 0, removed: 0 };
  try {
    const subs = await PushSubscription.find({ user: userId }).lean();
    const payload = JSON.stringify({ title, body });

    for (const s of subs) {
      try {
        // Some browsers need TTL to avoid errors in dev environments
        await webPush.sendNotification(s.subscription, payload, { TTL: 30 });
        result.sent += 1;
      } catch (err) {
        result.failed += 1;
        const status = err && (err.statusCode || err.status);
        if (status === 404 || status === 410) {
          try {
            await PushSubscription.deleteOne({ _id: s._id });
            result.removed += 1;
          } catch (removeErr) {
            // ignore remove errors but keep them countable if needed
          }
        }
      }
    }

    return result;
  } catch (error) {
    return result;
  }
}

module.exports = { sendPush, PUBLIC_VAPID_KEY };
