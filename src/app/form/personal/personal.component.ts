import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormData } from 'app/data/formData.model';
import { FormDataService } from 'app/data/formData.service';

@Component({
    moduleId: module.id,
    selector: 'personal',
    templateUrl: './personal.component.html',
    styleUrls: ['/personal.component.scss']
})

export class PersonalComponent implements OnInit, OnDestroy {
    title = 'Please tell us about yourself';
    stepValid = true;
    activeStep = 5;

    @Input()
    formData: FormData;

    constructor(private formDataService: FormDataService, private router: Router) {}

    ngOnInit() {
        this.formData = this.formDataService.getData();
    }

    ngOnDestroy() {
        this.formDataService.setData(this.formData);
    }

    goToPreviousStep() {
        this.router.navigate(['/step/4']);
    }    

    goToNextStep({ value, valid }: { value: '', valid: boolean }) {

        if (valid) {
            this.router.navigate(['/result']);
            this.stepValid = true; 
        } else {
            this.stepValid = false;
        }
        
    }
}