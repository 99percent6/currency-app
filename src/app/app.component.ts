import { Component, OnInit } from '@angular/core';
import { CurrentCurrency, CurrencyRecord, CurrencyCodeValue } from './types/currency';
import { CurrencyService } from './services/currency/currency.service';
import { CurrencyRange } from './models/currencyRange';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'Currency APP';

  public selectedCurrency: CurrencyCodeValue = 'R01235';

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.loadCurrencyRange(this.selectedCurrency);
  }

  public loadCurrencyRange(currency: CurrencyCodeValue): void {
    this.currencyService.loadCurrencyRange(currency);
  }

  public getCurrencyRecords(): CurrencyRecord[] {
    return this.currencyService.getCurrencyRecords();
  }

  public getCurrencyList(): CurrentCurrency[] {
    return this.currencyService.currencyList;
  }

  public getCurrencyRange(): CurrencyRange {
    return this.currencyService.currencyRange;
  }

  public getAllValues(): number[] {
    return this.currencyService.currencyRange ? this.currencyService.currencyRange.getAllValues() : [];
  }

  public getAllDates(): string[] {
    return this.currencyService.currencyRange ? this.currencyService.currencyRange.getAllDates() : [];
  }

  public findCurrencyLabel(code: string): string {
    const currentCurrency = this.getCurrencyList().find((currency) => currency.code === code);
    return currentCurrency !== undefined ? currentCurrency.label : 'USD';
  }
}
