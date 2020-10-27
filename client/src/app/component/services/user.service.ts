import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Word } from '../models/word.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    loginUser(user) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/user/login', user, { headers: headers });
    }

    storeUserData(token) {
        localStorage.setItem('jwt', token);
    }

    registerUser(user) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/user/register', user, { headers: headers });
    }

    isLoggedIn(): boolean {
        const helper = new JwtHelperService();
        let token = localStorage.getItem('jwt')
        if (token) {
            return !helper.isTokenExpired(token.split(' ')[1]);
        } else false;
    }

    logout() {
        localStorage.clear()
    }

    getToken() {
        return localStorage.getItem('jwt')
    }

    getProfile() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.getToken()
        });
        return this.http.get('http://localhost:3000/user/profile/', { headers: headers })
    }

    getUsersProfile(userId) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.getToken()
        });
        return this.http.get('http://localhost:3000/user/profile/' + userId, { headers: headers })
    }

    favWord(favWord: Word) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const body = JSON.stringify(favWord);
        return this.http.post('http://localhost:3000/user/favWord', body, { headers: headers });
    }


    removeFavWord(favWord: Word) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const body = JSON.stringify(favWord);
        return this.http.post('http://localhost:3000/user/favWord/remove', body, { headers: headers });
    }

    getAllUser() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.getToken()
        });
        return this.http.get('http://localhost:3000/user/allUsers', { headers: headers })
    }

}
