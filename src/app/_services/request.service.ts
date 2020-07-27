import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RequestService {
    constructor(private http: HttpClient) { }


    postRequest(request: object) {        
        return this.http.post<any>(`${environment.apiUrl}/servicerequest`, request)
            .pipe(map(user => {
                return user;
            }));
    }


    

}