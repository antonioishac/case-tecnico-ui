import { Routes, RouterModule } from '@angular/router';

import { EstadoCadastroComponent } from './estados/cadastro/estado-cadastro.component';
import { EstadoConsultaComponent } from './estados/consulta/estado-consulta.component';
import { BancoCadastroComponent } from './bancos/cadastro/banco-cadastro.component';
import { BancoConsultaComponent } from './bancos/consulta/banco-consulta.component';

const routes: Routes = [
    { path: '', component: EstadoCadastroComponent },
    { path: 'estado', component: EstadoCadastroComponent },
    { path: 'estado/:codigo', component: EstadoCadastroComponent },
    { path: 'consulta-estado', component: EstadoConsultaComponent },

    { path: 'banco', component: BancoCadastroComponent },
    { path: 'banco/:codigo', component: BancoCadastroComponent },
    { path: 'consulta-banco', component: BancoConsultaComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);