import { Component, OnInit } from '@angular/core';
import  { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Banco } from '../shared/Banco';
import { EstadoService } from 'src/app/estados/shared/estado.service';
import { AlertService } from 'src/app/alert/alert.service';
import { ActivatedRoute } from '@angular/router';
import { BancoService } from '../shared/banco.service';
import { EstadoFilter } from 'src/app/estados/shared/EstadoFilter';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-banco-cadastro',
  templateUrl: './banco-cadastro.component.html',
  styleUrls: ['./banco-cadastro.component.css']
})
export class BancoCadastroComponent implements OnInit {

  formBanco: FormGroup;
  banco: Banco = new Banco();

  submitted = false;

  estados: any[];

  constructor(private formBuilder: FormBuilder,
    private bancoService: BancoService, 
    private estadoService: EstadoService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit() {
    this.createForm(this.banco);

    const codigoBanco = this.route.snapshot.params['codigo'];

    this.carregarEstados();

    if (codigoBanco) {      
      this.buscarBancoPeloCodigo(codigoBanco);
    }
  }

  carregarEstados() {
    let filtroEstado = new EstadoFilter();
    filtroEstado.itensPorPagina = null;
    this.estadoService.listarEstadoPorFiltro(filtroEstado).subscribe((list => {
      this.estados = list.body.content.map(c => ({ label: c.nome, value: c.codigo }));
    }), (err => {
      this.messageService.add({ severity: 'error', detail: err.error.userMessage }); 
    }))
  }

  createForm(banco: Banco) {
    this.formBanco = this.formBuilder.group({
      codigo: [],
      nome: ['', Validators.required],
      agencia: ['', Validators.required],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: [],
      cep: [],
      estado: ['', Validators.required]
    })
  }

  fromToModel(): any {    
    this.banco.nome = this.formBanco.value['nome'];
    this.banco.agencia = this.formBanco.value['agencia'];
    this.banco.endereco.logradouro = this.formBanco.value['logradouro'];
    this.banco.endereco.bairro = this.formBanco.value['bairro'];
    this.banco.endereco.cidade = this.formBanco.value['cidade'];
    this.banco.endereco.cep = this.formBanco.value['cep'];
    this.banco.endereco.estado.codigo = this.formBanco.value['estado'];
  }

  modelToForm(banco: Banco) {    
    this.formBanco.get("codigo").setValue(banco.codigo);
    this.formBanco.get("nome").setValue(banco.nome);
    this.formBanco.get("agencia").setValue(banco.agencia);
    this.formBanco.get("logradouro").setValue(banco.endereco.logradouro);
    this.formBanco.get("bairro").setValue(banco.endereco.bairro);
    this.formBanco.get("cidade").setValue(banco.endereco.cidade);
    this.formBanco.get("cep").setValue(banco.endereco.cep);
    this.formBanco.get("estado").setValue(banco.endereco.estado.codigo);
  }

  get f() { 
    return this.formBanco.controls; 
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    
    if (this.formBanco.invalid) {      
      return;
    }

    if (this.formBanco.valid) {
      this.fromToModel();
      this.criarBanco();
    }    
  }

  private criarBanco() {
    debugger
    if (this.banco.codigo !== null) {
      this.bancoService.atualizar(this.banco).subscribe((res) => {
        this.limpar();
        this.alertService.success("Banco cadastrado!");
      }, (err) => {      
        this.alertService.error(err.error.userMessage);      
      });
    } else {
      this.bancoService.salvar(this.banco).subscribe((res) => {
        this.limpar();
        this.alertService.success("Banco cadastrado!");
      }, (err) => {      
        this.alertService.error(err.error.userMessage);      
      });
    }
  }

  limpar() {    
    this.formBanco.reset(new Banco());
    this.alertService.clear();
  }

  buscarBancoPeloCodigo(codigo: number) {
    this.bancoService.buscarBancoPeloCodigo(codigo).subscribe((res: any) => {
      this.banco = res.body;
      this.modelToForm(this.banco);
    }, (err) => {
      this.alertService.error(err.error.userMessage);
    });
  }

}
