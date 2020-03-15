import { Component, OnInit, ViewChild } from '@angular/core';
import { EstadoService } from '../shared/estado.service';
import { EstadoFilter } from '../shared/EstadoFilter';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-estado-consulta',
  templateUrl: './estado-consulta.component.html',
  styleUrls: ['./estado-consulta.component.css']
})
export class EstadoConsultaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new EstadoFilter();
  estados: [];
  @ViewChild('tabela', { static: true }) grid;

  constructor(
    private estadoService: EstadoService, 
    private confirmation: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.listarEstados();
  }

  public listarEstados(pagina = 0) { 
    this.filtro.pagina = pagina;   
    this.estadoService.listarEstadoPorFiltro(this.filtro).subscribe((res: any) => {
      
      this.estados = res.body.content;
      this.totalRegistros = res.body.totalElements;
      
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.listarEstados(pagina);
  }

  confirmarExclusao(estado: any) {    
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir este estado?',
      accept: () => {
        this.excluirEstado(estado);
      }
    });
  }

  excluirEstado(estado: any) {
    this.estadoService.excluir(estado.codigo).then(() => {
      if (this.grid.first === 0) {
        this.listarEstados();
      } else {
        this.grid.first = 0;
      }
      this.messageService.add({ severity: 'success', detail: 'Estado excluída com sucesso!' });
    }, (err) => {
      this.messageService.add({ severity: 'error', detail: err.error.userMessage });
    })
  }
}
