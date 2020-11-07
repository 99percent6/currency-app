import logger from './logger';
import { Task } from '../models/task';
import config from '../config';

export class TaskService {

  private readonly API_URL = config.api.url;

  private processUrl(url: string): string {
    if (url.startsWith('/')) {
      return url.slice(1);
    }
    return url;
  }

  private isSuccessStatus(status: number): boolean {
    return status >= 200 && status < 300;
  }

  private async processResponse(response: Response): Promise<Task> {
    const jsonResponse = await response.json();
    const { status } = response;
    const result: [any, any] = this.isSuccessStatus(status) ? [null, jsonResponse] : [jsonResponse, null];
    const task = new Task(status, result);
    return task;
  }

  public async get<R>(url: string): Promise<Task<R>> {
    try {
      const response = await fetch(`${this.API_URL}/${this.processUrl(url)}`);
      return this.processResponse(response);
    } catch (error) {
      logger.error(error);
      const task = new Task(500, [error.message || error, null]);
      return task;
    }
  }
}
