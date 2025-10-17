import { Component, OnInit, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pessoa, Pessoaservice } from '../../services/pessoaservice';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalPessoa } from '../../modais/modalpessoa/modalpessoa';
import { Router } from '@angular/router';

const paginatorIntl = new MatPaginatorIntl();

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit,OnInit{
  displayedColumns: string[] = ['editar','id', 'nome', 'dataNascimento', 'idade', 'sexo', 'salario', 'deletar'];
  pessoas: Pessoa[] = [];
  dataSource = new MatTableDataSource<Pessoa>(this.pessoas);
  idPesquisa: number | null = null;

@ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pessoaService: Pessoaservice,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.pessoaService.getPessoas().subscribe(dados => {
    this.dataSource.data = dados});
    this.loadPessoas();

    window.addEventListener('keydown', (event) => {
      if(event.key === 'F2') {
        this.abrirModalPessoa();
      }
    });
  }

  loadPessoas() {
  this.pessoaService.getPessoas().subscribe({
    next: (data) => {
      this.pessoas = data;
      this.dataSource.data = this.pessoas;
    },
    error: () => this.snackBar.open('Erro ao carregar pessoas', 'Fechar', { duration: 3000 })
  });
  }

  loadPessoa() {
  if (this.idPesquisa != null){
   this.pessoaService.getPessoaById(this.idPesquisa).subscribe({
    next: (data) => {
      this.pessoas = [data];
      this.dataSource.data = this.pessoas;
    },
    error: () => this.snackBar.open('Cadastro não encontrado', 'Fechar', { duration: 3000 })
    });
   }
  }

  deletePessoa(id: number) {
     if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.pessoaService.deletePessoa(id).subscribe({
        next: () => {
          this.snackBar.open('Pessoa excluída com sucesso!', 'Fechar', { duration: 3000 });
          this.loadPessoas();
        },
        error: () => this.snackBar.open('Erro ao excluir pessoa', 'Fechar', { duration: 3000 })
      });
    }
  }

 abrirModalPessoa() {
    const dialogRef = this.dialog.open(ModalPessoa, { width: '1400px' });
    dialogRef.afterClosed().subscribe((pessoa) => {
      if(pessoa) {
        this.router.navigate(['editar', pessoa.id]);
      }
    });
  }

 Search() {
  const id = Number(this.idPesquisa);
  if (id == 0 || id === null || isNaN(id)) {
    this.loadPessoas();
   } else {
    this.loadPessoa();
   }
}

}
