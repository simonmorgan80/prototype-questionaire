import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonalComponent } from './form/personal/personal.component';
import { StepComponent } from './form/step/step.component';
import { ResultComponent } from './form/result/result.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'personal', component: PersonalComponent },
    { path: 'step/:id', component: StepComponent },
    { path: 'result', component: ResultComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}