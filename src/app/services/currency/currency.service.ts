import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Currency } from 'src/app/controller/Currency';
import { CurrencyCodeValue, CurrentCurrency, CurrencyRecord } from 'src/app/types/currency';
import { CurrencyRange } from 'src/app/models/currencyRange';
import { LocalStorageService } from '../localStorage/local-storage.service';
import config from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private controller: Currency = new Currency();
  public currencyList: CurrentCurrency[] = config.currency.list as CurrentCurrency[];
  public currencyRange: CurrencyRange;

  constructor(private localStorageService: LocalStorageService, private snackBar: MatSnackBar) {}

  private getCacheKey(currency: string): string {
    return `${config.localStorage.currency.key}_${currency}_current_day_${new Date().getDate()}`;
  }

  private generateAllCacheKeysFromCurrencyList(): string[] {
    return this.currencyList.map((currency) => this.getCacheKey(currency.code));
  }

  public async loadCurrencyRange(currency: CurrencyCodeValue): Promise<CurrencyRange> {
    const cacheKey = this.getCacheKey(currency);
    const fromCache = this.localStorageService.getItem(cacheKey);
    if (fromCache !== null) {
      const range = new CurrencyRange(fromCache);
      this.currencyRange = range;
      return range;
    }

    this.snackBar.open('Updating currency values...', 'Close', {
      duration: 2000
    });

    const response = await this.controller.getCurrencyRange('01.10.2020', '31.10.2020', currency);
    if (response.statusCode().isSuccessStatus()) {
      const range = response.getResponse()[1];
      this.currencyRange = range;
      this.localStorageService.setItem(cacheKey, range);

      const exceptKeys = this.generateAllCacheKeysFromCurrencyList();
      this.localStorageService.clear(exceptKeys);
      return range;
    }

    this.snackBar.open('Error updating currency values, please try later', 'Close', {
      duration: 2000
    });
  }

  public getCurrencyRecords(): CurrencyRecord[] {
    return this.currencyRange ? this.currencyRange.getRecordsWithMinAndMaxValue() : [];
  }
}
