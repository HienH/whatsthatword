import { Component, OnInit } from '@angular/core';
import { WordService } from '../services/word.service';
import { Router } from '@angular/router';
import { IWordDef } from '../models/wordDef.model';
import { Location } from '@angular/common';


@Component({
    selector: 'app-word',
    templateUrl: './word.component.html',
    styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
    word: string;
    wordDefinition: IWordDef;
    constructor(private wordService: WordService, private router: Router, protected location: Location) { }

    ngOnInit(): void {
        this.getWordFromUrl();
        this.getWord();
    }

    getWordFromUrl() {
        const url = this.router.url;
        var splitUrl = url.split('/');
        this.word = splitUrl[2];
    }

    getWord() {
        this.wordService.getWordDefinition(this.word).subscribe(wordInfo => {
            if (wordInfo['success']) {
                this.wordDefinition = wordInfo['word']
            }
        })
    }

    back() {
        this.location.back();
    }

}
