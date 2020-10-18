import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

    storeUserData(token, user) {
        localStorage.setItem('jwt', token);
    }
}
