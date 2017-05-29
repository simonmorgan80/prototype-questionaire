import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { FormDataService } from 'app/data/formData.service';

import { Question } from 'app/data/question.model';
import { QuestionService } from 'app/data/question.service';

@Component({
    moduleId: module.id,
    selector: 'step',
    templateUrl: './step.component.html',
    styleUrls: ['/step.component.scss']
})

export class StepComponent implements OnInit, OnDestroy {
    
    constructor(private route: ActivatedRoute, private router: Router, private formDataService: FormDataService, private questionService: QuestionService) {}

    private sub: any;

    stepValid = true;
    stepFirst = true;
    numberOfSteps = 4;
    activeStep: number;
    nextStep: any;
    previousStep: any;
    questions: Question[];
    title = 'Step';
    answers = [
        { id: 1, label: 'Nothing like me' , value: 1 },
        { id: 2, label: 'Very unlike me' , value: 2 },
        { id: 3, label: 'Unlike me' , value: 3 },
        { id: 4, label: 'Neither like/unlike' , value: 4 },
        { id: 5, label: 'Like me' , value: 5 },
        { id: 6, label: 'Very like me' , value: 6 },
        { id: 7, label: 'Exactly like me' , value: 7 }
    ];
    
    @Input()
    formData;

    ngOnInit() {

        this.formData = this.formDataService.getData();

        this.sub = this.route.params.subscribe(params => {

            this.activeStep = +params['id'];            

            if (this.activeStep == this.numberOfSteps) {
                this.nextStep = '/personal/';
            } else {
                this.nextStep = '/step/' + (this.activeStep + 1);
            }

            this.previousStep = '/step/' + (this.activeStep - 1);

            if (this.activeStep > 1) {
                this.stepFirst = false;
            } else {
                this.stepFirst = true;
            }

            this.getQuestions();

        });
            
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }

    ngOnDestroy() {
        this.formDataService.setData(this.formData);
    }

    goToPreviousStep() {
        this.router.navigate([this.previousStep]);
    }    

    goToNextStep({ value, valid }: { value: '', valid: boolean }) {

        if (valid) {
            this.router.navigate([this.nextStep]);
            this.stepValid = true; 
        } else {
            this.stepValid = false;
        }
        
    }

    getQuestions(): void {
        let numberToShow = 3,
            questions = this.questionService.getQuestions(),
            stepQuestions,
            min = (this.activeStep * numberToShow) - numberToShow,
            max = (this.activeStep * numberToShow) - 1;

        this.questions = questions.filter(
            (item, index) => {
                return index >= min && index <= max;
            }
        )        
    }
}