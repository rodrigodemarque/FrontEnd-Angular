import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';

export interface Pessoa {
  id: number;
  nome: string;
  dataNascimento: Date | string;
  idade: number;
  sexo: string;
  salario: number;
}

@Injectable({
  providedIn: 'root'
})
export class Pessoaservice {
private api = environment.apiUrl;
  //private apiUrl = "http://localhost:5099/api/pessoa/"

constructor(private http:HttpClient) {}


  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.api);
  }

  getPessoaById(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.api}${id}`);
  }

  getPessoaByNome(nome: string): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.api}${nome}`);
  }

  addPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.api, pessoa);
  }

  updatePessoa(id : number, pessoa: Pessoa): Observable<void> {
    return this.http.put<void>(`${this.api}${pessoa.id}`, pessoa);
  }

  deletePessoa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}${id}`);
  }
}
