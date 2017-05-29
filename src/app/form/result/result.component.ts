import { Component, OnInit, Input } from '@angular/core';
import { FormDataService } from 'app/data/formData.service';
import { Question } from 'app/data/question.model';
import { QuestionService } from 'app/data/question.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit {

    @Input()
    formData;

    activeStep = 6;
    profileId: string;
    profileType: string;
    profileSubType: string;
    profileSummary: string;
    questions: Question[];

    constructor(private formDataService: FormDataService, private questionService: QuestionService, private router: Router) {}

    ngOnInit() {
        this.formData = this.formDataService.getData();
        this.questions = this.questionService.getQuestions();
        this.calculateProfile();
    }

    goToStart() {
        this.formDataService.resetData();
        this.router.navigate(['/step/1']);
    }

    getScore(groupQuestions, type) {
        let groupSum,
            groupScore,
            groupSubType,
            subtractValue,
            divideValue,
            result;        

        switch (type.toLowerCase()) {
            case 'type1':
                subtractValue = 12.81;
                divideValue = 3.1;
                break;
            case 'type2':
                subtractValue = 14.10;
                divideValue = 1.3;
                break;
            case 'type3':
                subtractValue = 11.23;
                divideValue = 1.6;
                break;
            case 'type4':
                subtractValue = 14.10;
                divideValue = 1.5;
                break;
            default:            
        }

        // SUM     
        groupSum = groupQuestions.reduce(function(acc, cur) {            
            return acc + cur.score;
        }, 0);

        // SCORE
        groupScore = (groupSum - subtractValue) / divideValue;

        // SUBTYPE
        groupSubType = this.getSubType(groupQuestions);
        
        // RESULT
        result = {
            groupId: type.toLowerCase(),
            groupType: type,
            groupSum: groupSum,
            groupScore: groupScore,
            groupSubType: groupSubType
        };

        return result;
    }

    getType(groups) {
        // get type type1/type2/type3/type4
        let type = groups.reduce(function(acc, cur) {
            return acc.groupScore > cur.groupScore ? acc : cur;
        });
        return type;
    }

    getSubType(questions) {

        let highestScore,
            scores;

        // get highest score
        highestScore = questions.reduce(function(acc, cur) {
            return Math.max(acc, cur.score);
        }, 0);
        
        // filter for highest score questions & sort by weighting
        scores = questions.filter(function(item) {
            return item.score == highestScore;
        }).sort(function(a , b) {
            return a.weighting - b.weighting;
        });

        return scores[0].subtype;
    }

    getSummary(type, subtype) {
        let profile,
            profileSummaryValue;

        subtype = subtype.toLowerCase();

        profile = this.questions.filter(function(item) {
            return item.subtype == subtype && item.type == type;
        });

        profileSummaryValue = profile[0].summary.toString();
        this.profileSummary = profileSummaryValue;
    }

    calculateProfile() {

        let questionType1,
            questionType2,
            questionType3,
            questionType4;

        questionType1 = [
            {score: +this.formData.q1, subtype: 'subtype1', weighting: 1},
            {score: +this.formData.q2, subtype: 'subtype2', weighting: 3},
            {score: +this.formData.q3, subtype: 'subtype3', weighting: 2}
        ];

        questionType2 = [
            {score: +this.formData.q4, subtype: 'subtype4', weighting: 3},
            {score: +this.formData.q5, subtype: 'subtype5', weighting: 2},
            {score: +this.formData.q6, subtype: 'subtype6', weighting: 1}
        ];

        questionType3 = [
            {score: +this.formData.q7, subtype: 'subtype7', weighting: 2},
            {score: +this.formData.q8, subtype: 'subtype8', weighting: 3},
            {score: +this.formData.q9, subtype: 'subtype9', weighting: 1}
        ];

        questionType4 = [
            {score: +this.formData.q10, subtype: 'subtype10', weighting: 2},
            {score: +this.formData.q11, subtype: 'subtype11', weighting: 3},
            {score: +this.formData.q12, subtype: 'subtype12', weighting: 1}
        ];

        let type1,
            type2,
            type3,
            type4,
            profileResult;

        type1 = this.getScore(questionType1, 'Type1');
        type2 = this.getScore(questionType2, 'Type2');
        type3 = this.getScore(questionType3, 'Type3');
        type4 = this.getScore(questionType4, 'Type4');

        profileResult = this.getType([type1, type2, type3, type4]);

        this.profileId = profileResult.groupId;
        this.profileType = profileResult.groupType;
        this.profileSubType = profileResult.groupSubType;

        this.getSummary(this.profileId, this.profileSubType);
    }
}