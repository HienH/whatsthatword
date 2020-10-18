import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

import { Router } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @ViewChild('alert', { static: false }) alert: ElementRef;

    // Flags
    loginForm: FormGroup
    submitted: boolean;

    errorMessage: string;

    constructor(private router: Router, private userService: UserService) { }

    ngOnInit(): void {
        this.createForm();
    }

    // Convenient getter to get access to form control
    get f() { return this.loginForm.controls; }

    // Create login Form
    createForm(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required)
        });
    }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.valid) {
            this.userService.loginUser(this.loginForm.value).subscribe(
                (res) => {
                    if (res["success"]) {
                        this.userService.storeUserData(res['token'])

                        this.router.navigate(['/home']);

                    } else {
                        this.errorMessage = res['message']
                        this.resetForm();
                    }
                },
                (err) => {
                    console.log(err)
                })
        }
    }

    resetForm() {
        this.loginForm.reset();
        this.submitted = false;
    }

    // Close notification message
    closeAlert() {
        this.alert.nativeElement.classList.remove('show');
    }
}
