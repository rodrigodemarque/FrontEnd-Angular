import { MatDatepickerIntl } from '@angular/material/datepicker';
import { Injectable } from '@angular/core';

@Injectable()
export class MatDatepickerIntlPtBr extends MatDatepickerIntl {
  override calendarLabel = 'Calendário';
  override openCalendarLabel = 'Abrir calendário';
  override prevMonthLabel = 'Mês anterior';
  override nextMonthLabel = 'Próximo mês';
  override prevYearLabel = 'Ano anterior';
  override nextYearLabel = 'Próximo ano';
  override switchToMonthViewLabel = 'Alternar para visualização mensal';
  override switchToMultiYearViewLabel = 'Alternar para visualização anual';
}
