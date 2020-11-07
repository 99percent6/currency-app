import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableComponent } from './components/tabs/table/table.component';
import { ChartComponent } from './components/tabs/chart/chart.component';
import { CurrencyService } from './services/currency/currency.service';
import { LocalStorageService } from './services/localStorage/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    ChartsModule,
    MatSnackBarModule
  ],
  providers: [
    CurrencyService,
    LocalStorageService,
    MatSnackBar
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
