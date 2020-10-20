import { Component, OnInit, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { UserService } from '../services/user.service';
import { Word } from '../models/word.model';
import { WordService } from '../services/word.service';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { MatPaginator } from '@angular/material/paginator';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
    @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
    @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;

    allWords: any = [];
    headElements = ['Word', 'Noun', 'Verb', 'Adjective'];
    searchText: string = '';
    previous: string;

    @HostListener('input') oninput() {
        this.searchItems();
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private userService: UserService, private wordService: WordService, private cdRef: ChangeDetectorRef) { }
    user: object;
    word: string;

    ngOnInit(): void {
        this.wordService.getAllWords().subscribe(words => {
            this.allWords = words['allWords'];
            this.mdbTable.setDataSource(this.allWords);
            this.previous = this.mdbTable.getDataSource();
        }, err => {
            console.log(err);
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
        console.log(prev)
        if (!this.searchText) {
            this.mdbTable.setDataSource(this.previous);
            this.allWords = this.mdbTable.getDataSource();
        }
        if (this.searchText) {
            this.allWords = this.mdbTable.searchLocalDataBy(this.searchText);
            this.mdbTable.setDataSource(prev);
        }
    }
}