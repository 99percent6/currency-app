import { CurrencyCodeValue, CurrencyRecord } from '../types/currency';

export class CurrencyRange {
  private currencyCode: CurrencyCodeValue;
  private dateFrom: string;
  private dateTo: string;
  private records: CurrencyRecord[];

  constructor(range: CurrencyRange) {
    this.currencyCode = range.currencyCode;
    this.dateFrom = range.dateFrom;
    this.dateTo = range.dateTo;
    this.records = range.records;
  }

  public getCurrencyCode(): CurrencyCodeValue {
    return this.currencyCode;
  }

  public getDateFrom(): string {
    return this.dateFrom;
  }

  public getDateTo(): string {
    return this.dateTo;
  }

  public getRecords(): CurrencyRecord[] {
    return this.records;
  }

  public getRecordsWithMinAndMaxValue(): CurrencyRecord[] {
    const records = this.getRecords().map((record) => ({ ...record }));
    let min = 999;
    let max = 0;
    records.forEach((record) => {
      const currentValue = parseFloat(record.value.replace(',', '.'));
      min = currentValue < min ? currentValue : min;
      max = currentValue > max ? currentValue : max;
    });
    records.forEach((record) => {
      const currentValue = parseFloat(record.value.replace(',', '.'));
      record.isMinimal = currentValue === min;
      record.isMaximum = currentValue === max;
    });
    return records;
  }

  public getAllDates(): string[] {
    return this.getRecords().map((record) => record.date);
  }

  public getAllValues(): number[] {
    return this.getRecords().map((record) => parseFloat(record.value.replace(',', '.')));
  }
}
