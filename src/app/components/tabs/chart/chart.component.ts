import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

import utils from '../../../utils/utils';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input()
  public chartData: number[];

  @Input()
  public chartLabels: Label[];

  @Input()
  public currentCurrency: string;

  public lineChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Currency values'
    }
  ];

  public lineChartLabels: Label[] = [];

  public lineChartOptions = {
    responsive: true,
  };

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartType = 'line';

  public ngOnInit(): void {
    this.updateChart(this.chartData, this.chartLabels, this.currentCurrency);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const isChartDataEqual = utils.isArrayEquals(changes.chartData.currentValue, changes.chartData.previousValue);
    const isChartLabelsEqual = utils.isArrayEquals(changes.chartLabels.currentValue, changes.chartLabels.previousValue);
    const isCurrencyEqual = changes.currentCurrency === undefined || changes.currentCurrency !== undefined
      && changes.currentCurrency.currentValue !== changes.currentCurrency.previousValue;

    if (!isChartDataEqual || !isChartLabelsEqual || !isCurrencyEqual) {
      const currency = changes.currentCurrency !== undefined ? changes.currentCurrency.currentValue : this.currentCurrency;
      this.updateChart(changes.chartData.currentValue, changes.chartLabels.currentValue, currency);
    }
  }

  private updateChart(data: number[], labels: Label[], currency: string): void {
    this.lineChartData.forEach((line) => {
      Object.assign(line, { data, label: currency });
    });
    this.lineChartLabels = labels;
  }
}
