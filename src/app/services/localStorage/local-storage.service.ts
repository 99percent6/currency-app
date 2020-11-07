import { Injectable } from '@angular/core';
import logger from 'src/app/lib/logger';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private instance: Storage;

  constructor() {
    this.instance = localStorage;
  }

  public getInstance(): Storage {
    return this.instance;
  }

  public setItem(key: string, value: any): void {
    try {
      value = typeof value === 'object' ? JSON.stringify(value) : String(value);
      this.instance.setItem(key, value);
    } catch (error) {
      logger.error(error);
    }
  }

  public getItem(key: string): any {
    let value;
    try {
      value = this.instance.getItem(key);
      value = value !== null ? JSON.parse(value) : value;
    } catch (error) {
      logger.log(error);
    }
    return value;
  }

  public clear(exceptKeys?: string[]): void {
    if (exceptKeys === undefined || exceptKeys.length === 0) {
      this.instance.clear();
      return;
    }

    Object.keys(localStorage).forEach((key) => {
      if (!exceptKeys.includes(key)) {
        this.instance.removeItem(key);
      }
    });
  }
}
