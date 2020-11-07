import { Component, Input } from '@angular/core';
import { CurrencyRecord } from 'src/app/types/currency';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  public displayedColumns: string[] = ['date', 'value'];

  @Input()
  public currencyRange: CurrencyRecord[];

}
