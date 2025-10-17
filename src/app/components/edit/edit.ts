import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Pessoa, Pessoaservice } from '../../services/pessoaservice';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit implements OnInit {
  pessoa: Pessoa = { id: 0, nome: '', dataNascimento: new Date(1900, 0, 1), idade: 0, sexo: '', salario: 0 };
  pessoaForm: FormGroup;
  id: number;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private pessoaService: Pessoaservice,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private datepipe: DatePipe
  ){}

  ngOnInit(): void {
    this.pessoaForm = this.fb.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      idade: ['', [Validators.required, Validators.min(1)]],
      sexo: ['', Validators.required],
      salario: ['', Validators.required]
    });

    this.pessoaForm.get('dataNascimento')?.valueChanges.subscribe(value => {
    if (value) {
      const idadeCalculada = this.calcularIdade(value);
      this.pessoaForm.patchValue({ idade: idadeCalculada }, { emitEvent: false });
    } else {
      this.pessoaForm.patchValue({ idade: '' }, { emitEvent: false });
    }
  });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam;
        this.isEdit = true;
        this.loadPessoa();
      }
    });
  }

  loadPessoa(): void {
    this.pessoaService.getPessoaById(this.id).subscribe({
      next: (data) => {
        this.pessoaForm.patchValue({
        nome: data.nome,
        dataNascimento: this.datepipe.transform(data.dataNascimento, 'yyyy-MM-dd'),
        idade: data.idade,
        sexo: data.sexo,
        salario: data.salario
        });
      },
      error: (err) => this.snackBar.open('Erro ao carregar pessoa', 'Fechar', { duration: 3000 })
    });
  }

  atualizar(){
    if(this.pessoaForm.invalid){
      this.snackBar.open('Preencer os campos obrigatórios', 'Fechar', { duration: 3000 });
      return;
    }
    const salarioFormatado = this.pessoaForm.value.salario;
    const salarioNumerico = this.parseMoeda(salarioFormatado);
    const pessoa: Pessoa = {id: this.id, ...this.pessoaForm.value,
    salario: salarioNumerico,
    dataNascimento: this.pessoaForm.value.dataNascimento
      ? new Date(this.pessoaForm.value.dataNascimento).toISOString()
      : null };

    if(this.isEdit){
      this.pessoaService.updatePessoa(this.id,pessoa).subscribe({
        next: () => {
          this.snackBar.open('Pessoa atualizada com sucesso', 'OK', { duration: 3000 });
          this.router.navigate(['']);
        },
        error: () => this.snackBar.open('Erro ao atualizar pessoa', 'Fechar', { duration: 3000 })
      });
    } else {
      this.pessoaService.addPessoa(pessoa).subscribe({
        next: () => {
          this.snackBar.open('Pessoa criada com sucesso', 'Fechar', { duration: 3000 });
          this.router.navigate(['']);
        },
        error: () => this.snackBar.open('Erro ao criar pessoa', 'Fechar', { duration: 3000 })
      });
    }
  }

calcularIdade(dataNascimento: string | Date): number {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

private parseMoeda(valor: string): number {
  if (!valor) return 0;
  // Remove "R$", espaços e pontos, troca vírgula por ponto
  const numero = valor
    .replace(/\s/g, '')        // Remove espaços
    .replace('R$', '')         // Remove símbolo
    .replace(/\./g, '')        // Remove pontos
    .replace(',', '.');        // Troca vírgula por ponto

  return parseFloat(numero);
}

}
