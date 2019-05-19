import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

import { BackendService } from './backend.service';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: "root"
})
export class AuthService {
  token = null;
  userId = null;
  expiryDate: any = null;
  userIdFaked = new Subject();

  httpOptions = {
    headers: null
  };

  constructor(
    public http: HttpClient,
    public backendService: BackendService,
    public router: Router
  ) {
    this.setHeaders();
  }

  isAuth() {
    this.getState();
    if (this.token != null) {
      const expiry = new Date(this.expiryDate).getTime();
      const now = new Date().getTime();
      if (expiry < now) {
        this.logout();
      }
    }
    return this.token != null;
  }

  signIn(form) {
    const email = form.value.email;
    const password = form.value.password;
    this.http
      .post(`${this.backendService.backendUrl}/auth/login`, {
        email,
        password
      })
      .subscribe(
        res => {
          this.setState(res);
          this.router.navigate(["/"]);
        },
        err => {
          console.log(err);
        }
      );
  }

  register(form) {
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;
    console.log(email,password,name)
    this.http
      .put(`${this.backendService.backendUrl}/auth/register`, {
        email,
        password,
        name
      })
      .subscribe(
        (res: any) => {
          this.setState(res);
          this.router.navigate(["/"]);
        },
        err => {
          console.log(err);
        }
      );
  }

  getState() {
    this.token = localStorage.getItem("token");
    this.userId = localStorage.getItem("userId");
    this.expiryDate = localStorage.getItem("expiryDate");
    this.setHeaders();
  }

  setState(res) {
    this.token = res.token;
    this.setHeaders();
    this.userId = res.userId;
    localStorage.setItem("token", this.token);
    localStorage.setItem("userId", this.userId);
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    this.expiryDate = expiryDate.toISOString();
    localStorage.setItem("expiryDate", this.expiryDate);
    this.setAutoLogout(remainingMilliseconds);
  }

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logout();
    }, milliseconds);
  };

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    this.token = null;
    this.setHeaders();
    this.userId = null;
    this.expiryDate = null;
    this.router.navigate(["/login"]);
  }

  recoverPassword(form) {
    const email = form.value.email;
    return this.http.post(`${this.backendService.backendUrl}/auth/password`, {
      email
    });
  }

  setHeaders() {
    this.httpOptions.headers = new HttpHeaders({
      Authorization: "Bearer " + this.token
    });
  }

  setFakeId(fakeId) {
    this.userId = fakeId;
    this.userIdFaked.next();
    this.httpOptions.headers = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      fakeId
    });
  }
}
