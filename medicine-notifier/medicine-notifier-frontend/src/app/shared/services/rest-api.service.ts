import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})

export class RestApiService {

    apiURL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
    };

    get(url) {
        return this.http.get(this.apiURL + url, this.httpOptions);
    }

    post(url, body) {
        return this.http.post(this.apiURL + url, body, this.httpOptions);
    }
}
