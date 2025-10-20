import { MatDatepickerIntlPtBr } from './shared/matdatapickerIntl';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './components/home/home';
import { Edit } from './components/edit/edit';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { ModalPessoa } from './modais/modalpessoa/modalpessoa';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { InputMaskModule } from '@ngneat/input-mask';
import { MaskCurrency } from './directives/mask-currency';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { LOCALE_ID} from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { getPtBrPaginatorIntl } from './shared/matpaginatorIntl';



@NgModule({
  declarations: [
    App,
    Home,
    Edit,
    ModalPessoa,
    MaskCurrency

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule,
    InputMaskModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
  ],
  providers: [
         provideBrowserGlobalErrorListeners(),
         DatePipe,
         { provide: LOCALE_ID, useValue: 'pt-BR' },
         { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
         { provide: MatDatepickerIntl, useClass: MatDatepickerIntlPtBr },
         { provide: MatPaginatorIntl, useFactory: getPtBrPaginatorIntl }
  ],
  bootstrap: [App]
})
export class AppModule { }
