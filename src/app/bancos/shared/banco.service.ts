import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Banco } from './Banco';
import { BancoFilter } from './BancoFilter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BancoService { 

  bancoUrl: string;

  constructor(private http: HttpClient) {
    this.bancoUrl = `${environment.apiUrl}/api/bancos`;
  }

  salvar(banco: Banco) {       
    return this.http.post<Banco>(`${this.bancoUrl}`, banco);
  }

  atualizar(banco: Banco) {
    debugger
    return this.http.put<Banco>(`${this.bancoUrl}/${banco.codigo}`, banco);
  }

  listarBancoPorFiltro(filtro: BancoFilter): Observable<any> {    
    let options = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });    
    if (filtro.nome !== null && filtro.nome !== '') {
      options = options.set('nome', filtro.nome);
    }

    if (filtro.agencia !== null && filtro.agencia !== '') {
      options = options.set('agencia', filtro.agencia);
    }
    return this.http.get(`${this.bancoUrl}`, {params: options, observe: 'response'});
  }

  buscarBancoPeloCodigo(codigo: number) {    
    return this.http.get(`${this.bancoUrl}/${codigo}`, {observe: 'response'});
  }
  
  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.bancoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}