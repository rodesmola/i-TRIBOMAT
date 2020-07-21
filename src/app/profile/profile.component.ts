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
    meetChecklist:any;
    isMeetOtherSelected: boolean;
    sectorChecklist:any;
    isSectorOtherSelected: boolean;
    statusChecklist:any;
    isStatusOtherSelected: boolean;

    constructor(
        // private userService: UserService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) { 

        this.isSectorOtherSelected = false;
        this.sectorChecklist = [
            {id:0,text:'Transport', value:'transport', isSelected:true},
            {id:1,text:'Energy', value:'energy', isSelected:false},
            {id:2,text:'Machinery', value:'machinery', isSelected:false},
            {id:3,text:'Health', value:'health', isSelected:false},
            {id:4,text:'Customer goods', value:'customergoods',isSelected:false},
            {id:5,text:'Building and infrastructures', value:'building',isSelected:false},
            {id:6,text:'Mining', value:'mining',isSelected:false},
            {id:7,text:'Agriculture, foresty and fishing', value:'agriculture',isSelected:false},
            {id:8,text:'Other', value:'sectorother',isSelected:false}
        ]
        this.isStatusOtherSelected = false;
        this.statusChecklist = [
            {id:0,text:'Industry', value:'industry', isSelected:true},
            {id:1,text:'SME', value:'sme', isSelected:false},
            {id:2,text:'Non-profit research org.', value:'nonprofit', isSelected:false},
            {id:3,text:'Public body', value:'publicbody', isSelected:false},
            {id:4,text:'Non-governmental org.', value:'nongovermental',isSelected:false},
            {id:5,text:'Other', value:'statusother',isSelected:false},
        ]
        this.isMeetOtherSelected = false;
        this.meetChecklist = [
            {id:0,text:'Searching a service', value:'searching', isSelected:true},
            {id:1,text:'Congress', value:'congress', isSelected:false},
            {id:2,text:'Social media', value:'socialmedia', isSelected:false},
            {id:3,text:'i-TRIBOMAT web', value:'web', isSelected:false},
            {id:4,text:'Other', value:'meetother',isSelected:false}
        ]
    }

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
            first_name: ['1', Validators.required],
            last_name: ['1', Validators.required],
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
            searching: ['true'], 
            congress: ['false'], 
            socialmedia: ['false'], 
            web: ['false'], 
            meetother: ['false'],
            meetotherinput: [''],
            transport: ['true'], 
            energy: ['false'],
            machinery: ['false'],
            health: ['false'],
            customergoods: ['false'],
            building: ['false'],
            mining: ['false'],
            agriculture: ['false'],
            sectorother: ['false'],
            sectorotherinput: [''],
            industry: ['true'], 
            sme: ['false'],            
            nonprofit: ['false'],
            publicbody: ['false'],
            nongovermental: ['false'],
            statusother: ['false'],
            statusotherinput: [''],
        });
    }
    // convenience getter for easy access to form fields
    get f() { return this.profileForm.controls; }

    isAllSelected(e: number, list: string) {

        var currentlist: any;
    
        if(list === 'meet'){
          currentlist = this.meetChecklist;
        
        }else if (list === 'sector'){
            currentlist = this.sectorChecklist
        }else{
           currentlist = this.statusChecklist
        }
    
        for (var i = 0; i < currentlist.length; i++) {
            if(currentlist[i].id != e){
                currentlist[i].isSelected = false        
            }                  
            if(list === 'meet'){
                if (e === 4){
                    this.isMeetOtherSelected = true;
                }else{
                    this.isMeetOtherSelected = false;
                }
            }else if(list === 'sector'){
                if (e === 8){
                    this.isSectorOtherSelected = true;
                }else{
                    this.isSectorOtherSelected = false;
                }
            }else{
                if (e === 5){
                    this.isStatusOtherSelected = true;
                }else{
                    this.isStatusOtherSelected = false;
                }
            }
    
        }
      }

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