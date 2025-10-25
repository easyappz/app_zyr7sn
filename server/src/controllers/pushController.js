const PushSubscription = require('@src/models/PushSubscription');
const { PUBLIC_VAPID_KEY } = require('@src/utils/push');

async function subscribe(req, res) {
  try {
    const userId = req.userId;
    const { subscription } = req.body || {};

    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ error: { message: 'subscription with endpoint is required' } });
    }

    const existing = await PushSubscription.findOne({ 'subscription.endpoint': subscription.endpoint });
    if (existing) {
      existing.user = userId;
      existing.subscription = subscription;
      await existing.save();
      return res.json({ ok: true, updated: true });
    }

    const sub = new PushSubscription({ user: userId, subscription });
    await sub.save();
    return res.status(201).json({ ok: true, created: true });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message } });
  }
}

async function publicKey(req, res) {
  try {
    return res.json({ publicKey: PUBLIC_VAPID_KEY });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message } });
  }
}

module.exports = { subscribe, publicKey };
