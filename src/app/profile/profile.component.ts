import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router} from '@angular/router';

//import { UserService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: './profile.component.html' })
export class ProfileComponent {
    profileForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        // private userService: UserService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) { }

    ngOnInit() {
        this.profileForm = this.formBuilder.group({
            legal_name: ['1', Validators.required],
            short_name: ['1', Validators.required],
            department: ['1', Validators.required],
            street: ['1', Validators.required],
            town: ['1', Validators.required],
            postcode: ['1', Validators.required],
            country: ['1', Validators.required],
            webpage: ['1', Validators.required],
            email: ['1', Validators.required],
            phone: ['1', Validators.required],
            fax: ['1', Validators.required],
            location: ['1', Validators.required],
            invoice_street: ['1', Validators.required],
            invoice_town: ['1', Validators.required],
            invoice_postcode: ['1', Validators.required],
            invoice_country: ['1', Validators.required],
            invoice_web: ['1', Validators.required],
            vatNumber: ['1', Validators.required],
            invoice_terms: ['1', Validators.required],
            legal_status: ['1', Validators.required],
            industrial_sector: ['1', Validators.required],
            how_meet_us: ['1', Validators.required],
        });
    }
    // convenience getter for easy access to form fields
    get f() { return this.profileForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.profileForm.invalid) {
            return;
        }

        this.loading = true;
        this.router.navigate(['/private']);
        console.log(this.f)
    }
}