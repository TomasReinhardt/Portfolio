import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { WebsEjComponent } from './components/webs-ej/webs-ej.component';
import { WebsClientsComponent } from './components/webs-clients/webs-clients.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { NormalComponent } from './components/normal/normal.component';
import { EditComponent } from './components/edit/edit.component';
import { EditwebsComponent } from './components/editwebs/editwebs.component';
import { EditclientsComponent } from './components/editclients/editclients.component';
import { EditIcicioComponent } from './components/edit-icicio/edit-icicio.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    WebsEjComponent,
    WebsClientsComponent,
    LoginComponent,
    NormalComponent,
    EditComponent,
    EditwebsComponent,
    EditclientsComponent,
    EditIcicioComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    NgxDropzoneModule

  ],
  providers: [appRoutingProviders,AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
