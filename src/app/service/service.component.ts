import { Component, OnInit, NgModule  } from '@angular/core';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// import { Router, ActivatedRoute } from '@angular/router';
// import { AuthenticationService } from '@app/_services';


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

  checklist:any;
  gearschecklist: any;
  lubricantchecklist: any;
  isMcOtherSelected: boolean;
  isGearOtherSelected: boolean;
  isLubricantOtherSelected: boolean;

  constructor(
    private formBuilder: FormBuilder,

    // private router: Router,
    // private route: ActivatedRoute,
    // private authenticationService: AuthenticationService
  ) {     
    this.isMcOtherSelected = false;
    this.isGearOtherSelected = false;
    this.isLubricantOtherSelected = false;
    this.checklist = [
      {id:0,text:'Gears', value:'gears', img: './assets/gear.png',isSelected:true},
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
      {id:0,text:'Mineral oil', value:'mineraloil',isSelected:true},
      {id:1,text:'Synthetic oil', value:'syntheticoil',isSelected:false},
      {id:2,text:'Bio lubricant', value:'biolubricant',isSelected:false},
      {id:3,text:'Solid lubricant', value:'solidlubricant',isSelected:false},
      {id:4,text:'Greases', value:'greases',isSelected:false},
      {id:5,text:'Other', value:'lubricantother',isSelected:false}
    ]     
    this.gearschecklist = [
      {id:0,text:'Twin disc', value:'twindisc', img: './assets/twin_disc.png',isSelected:true},
      {id:1,text:'Spur gears (FZG)', value:'spurgears', img: './assets/spur_gear.png',isSelected:false},
      {id:2,text:'Helical gears', value:'helicalgears', img: './assets/helical_gear.png',isSelected:false},
      {id:3,text:'Other', value:'gearsother', img: 'gearsother',isSelected:false}
    ] 
  }

  ngOnInit(): void {
    this.serviceForm = this.formBuilder.group({      
      sr_description: ['', Validators.required],
      gears: ['true'],
      ballbearing: ['false'],
      rollerbearing: ['false'],
      plainbearing: ['false'],
      pistoncylinderliner: ['false'],
      camshaftfollowers: ['false'],
      seals: ['false'],
      surfacefloor: ['false'],
      mcother: ['false'],  
      mcotherinput: [''], 
      twindisc: ['true'],       
      spurgears: ['false'],  
      helicalgears: ['false'],  
      gearsother: ['false'],        
      gearotherinput: [''], 
      mineraloil: ['true'], 
      syntheticoil: ['false'], 
      biolubricant: ['false'],
      solidlubricant: ['false'],
      greases: ['false'],
      lubricantother: ['false'],
      lubricantotherinput: [''], 

    });
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/private';
  }

  isAllSelected(e: number, list: string) {

    var currentlist: any;

    if(list === 'gears'){
      currentlist = this.gearschecklist;
    
    }else if (list === 'lubricant'){
      currentlist = this.lubricantchecklist
    }else{
      currentlist = this.checklist
    }

    for (var i = 0; i < currentlist.length; i++) {
      if(currentlist[i].id != e){
        currentlist[i].isSelected = false        
      }
              
      if(list === 'mc'){
        if (e === 8){
          this.isMcOtherSelected = true;
        }else{
          this.isMcOtherSelected = false;
        }
      }else if(list === 'lubricant'){
        if (e === 5){
          this.isLubricantOtherSelected = true;
        }else{
          this.isLubricantOtherSelected = false;
        }
      }else{
        if (e === 3){
          this.isGearOtherSelected = true;
        }else{
          this.isGearOtherSelected = false;
        }
      }

    }
  }

  get f() { return this.serviceForm.controls; }

  onSubmit() {

  }

}
