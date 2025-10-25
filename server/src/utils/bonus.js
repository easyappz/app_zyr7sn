function getCashbackPercent(totalSpend) {
  try {
    const spend = Number(totalSpend || 0);
    if (spend >= 20000) return 7;
    if (spend >= 10000) return 5;
    return 3;
  } catch (error) {
    return 3;
  }
}

function calcPromoBonusPercent(items) {
  try {
    if (!Array.isArray(items)) return 0;
    return items.reduce((sum, item) => {
      if (item && item.isPromo) {
        const bonus = Number(item.promoBonusPercent || 0);
        return sum + (Number.isNaN(bonus) ? 0 : bonus);
      }
      return sum;
    }, 0);
  } catch (error) {
    return 0;
  }
}

function toMoney(n) {
  const num = Number(n || 0);
  return Math.round(num * 100) / 100;
}

// itemsForCashback: Array<{ lineTotal: number, isPromo?: boolean, promoBonusPercent?: number }>
function calcCashbackEarned(userTotalSpendBefore, itemsForCashback, subtotal) {
  try {
    const basePercent = Number(getCashbackPercent(userTotalSpendBefore));
    if (!Array.isArray(itemsForCashback) || !itemsForCashback.length) return 0;

    let earned = 0;
    for (const it of itemsForCashback) {
      const lineTotal = Number(it.lineTotal || 0);
      const extra = it && it.isPromo ? Number(it.promoBonusPercent || 0) : 0;
      const linePercent = basePercent + (Number.isNaN(extra) ? 0 : extra);
      earned += lineTotal * (linePercent / 100);
    }

    // Safety cap: cashback cannot exceed 50% of subtotal (business safeguard)
    const capped = Math.min(earned, Number(subtotal || 0) * 0.5);
    return toMoney(capped);
  } catch (error) {
    return 0;
  }
}

module.exports = { getCashbackPercent, calcPromoBonusPercent, calcCashbackEarned };
