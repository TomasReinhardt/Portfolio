import { Component, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { NormalComponent } from "./components/normal/normal.component";
import { EditComponent } from "./components/edit/edit.component";
import { AuthGuard } from "./auth.guard";

const appRouter: Routes = [
    {path:"",component: NormalComponent},
    {path:"login",component: LoginComponent},
    {path:"edit", component: EditComponent,canActivate: [AuthGuard]}
]

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRouter);