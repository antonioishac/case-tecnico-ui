import { Component, OnInit, ViewChild } from '@angular/core';
import { EstadoService } from '../../estados/shared/estado.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { BancoService } from '../shared/banco.service';
import { BancoFilter } from '../shared/BancoFilter';

@Component({
  selector: 'app-banco-consulta',
  templateUrl: './banco-consulta.component.html',
  styleUrls: ['./banco-consulta.component.css']
})
export class BancoConsultaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new BancoFilter();
  bancos: [];
  @ViewChild('tabela', { static: true }) grid;

  constructor(
    private bancoService: BancoService,     
    private confirmation: ConfirmationService,
    private messageService: MessageService) { }
  
  ngOnInit() {
    this.listarBancos();
  }

  public listarBancos(pagina = 0) { 
    this.filtro.pagina = pagina;   
    this.bancoService.listarBancoPorFiltro(this.filtro).subscribe((res: any) => {
      
      this.bancos = res.body.content;
      this.totalRegistros = res.body.totalElements;
      
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.listarBancos(pagina);
  }

  confirmarExclusao(banco: any) {    
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir este banco?',
      accept: () => {
        this.excluir(banco);
      }
    });
  }
  
  excluir(banco: any) {
    this.bancoService.excluir(banco.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.listarBancos();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Estado excluída com sucesso!' });
      })
      .catch(erro => this.messageService.add({ severity: 'success', detail: erro.error.userMessage }));
  }

}
