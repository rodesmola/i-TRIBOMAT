import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { UserProfile } from '@app/_models';
import { BehaviorSubject } from 'rxjs';

import { first } from 'rxjs/operators';
import { UserService } from '@app/_services';

@Component({ 
    templateUrl: './profile.component.html' ,
    styleUrls: ['./profile.component.css']})
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
    userLegalStatus: string;
    userMeet: string;
    userSector: string;

    cp_firstName: string;
    cp_lastName: string;
    cp_email: string;
    cp_phone: string;
    cp_fax: string;
    cp_position: string;


      
    private userProfile: BehaviorSubject<UserProfile>;
    // public currentUserProfile: Observable<UserProfile>;

    constructor(
        private userService: UserService,
        private router: Router,      
        private formBuilder: FormBuilder,    

        ) { 
  
        this.userProfile = new BehaviorSubject<UserProfile>(JSON.parse(localStorage.getItem('currentUserProfile')));
        

        this.cp_firstName = "";
        this.cp_lastName = "";
        this.cp_email = "";
        this.cp_phone = "";
        this.cp_fax = "";
        this.cp_position = "";


        this.isSectorOtherSelected = false;
        this.sectorChecklist = [
            {id:0,text:'Transport', value:'transport', isSelected:false},
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
            {id:0,text:'Industry', value:'industry', isSelected:false},
            {id:1,text:'SME', value:'sme', isSelected:false},
            {id:2,text:'Non-profit research org.', value:'nonprofit', isSelected:false},
            {id:3,text:'Public body', value:'publicbody', isSelected:false},
            {id:4,text:'Non-governmental org.', value:'nongovermental',isSelected:false},
            {id:5,text:'Other', value:'statusother',isSelected:false},
        ]
        this.isMeetOtherSelected = false;
        this.meetChecklist = [
            {id:0,text:'Searching a service', value:'searching', isSelected:false},
            {id:1,text:'Congress', value:'congress', isSelected:false},
            {id:2,text:'Social media', value:'socialmedia', isSelected:false},
            {id:3,text:'i-TRIBOMAT web', value:'web', isSelected:false},
            {id:4,text:'Other', value:'meetother',isSelected:false}
        ]
    }

    ngOnInit() {
                     
        console.log(this.userProfile.value)

        if(this.userProfile.value.contactPersons){
            this.cp_firstName = this.userProfile.value.contactPersons[0].firstName;
            this.cp_lastName = this.userProfile.value.contactPersons[0].lastName;
            this.cp_email = this.userProfile.value.contactPersons[0].email;
            this.cp_phone = this.userProfile.value.contactPersons[0].phone;
            this.cp_fax = this.userProfile.value.contactPersons[0].fax
            this.cp_position = this.userProfile.value.contactPersons[0].position
        }


        for (var i = 0; i < this.sectorChecklist.length; i++) {
            if(this.sectorChecklist[i].value === this.userProfile.value.industrial_sector){
                this.sectorChecklist[i].isSelected = true                        
             } // else if (this.userSector == "")      {
            //     this.sectorChecklist[0].isSelected = true 
            //     this.userProfile.value.industrial_sector = 'transport'
            // }
        }

        if(this.sectorChecklist.every(check => check.isSelected == false)){
            this.sectorChecklist[8].isSelected = true
            this.isSectorOtherSelected = true;
            this.userSector = this.userProfile.value.industrial_sector
        }

        for (var i = 0; i < this.statusChecklist.length; i++) {
            if(this.statusChecklist[i].value === this.userProfile.value.legal_status){
                this.statusChecklist[i].isSelected = true                        
            }       
        }

        if(this.statusChecklist.every(check => check.isSelected == false)){
            this.statusChecklist[5].isSelected = true
            this.isStatusOtherSelected = true;
            this.userLegalStatus = this.userProfile.value.legal_status
        }

        for (var i = 0; i < this.meetChecklist.length; i++) {
            if(this.meetChecklist[i].value === this.userProfile.value.how_meet_us){
                this.meetChecklist[i].isSelected = true                        
            }       
        }

        if(this.meetChecklist.every(check => check.isSelected == false)){
            this.meetChecklist[4].isSelected = true
            this.isMeetOtherSelected = true;
            this.userMeet = this.userProfile.value.how_meet_us
        }

        this.profileForm = this.formBuilder.group({
            legal_name: [this.userProfile.value.legal_name, Validators.required],
            short_name: [this.userProfile.value.short_name, Validators.required],
            department: [this.userProfile.value.department, Validators.required],
            street: [this.userProfile.value.street, Validators.required],
            town: [this.userProfile.value.town, Validators.required],
            postcode: [this.userProfile.value.postcode, Validators.required],
            country: [this.userProfile.value.country, Validators.required],
            webpage: [this.userProfile.value.webpage, Validators.required],
            email: [this.userProfile.value.email, Validators.required],
            phone: [this.userProfile.value.phone, Validators.required],
            fax: [this.userProfile.value.fax, Validators.required],
            firstName: [this.cp_firstName, Validators.required],
            lastName: [this.cp_lastName, Validators.required],
            email_cp: [this.cp_email, Validators.required],
            phone_cp: [this.cp_phone, Validators.required],
            fax_cp: [this.cp_fax, Validators.required],
            position_cp: [this.cp_position, Validators.required],
            location: [this.userProfile.value.location, Validators.required],
            invoice_street: [this.userProfile.value.invoice_street, Validators.required],
            invoice_town: [this.userProfile.value.invoice_town, Validators.required],
            invoice_postcode: [this.userProfile.value.invoice_postcode, Validators.required],
            invoice_country: [this.userProfile.value.invoice_country, Validators.required],
            invoice_web: [this.userProfile.value.invoice_web, Validators.required],
            vatNumber: [this.userProfile.value.vatNumber, Validators.required],
            invoice_terms: [this.userProfile.value.invoice_terms, Validators.required],            
            searching: ['true'], 
            congress: ['false'], 
            socialmedia: ['false'], 
            web: ['false'], 
            meetother: ['false'],
            meetotherinput: [this.userProfile.value.how_meet_us],
            transport: ['true'], 
            energy: ['false'],
            machinery: ['false'],
            health: ['false'],
            customergoods: ['false'],
            building: ['false'],
            mining: ['false'],
            agriculture: ['false'],
            sectorother: ['false'],
            sectorotherinput: [this.userProfile.value.industrial_sector],
            industry: ['true'], 
            sme: ['false'],            
            nonprofit: ['false'],
            publicbody: ['false'],
            nongovermental: ['false'],
            statusother: ['false'],
            statusotherinput: [this.userProfile.value.legal_status],
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
                    this.userMeet = ""
                }else{
                    this.isMeetOtherSelected = false;
                    this.userMeet = currentlist[e].value
                }
            }else if(list === 'sector'){
                if (e === 8){
                    this.isSectorOtherSelected = true;
                    this.userSector = ""
                }else{
                    this.isSectorOtherSelected = false;
                    this.userSector = currentlist[e].value
                }
            }else{
                if (e === 5){
                    this.isStatusOtherSelected = true;
                    this.userLegalStatus = ""
                }else{
                    this.isStatusOtherSelected = false;
                    this.userLegalStatus = currentlist[e].value
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

        if(this.statusChecklist[5].isSelected === true){
            this.userLegalStatus = this.f.statusotherinput.value
        }
        if(this.meetChecklist[4].isSelected === true){
            this.userMeet = this.f.meetotherinput.value
        }
        if(this.sectorChecklist[8].isSelected === true){
            this.userSector = this.f.sectorotherinput.value
        }

        var user = {   
            "customer_id": "ATOS",
            "legal_name": this.f.legal_name.value,
            "short_name": this.f.short_name.value,
            "department": this.f.department.value,
            "street": this.f.street.value,
            "town": this.f.town.value,
            "postcode": this.f.postcode.value,
            "country": this.f.country.value,
            "webpage": this.f.webpage.value,
            "location": this.f.location.value,
            "invoice_street": this.f.invoice_street.value,
            "invoice_town": this.f.invoice_town.value,
            "invoice_postcode": this.f.invoice_postcode.value,
            "invoice_country": this.f.invoice_country.value,
            "invoice_web": this.f.invoice_web.value,
            "vatNumber": this.f.vatNumber.value,
            "email": this.f.email.value,
            "phone": this.f.phone.value,
            "fax": this.f.fax.value,
            "invoice_terms": this.f.invoice_terms.value,
            "legal_status": this.userLegalStatus,
            "industrial_sector": this.userSector,
            "how_meet_us": this.userMeet,
            "contactPersons": [
                {
                    "firstName": this.f.firstName.value,
                    "lastName": this.f.lastName.value,                    
                    "email": this.f.email_cp.value,
                    "phone": this.f.phone_cp.value,
                    "fax": this.f.fax_cp.value,
                    "position": this.f.position_cp.value,
                }
            ]
        }

        this.loading = true;
        this.userService.saveProfile(user)
            .pipe(first())
            .subscribe(
                data => {
                    localStorage.setItem('currentUserProfile', JSON.stringify(user));       
                    this.loading = false;
                    this.router.navigate(['/private']);
                },
                error => {
                    this.loading = false;
                    this.error = 'Something went wrong...';
                });

    }

}

