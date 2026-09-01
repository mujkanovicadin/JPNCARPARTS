export function formatMoney(minorUnits: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  }).format(minorUnits / 100);
}

export function sumMinorUnits(amounts: number[]): number {
  return amounts.reduce((total, amount) => total + amount, 0);
}
