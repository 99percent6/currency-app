import { TaskService } from '../lib/taskService';
import utils from '../utils/utils';
import logger from '../lib/logger';
import { Task } from '../models/task';
import { CurrencyCodeValue } from '../types/currency';
import { CurrencyRange } from '../models/currencyRange';

export class Currency {
  private taskService: TaskService;
  private regexp = /\d{2}[./]\d{2}[./]\d{4}/;

  constructor() {
    this.taskService = new TaskService();
  }

  public async getSingleDayValue(day: string): Promise<Task> {
    const isValidDay = utils.testRegex(day, this.regexp);
    if (!isValidDay) {
      logger.error(`Day value is not valid - ${day}`);
      return;
    }

    const url = `currency/list?day=${day}`;
    return this.taskService.get(url);
  }

  public async getCurrencyRange(dateFrom: string, dateTo: string, currencyCode: CurrencyCodeValue): Promise<Task<CurrencyRange>> {
    const isValidDateFrom = utils.testRegex(dateFrom, this.regexp);
    const isValidDateTo = utils.testRegex(dateTo, this.regexp);
    if (!isValidDateFrom || !isValidDateTo) {
      logger.error(`Some of the days are not valid, dateFrom - ${dateFrom}, dateTo - ${dateTo}`);
      return;
    }

    const url = `currency/range?dateFrom=${dateFrom}&dateTo=${dateTo}&currencyCode=${currencyCode}`;
    const task = await this.taskService.get<CurrencyRange>(url);
    if (task.statusCode().isSuccessStatus()) {
      task.getResponse()[1] = new CurrencyRange(task.getResponse()[1]);
    } else {
      logger.error(`Error updateing currency range, response - ${task.getResponse}, code - ${task.statusCode().getCode()}`);
    }

    return task;
  }
}
