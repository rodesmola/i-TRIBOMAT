import { Component, OnInit, NgModule  } from '@angular/core';



import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
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

  checklist:any;
  gearschecklist: any;
  isMcOtherSelected: boolean;
  isGearOtherSelected: boolean;

  constructor(
    private formBuilder: FormBuilder,

    // private router: Router,
    // private route: ActivatedRoute,
    // private authenticationService: AuthenticationService
  ) {     
    this.isMcOtherSelected = false;
    this.isGearOtherSelected = false;
    this.checklist = [
      {id:0,text:'Gears', value:'gears',isSelected:true},
      {id:1,text:'Ball bearing', value:'ballbearing',isSelected:false},
      {id:2,text:'Roller bearing', value:'rollerbearing',isSelected:false},
      {id:3,text:'Plain bearing', value:'plainbearing',isSelected:false},
      {id:4,text:'Piston-Cylinder liner', value:'pistoncylinderliner',isSelected:false},
      {id:5,text:'Camshaft/Followers', value:'camshaftfollowers',isSelected:false},
      {id:6,text:'Seals', value:'seals',isSelected:false},
      {id:7,text:'Surface/Floor', value:'surfacefloor',isSelected:false},
      {id:8,text:'Other', value:'mcother',isSelected:false}

    ]  
    this.gearschecklist = [
      {id:0,text:'Twin disc', value:'twindisc',isSelected:true},
      {id:1,text:'Spur gears (FZG)', value:'spurgears',isSelected:false},
      {id:2,text:'Helical gears', value:'helicalgears',isSelected:false},
      {id:3,text:'Other', value:'gearsother',isSelected:false}
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
      twindisc: ['true'],       
      spurgears: ['false'],  
      helicalgears: ['false'],  
      gearsother: ['false'],  
      mcotherinput: [''], 
      gearotherinput: [''], 
    });
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/private';
  }

  isAllSelected(e: number, list: string) {

    var currentlist: any;

    if(list === 'gears'){
      currentlist = this.gearschecklist;
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
