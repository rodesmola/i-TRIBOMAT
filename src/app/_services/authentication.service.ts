import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User, UserProfile } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    private currentUserProfileSubject: BehaviorSubject<UserProfile>;
    public currentUserProfile: Observable<UserProfile>;
   
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        
        this.currentUserProfileSubject = new BehaviorSubject<UserProfile>(JSON.parse(localStorage.getItem('currentUserProfile')));
        this.currentUserProfile = this.currentUserProfileSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get currentUserProfileValue(): UserProfile {
        return this.currentUserProfileSubject.value;
    }

    login(email: string, password: string) {        
        return this.http.post<any>(`${environment.apiUrl}/login`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes                
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    register(firstname: string, lastname: string, email: string, password: string, password_conf: string) {        
        return this.http.post<any>(`${environment.apiUrl}/register`, { firstname, lastname, email, password, password_conf })
            .pipe(map(userp => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes                
                localStorage.setItem('currentUserProfile', JSON.stringify(userp));
                this.currentUserSubject.next(userp);
                return userp;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}