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
                subtractValue = 14.81;
                divideValue = 2.68;
                break;
            case 'type2':
                subtractValue = 15.10;
                divideValue = 2.82;
                break;
            case 'type3':
                subtractValue = 13.76;
                divideValue = 2.87;
                break;
            case 'trooper':
                subtractValue = 16.10;
                divideValue = 2.38;
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
        // get type champion/challenger/perfectionist/trooper
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

        let questionChampion,
            questionchallenger,
            questionPerfectionist,
            questionTrooper;

        questionChampion = [
            {score: +this.formData.q1, subtype: 'subtype1', weighting: 1},
            {score: +this.formData.q2, subtype: 'subtype2', weighting: 3},
            {score: +this.formData.q3, subtype: 'subtype3', weighting: 2}
        ];

        questionchallenger = [
            {score: +this.formData.q4, subtype: 'subtype4', weighting: 3},
            {score: +this.formData.q5, subtype: 'subtype5', weighting: 2},
            {score: +this.formData.q6, subtype: 'subtype6', weighting: 1}
        ];

        questionPerfectionist = [
            {score: +this.formData.q7, subtype: 'subtype7', weighting: 2},
            {score: +this.formData.q8, subtype: 'subtype8', weighting: 3},
            {score: +this.formData.q9, subtype: 'subtype9', weighting: 1}
        ];

        questionTrooper = [
            {score: +this.formData.q10, subtype: 'subtype10', weighting: 2},
            {score: +this.formData.q11, subtype: 'subtype11', weighting: 3},
            {score: +this.formData.q12, subtype: 'subtype12', weighting: 1}
        ];

        let champion,
            challenger,
            perfectionist,
            trooper,
            profileResult;

        champion = this.getScore(questionChampion, 'Type1');
        challenger = this.getScore(questionchallenger, 'Type2');
        perfectionist = this.getScore(questionPerfectionist, 'Type3');
        trooper = this.getScore(questionTrooper, 'Type4');

        profileResult = this.getType([champion, challenger, perfectionist, trooper]);

        this.profileId = profileResult.groupId;
        this.profileType = profileResult.groupType;
        this.profileSubType = profileResult.groupSubType;

        this.getSummary(this.profileId, this.profileSubType);
    }
}