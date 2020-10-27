import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IUser } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    user: IUser;
    id: string;

    constructor(private userService: UserService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.getUserId();
        if (this.id) {
            this.getUserDetails(this.id);
        }
    }

    getUserId() {
        this.route.params.subscribe(params => {
            this.id = params['userId'];

        });
    }
    getUserDetails(id) {
        this.userService.getUsersProfile(id).subscribe(profile => {
            this.user = profile['user'];
        })
    }

}
