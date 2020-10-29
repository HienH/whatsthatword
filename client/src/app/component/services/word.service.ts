import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Word } from '../models/word.model';


@Injectable({
    providedIn: 'root'
})
export class WordService {

    constructor(private http: HttpClient) { }

    addNewWord(newWord: Word) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const body = JSON.stringify(newWord)
        return this.http.post('/word/addWord', body, { headers: headers });
    }

    getToken() {
        return localStorage.getItem('jwt')
    }

    getAllWords() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.getToken()
        });
        return this.http.get('/word/allWords', { headers: headers })
    }

    getWordDefinition(word) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.getToken()
        });

        return this.http.get('/word/' + word, { headers: headers })

    }
}
