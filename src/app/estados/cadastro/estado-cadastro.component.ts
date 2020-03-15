import { Component, OnInit } from '@angular/core';
import  { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from '../shared/estado';
import { EstadoService } from '../shared/estado.service';
import { AlertService } from 'src/app/alert/alert.service';

@Component({
  selector: 'app-estado-cadastro',
  templateUrl: './estado-cadastro.component.html',
  styleUrls: ['./estado-cadastro.component.css']
})
export class EstadoCadastroComponent implements OnInit {

  formEstado: FormGroup;
  estadoRequest: Estado = new Estado();
  
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private estadoService: EstadoService, 
    private alertService: AlertService,
    private route: ActivatedRoute) 
  { }

  ngOnInit() {
    this.createForm(this.estadoRequest);

    const codigoEstado = this.route.snapshot.params['codigo'];

    if (codigoEstado) {      
      this.buscarEstadoPeloCodigo(codigoEstado);
    }    
  }
    
  createForm(estado: Estado) {
    this.formEstado = this.formBuilder.group({
      codigo: [],
      nome: ['', Validators.required],
      sigla: ['', Validators.required]
    })
  }

  fromToModel(): any {    
    //console.log(this.formMedico.value['nome']);
    this.estadoRequest.nome = this.formEstado.value['nome'];
    //console.log(this.formMedico.value['especialidade']);
    this.estadoRequest.sigla = this.formEstado.value['sigla'];    
  } 
  
  modelToForm(estado: Estado) {    
    this.formEstado.get("codigo").setValue(estado.codigo);
    this.formEstado.get("nome").setValue(estado.nome);
    this.formEstado.get("sigla").setValue(estado.sigla);
  }

  get f() { 
    return this.formEstado.controls; 
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    
    if (this.formEstado.invalid) {      
      return;
    }

    if (this.formEstado.valid) {
      this.fromToModel();
      this.criarEstado();
    }    
  }

  private criarEstado() {
    this.estadoService.salvar(this.estadoRequest).subscribe((res) => {
      this.limpar();
      this.alertService.success("Estado cadastrado!");
    }, (err) => {      
      this.alertService.error(err.error.userMessage);      
    });
  }

  limpar() {    
    this.formEstado.reset(new Estado());
    this.alertService.clear();
  }

  buscarEstadoPeloCodigo(codigo: number) {
    this.estadoService.buscarEstadoPeloCodigo(codigo).subscribe((res: any) => {
      this.estadoRequest = res.body;
      this.modelToForm(this.estadoRequest);
    }, (err) => {
      this.alertService.error(err.error.userMessage);
    });
  }
}
