import { Component, OnInit, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { UserService } from '../services/user.service';
import { Word } from '../models/word.model';
import { WordService } from '../services/word.service';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { MatPaginator } from '@angular/material/paginator';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
    @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
    @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;

    allWords: any = [];
    favWords = [];
    headElements = ['Word', 'Fav', 'Noun', 'Verb', 'Adjective'];
    searchText: string = '';
    previous: string;
    userId: string;
    faStar = faStar;
    faSolidStar = faSolidStar;

    @HostListener('input') oninput() {
        this.searchItems();
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private userService: UserService, private wordService: WordService, private cdRef: ChangeDetectorRef) { }
    user: object;
    word: string;

    ngOnInit(): void {
        this.wordService.getAllWords().subscribe(words => {
            console.log(words)
            this.allWords = words['allWords'];
            this.mdbTable.setDataSource(this.allWords);
            this.previous = this.mdbTable.getDataSource();
        }, err => {
            console.log(err);
        })
        this.getUserProfile();
    }

    getUserProfile() {
        this.userService.getProfile().subscribe(profile => {
            this.userId = profile['user']['_id'];
            this.favWords = profile['user']['favWords'].map(word => { return word.word });

        })
    }

    ngAfterViewInit() {
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

        this.mdbTablePagination.calculateFirstItemIndex();
        this.mdbTablePagination.calculateLastItemIndex();
        this.cdRef.detectChanges();
    }

    addWord() {
        const newWord = new Word();
        newWord.userId = this.user['_id'];
        newWord.word = this.word;
        this.wordService.addNewWord(newWord).subscribe(res => {
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
            this.allWords = this.mdbTable.getDataSource();
        }
        if (this.searchText) {
            this.allWords = this.mdbTable.searchLocalDataBy(this.searchText);
            this.mdbTable.setDataSource(prev);
        }
    }

    toggleFavWord(word) {
        const favWord = new Word();
        favWord.userId = this.userId;
        favWord.word = word
        if (this.favWords.includes(word)) {
            this.userService.removeFavWord(favWord).subscribe(res => {
                if (res['success']) {
                    this.getUserProfile()
                }
            }, err => {
                console.log(err)
            })
        } else {
            this.userService.favWord(favWord).subscribe(res => {
                if (res['success']) {
                    this.getUserProfile()
                }
            }, err => {
                console.log(err)
            })
        }
    }

    isFavWord(word) {
        return this.favWords.includes(word)
    }
}