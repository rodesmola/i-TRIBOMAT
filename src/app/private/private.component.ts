import { Component, OnInit } from '@angular/core';
import { UserProfile } from '@app/_models';
import { BehaviorSubject } from 'rxjs';
@Component({
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']})
export class PrivateComponent implements OnInit {
  public userProfile: BehaviorSubject<UserProfile>;
  constructor() {
    this.userProfile = new BehaviorSubject<UserProfile>(JSON.parse(localStorage.getItem('currentUserProfile')));
   }

  ngOnInit() {    
  }

  clearStorage(){
    localStorage.removeItem('currentUserProfile');
    console.log("as")
  }

}
