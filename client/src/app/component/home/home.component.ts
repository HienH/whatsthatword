import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private userService: UserService) { }
    user: object;

    ngOnInit(): void {
        this.userService.getProfile().subscribe(profile => {
            console.log(profile);
            if (profile['success']) {


            } err => {

                console.log(err);
            }
        })
    }

}
