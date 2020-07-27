import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }


    saveProfile(profile: object) {        
        return this.http.post<any>(`${environment.apiUrl}/customerinfo`, profile)
            .pipe(map(user => {
                return user;
            }));
    }
}