
export function formatCurrencyAmount(
  amount: number | string | undefined,
  currencyCode: string | undefined
): string {
  const parsedAmount = Number(amount ?? 0);
  const numericAmount = Number.isFinite(parsedAmount) ? parsedAmount : 0;

  try {
    if (currencyCode === "NGN") {
      return `₦${new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numericAmount)}`;
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode || "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericAmount);
  } catch {
    if (currencyCode === "NGN") {
      return `₦${numericAmount.toFixed(2)}`;
    }

    return `${numericAmount.toFixed(2)} ${currencyCode ?? ""}`;
  }
}

export function splitCurrencyParts(formatted: string): {
  whole: string;
  decimal: string;
} {
  const [whole, decimal = "00"] = formatted.split(".");
  return { whole, decimal };
}
