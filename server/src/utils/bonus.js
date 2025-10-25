function getCashbackPercent(totalSpend) {
  try {
    const spend = Number(totalSpend || 0);
    if (spend >= 20000) return 7;
    if (spend >= 10000) return 5;
    return 3;
  } catch (error) {
    // Return base percent if any unexpected error
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

module.exports = { getCashbackPercent, calcPromoBonusPercent };
