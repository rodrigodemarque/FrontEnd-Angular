import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Pessoa, Pessoaservice } from '../../services/pessoaservice';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-modalpessoa',
  standalone: false,
  templateUrl: './modalpessoa.html',
  styleUrls: ['./modalpessoa.css']
})



export class ModalPessoa implements AfterViewInit{
  displayedColumns: string[] = ['id', 'nome', 'dataNascimento', 'idade', 'sexo', 'salario'];
  dataSource = new MatTableDataSource<Pessoa>([]);
  nomePesquisa: string = "";
  pessoas: Pessoa[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(
    private dialogRef: MatDialogRef<ModalPessoa>,
    private pessoaService: Pessoaservice
  ) {}

    selecionarPessoa(pessoa: Pessoa) {
    this.dialogRef.close(pessoa);
  }

  Search() {
   if (!this.nomePesquisa) {
      this.pessoaService.getPessoas().subscribe(data => {
      this.pessoas = data;
      this.dataSource.data = this.pessoas;
      });
    }
   else {
      this.pessoaService.getPessoaByNome(this.nomePesquisa).subscribe(data => {
      this.pessoas = data;
      this.dataSource.data = this.pessoas;
      });
    }
  }
}
