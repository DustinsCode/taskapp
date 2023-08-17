import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  user: string | null;

  constructor(private authService: AuthService, private router: Router){ }
  
  ngOnInit(): void {
    this.authService.getUserName().subscribe((user) => {
      this.user = user;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
