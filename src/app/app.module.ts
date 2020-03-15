import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EstadoCadastroComponent } from './estados/cadastro/estado-cadastro.component';
import { AlertComponent } from './alert/alert.component';
import { appRoutingModule } from './app.routing';
import { EstadoConsultaComponent } from './estados/consulta/estado-consulta.component';

import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { GrowlModule } from 'primeng/growl';
import { BancoCadastroComponent } from './bancos/cadastro/banco-cadastro.component';
import { BancoConsultaComponent } from './bancos/consulta/banco-consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    EstadoCadastroComponent,
    AlertComponent,
    EstadoConsultaComponent,
    BancoCadastroComponent,
    BancoConsultaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    GrowlModule,
    ConfirmDialogModule,    
  ],
  exports: [
    GrowlModule,
    ConfirmDialogModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
