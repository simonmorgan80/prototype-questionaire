import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule} from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// import { QuestionDataService } from './data/question-data.service';
import { QuestionService } from './data/question.service';

import { PersonalComponent } from './form/personal/personal.component';
import { StepComponent } from './form/step/step.component';
import { ResultComponent } from './form/result/result.component';
import { ProgressComponent } from './form/progress/progress.component';

/* Shared Service */
import { FormDataService }    from './data/formData.service'

import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PersonalComponent,
        StepComponent,
        ResultComponent,
        ProgressComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        // InMemoryWebApiModule.forRoot(QuestionDataService)
    ],
    providers: [
        QuestionService,
        FormDataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }