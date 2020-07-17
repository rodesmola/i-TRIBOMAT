import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/_services';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html'
})
export class ServiceComponent implements OnInit {

  serviceForm: FormGroup;
  loading = false;
  submitted = false;
  // returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    // private router: Router,
    // private route: ActivatedRoute,
    // private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.serviceForm = this.formBuilder.group({      
      sr_description: ['', Validators.required],
    });
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/private';
  }

  get f() { return this.serviceForm.controls; }

  onSubmit() {

  }

}
