import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services';
import * as jwt_decode from 'jwt-decode';
@Component({
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']})
export class PrivateComponent implements OnInit {

  currentUser: any;
  username: string;
  isProfile: boolean;

  constructor(private authenticationService: AuthenticationService) {    
    this.currentUser = this.authenticationService.currentUserValue;    
   }

  ngOnInit() { 
    this.username = jwt_decode(this.currentUser.access_token).given_name; 

    if (localStorage.getItem('isProfile') === 'false'){
      this.isProfile = false;
    }else{
      this.isProfile = true;
    }
    
  }

}
