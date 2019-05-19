import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onRecoverPassword(form: NgForm) {
    this.authService.recoverPassword(form).subscribe(
      (res: any) => {
        console.log(res);
        alert(res.message)
      },
      err => {
        console.log(err);
      }
    );
  }

}
