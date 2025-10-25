const { getCashbackPercent } = require('@src/utils/bonus');

async function summary(req, res) {
  try {
    // Assuming auth middleware sets req.user, but bonus values are not yet persisted.
    // Return zeros for now; tierPercent is derived from totalSpend.
    const balance = 0;
    const totalEarned = 0;
    const totalRedeemed = 0;
    const totalSpend = 0;
    const tierPercent = getCashbackPercent(totalSpend);

    res.json({ balance, totalEarned, totalRedeemed, totalSpend, tierPercent });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
}

module.exports = { summary };
