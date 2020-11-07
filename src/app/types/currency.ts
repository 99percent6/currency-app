export type CurrencyCodeValue = 'R01235' | 'R01239';
export type CurrencyLabel = 'USD' | 'EUR';
export type CurrencyRecord = {
  date: string,
  nominal: string,
  value: string,
  isMinimal?: boolean,
  isMaximum?: boolean
};
export type CurrentCurrency = { code: CurrencyCodeValue, label: CurrencyLabel };
