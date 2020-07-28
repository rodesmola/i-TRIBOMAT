import { Component, OnInit  } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { RequestService } from '@app/_services';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  serviceForm: FormGroup;
  loading = false;
  submitted = false;
  // returnUrl: string;
  error = '';
  success = '';

  mcChecklist:any;
  gearschecklist: any;
  lubricantchecklist: any;
  natureChecklist: any;
  isMcOtherSelected: boolean;
  isGearOtherSelected: boolean;
  isLubricantOtherSelected: boolean;

  mcValue: any;
  gearValue: any;
  lubricantValue: any;


  constructor(
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private router: Router,
    // private route: ActivatedRoute,
    // private authenticationService: AuthenticationService
  ) {     
    this.isMcOtherSelected = false;
    this.isGearOtherSelected = false;
    this.isLubricantOtherSelected = false;
    this.mcValue = 'none';
    this.gearValue = 'none';
    this.lubricantValue = 'none';

    this.mcChecklist = [
      {id:0,text:'Gears', value:'gears', img: './assets/gear.png',isSelected:false},
      {id:1,text:'Ball bearing', value:'ballbearing', img: './assets/ball_bearing.png',isSelected:false},
      {id:2,text:'Roller bearing', value:'rollerbearing', img: './assets/roller_bearing.png',isSelected:false},
      {id:3,text:'Plain bearing', value:'plainbearing', img: './assets/plain_bearing.png',isSelected:false},
      {id:4,text:'Piston-Cylinder liner', value:'pistoncylinderliner', img: './assets/piston.png',isSelected:false},
      {id:5,text:'Camshaft/Followers', value:'camshaftfollowers', img: './assets/camshaft.png',isSelected:false},
      {id:6,text:'Seals', value:'seals', img: './assets/seals.png',isSelected:false},
      {id:7,text:'Surface/Floor', value:'surfacefloor', img: 'surface',isSelected:false},
      {id:8,text:'Other', value:'mcother', img: 'mcother',isSelected:false}
    ]
    this.lubricantchecklist = [
      {id:0,text:'Mineral oil', value:'mineraloil',isSelected:false},
      {id:1,text:'Synthetic oil', value:'syntheticoil',isSelected:false},
      {id:2,text:'Bio lubricant', value:'biolubricant',isSelected:false},
      {id:3,text:'Solid lubricant', value:'solidlubricant',isSelected:false},
      {id:4,text:'Greases', value:'greases',isSelected:false},
      {id:5,text:'Other', value:'lubricantother',isSelected:false}
    ]     
    this.gearschecklist = [
      {id:0,text:'Twin disc', value:'twindisc', img: './assets/twin_disc.png',isSelected:false},
      {id:1,text:'Spur gears (FZG)', value:'spurgears', img: './assets/spur_gear.png',isSelected:false},
      {id:2,text:'Helical gears', value:'helicalgears', img: './assets/helical_gear.png',isSelected:false},
      {id:3,text:'Other', value:'gearsother', img: 'gearsother',isSelected:false}
    ] 
    this.natureChecklist = [
      {id:0,text:'Standarised tribological characterisation services (experimental)', value:'stc',isSelected:false},
      {id:1,text:'Data driven services', value:'dds',isSelected:false},
      {id:2,text:'Virtual workrooms and up-scaling services (modelling)', value:'vw',isSelected:false},
      {id:3,text:'Complementary services', value:'cs',isSelected:false}
    ]
  }

  ngOnInit(): void {
    this.serviceForm = this.formBuilder.group({      
      sr_description: ['', Validators.required],
      gears: ['false'],
      ballbearing: ['false'],
      rollerbearing: ['false'],
      plainbearing: ['false'],
      pistoncylinderliner: ['false'],
      camshaftfollowers: ['false'],
      seals: ['false'],
      surfacefloor: ['false'],
      mcother: ['false'],  
      mcotherinput: [''], 
      twindisc: ['false'],       
      spurgears: ['false'],  
      helicalgears: ['false'],  
      gearsother: ['false'],        
      gearotherinput: [''], 
      mineraloil: ['false'], 
      syntheticoil: ['false'], 
      biolubricant: ['false'],
      solidlubricant: ['false'],
      greases: ['false'],
      lubricantother: ['false'],
      lubricantotherinput: [''], 
      stc: ['false'],
      dds: ['false'],
      vw: ['false'],
      cs: ['false'],

    });
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/private';
  }

  isAllSelected(e: number, list: string) {

    var currentlist: any;

    if(list === 'gears'){
      currentlist = this.gearschecklist;
    
    }else if (list === 'lubricant'){
      currentlist = this.lubricantchecklist
    }else if (list === 'nature'){
      currentlist = this.natureChecklist
    }else{
      currentlist = this.mcChecklist
    }

    for (var i = 0; i < currentlist.length; i++) {
      if(currentlist[i].id != e){
        currentlist[i].isSelected = false        
      }
              
      if(list === 'mc'){
        if (e === 8){
          this.isMcOtherSelected = true;
          //this.mcValue = this.f.mcotherinput.value;                   
        }else{
          this.isMcOtherSelected = false;
          this.mcValue = currentlist[e].value;
        }
      }else if(list === 'lubricant'){
        if (e === 5){
          this.isLubricantOtherSelected = true;
          //this.lubricantValue = this.f.lubricantotherinput.value;
        }else{
          this.isLubricantOtherSelected = false;         
          this.lubricantValue = currentlist[e].value;
        }
      }else{
        if (e === 3){
          this.isGearOtherSelected = true;
          //this.gearValue = this.f.gearotherinput.value;          
        }else{
          this.isGearOtherSelected = false;          
          this.gearValue = currentlist[e].value;
        }
      }

    }

    this.error = '';
    this.success = '';
  }

  get f() { return this.serviceForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.serviceForm.invalid) {
        return;
    }  

    if(this.isMcOtherSelected){
      this.mcValue = this.f.mcotherinput.value;
    } 
    if(this.isLubricantOtherSelected){
      this.lubricantValue = this.f.lubricantotherinput.value;
    }
    if(this.isGearOtherSelected){
      this.gearValue = this.f.gearotherinput.value;    
    }    

    var request = {
      "customer_id": "ATOS",
      "sr_description": this.f.sr_description.value,
      "sr_mechanicalComponent": this.mcValue,
      "sr_lubricant": this.lubricantValue,
      "sr_lubricantProperties": "none",
      "gears": this.gearValue      
    }

    if(this.natureChecklist[0].isSelected && (this.lubricantValue === "none" || this.gearValue === "none")){
      this.error = 'Please select some option before creating the request';
    }else if(this.natureChecklist.every(check => check.isSelected == false)){
      this.error = 'Please select some option before creating the request';
    }else{
      this.loading = true;
      this.requestService.postRequest(request)
          .pipe(first())
          .subscribe(
              data => {
                this.loading = false;
                this.success = 'Request submitted!';
                //this.router.navigate(['/private']);
              },
              error => {
                this.loading = false;
                this.error = 'Something went wrong...';
              });
    }



  }

}
