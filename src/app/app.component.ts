import { Component, OnInit, Input } from '@angular/core';

import { FormDataService } from 'app/data/formData.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {

    @Input() 
    formData;
    
    constructor(private formDataService: FormDataService) {
    
    }
 
    ngOnInit() {
        this.formData = this.formDataService.getData();
    }
}