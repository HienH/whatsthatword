import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Word } from '../models/word.model';


@Injectable({
    providedIn: 'root'
})
export class WordService {

    constructor(private http: HttpClient) { }

    sendWord(newWord: Word) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const body = JSON.stringify(newWord)
        return this.http.post('http://localhost:3000/word/addWord', body, { headers: headers });

    }
}
