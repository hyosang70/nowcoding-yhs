import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../main.component.scss']
})
export class LoginComponent implements OnInit {
  userId: string;
  password: string;
  show_pwd: boolean;

  constructor() {
    this.userId = '';
    this.password = '';
  }

  ngOnInit() {}

  toggle_pwd() {
    this.show_pwd = !this.show_pwd;
  }
  test(asd) {
    console.log('TCL: MainComponent -> test -> asd', asd);
  }
}
