import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Question } from './question.model';
import { QUESTIONS } from './question-data.service';

@Injectable()
export class QuestionService {

    // private questionsUrl = 'api/questions';
    // private headers = new Headers({'Content-type': 'application/json'});

    // constructor(private http:Http) {}

    // getQuestions(): Promise<Question[]> {
    //     return this.http.get(this.questionsUrl)
    //         .toPromise()
    //         .then(response => response.json().data as Question[])
    //         .catch(this.handleError);
    // }

    // private handleError(error: any): Promise<any> {
    //     console.error('An error occured retireving the question data');
    //     return Promise.reject(error.message || error);
    // }

    getQuestions(): Question[] {
        return QUESTIONS;
    }
}