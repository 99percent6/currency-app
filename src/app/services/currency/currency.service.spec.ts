import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CurrencyService } from './currency.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatSnackBarModule
      ],
    });
    service = TestBed.inject(CurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
