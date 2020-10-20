import { Component, OnInit, HostListener, ViewChild } from '@angular/core';

import { UserService } from '../services/user.service';
import { Word } from '../models/word.model';
import { WordService } from '../services/word.service';
import { MdbTableDirective } from 'angular-bootstrap-md';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
    elements: any = [];
    headElements = ['ID', 'First', 'Last', 'Handle'];
    searchText: string = '';
    previous: string;

    @HostListener('input') oninput() {
        this.searchItems();
    }
    constructor(private userService: UserService, private wordService: WordService) { }
    user: object;
    word: string;

    ngOnInit(): void {
        this.wordService.getAllWords().subscribe(profile => {
            console.log(profile)
        }, err => {
            console.log(err);
        })

        for (let i = 1; i <= 10; i++) {
            this.elements.push({
                id: i.toString(), first: 'Wpis ' + i, last: 'Last ' + i, handle: 'Handle ' + i
            });
        }
        this.mdbTable.setDataSource(this.elements);
        this.previous = this.mdbTable.getDataSource();

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
    searchItems() {
        const prev = this.mdbTable.getDataSource();
        if (!this.searchText) {
            this.mdbTable.setDataSource(this.previous);
            this.elements = this.mdbTable.getDataSource();
        }
        if (this.searchText) {
            this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
            this.mdbTable.setDataSource(prev);
        }
    }
}