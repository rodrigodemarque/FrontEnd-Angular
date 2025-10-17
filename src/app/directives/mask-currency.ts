import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[maskCurrency]',
  standalone: false
})
export class MaskCurrency {

  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef, private control: NgControl) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    let value = this.el.value;

    // Remove tudo que não é número
    value = value.replace(/\D/g, '');

    // Converte para número com 2 casas decimais (centavos)
    let numericValue = parseFloat(value) / 100;

    // Formata como moeda brasileira
    let formattedValue = numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    // Atualiza o valor do input e o FormControl Angular
    this.el.value = formattedValue;
    this.control.control?.setValue(formattedValue, { emitEvent: false });
  }

  @HostListener('blur')
  onBlur(): void {
    // No blur você pode validar, limpar, etc. Se quiser...
  }
}
