import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  public error: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  public ngOnInit() {}

  public login(): void {
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        const nivel = this.auth.getNivelAcesso();
        switch (nivel) {
          case 1:
            this.router.navigate(['/admin']);
            break;
          case 2:
            this.router.navigate(['/lider-dev']);
            break;
          case 3:
            this.router.navigate(['/lider-negocio']);
            break;
          case 4:
            this.router.navigate(['/usuario']);
            break;
          default:
            this.router.navigate(['/login']);
        }
      },
      error: () => (this.error = true),
    });
  }
}
