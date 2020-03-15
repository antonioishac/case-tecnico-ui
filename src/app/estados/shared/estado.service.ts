import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Estado } from './estado';
import { EstadoFilter } from './EstadoFilter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  estadoUrl: string;

  constructor(private http: HttpClient) {
    this.estadoUrl = `${environment.apiUrl}/api/estados`;
  }

  salvar(estado: Estado) {    
    return this.http.post<Estado>(`${this.estadoUrl}`, estado);
  }

  listarEstadoPorFiltro(filtro: EstadoFilter): Observable<any> {    
    let options = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina == null ? null : filtro.itensPorPagina.toString()
      }
    });
    
    if (filtro.nome !== null && filtro.nome !== '') {
      options = options.set('nome', filtro.nome);
    }

    if (filtro.sigla !== null && filtro.sigla !== '') {
      options = options.set('sigla', filtro.sigla);
    }
    return this.http.get(`${this.estadoUrl}`, {params: options, observe: 'response'});
  }

  buscarEstadoPeloCodigo(codigo: number) {    
    return this.http.get(`${this.estadoUrl}/${codigo}`, {observe: 'response'});
  }
  
  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.estadoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
