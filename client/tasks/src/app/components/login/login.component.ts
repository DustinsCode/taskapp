import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router){}
  
  ngOnInit(): void {
    if(this.authService.isLoggedIn) {
      this.router.navigateByUrl('');
    }
  }

  /**
   * //TODO: Gracefully handle submission error.  Authentication is mocked here, but ideally if the user provided
   * a username for an account that was not yet created, we would provide that feedback here and give them an 
   * option to create an account, but instead the backend will create a new "User" object for now.
   */
  onSubmit() {
    this.authService.login(this.loginForm.value.userName).subscribe((value) => {
      if(value === 200){
        this.router.navigateByUrl('')
      }else {
        console.error(`receieved ${value} status from server`)
      }
    });
  }

}
