import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'progress-indicator',
    templateUrl: './progress.component.html',
    styleUrls: ['/progress.component.scss']
})

export class ProgressComponent {
    @Input() 
    step: Number;
}