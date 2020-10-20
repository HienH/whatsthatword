import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Word } from '../models/word.model';
import { WordService } from '../services/word.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private userService: UserService, private wordService: WordService) { }
    user: object;
    word: string;

    ngOnInit(): void {
        this.userService.getProfile().subscribe(profile => {
            if (profile['success']) {
                this.user = profile['user']

            } err => {

                console.log(err);
            }
        })
    }

    addWord() {
        const newWord = new Word();
        newWord.id = this.user['_id'];
        newWord.word = this.word;
        this.wordService.sendWord(newWord).subscribe(res => {
            console.log(res)
            if (res['success']) {
                console.log(res)
            } err => {
                console.log(err)
            }
        })
    }

}
