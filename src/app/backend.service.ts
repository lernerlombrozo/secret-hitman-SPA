import { Injectable } from '@angular/core';


@Injectable({
  providedIn: "root"
})
export class BackendService {
  constructor() {}
  // backendUrl = "https://sec-hit.herokuapp.com";
  backendUrl = "http://localhost:3000";
}
