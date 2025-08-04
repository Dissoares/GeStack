import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  nome = '';
  email = '';
  username = '';
  password = '';
  confirm = '';
  error = '';
  success = false;

  constructor(private auth: AuthService, private router: Router) {}

  public ngOnInit() {}

  public cadastro(): void {
    if (this.password !== this.confirm) {
      this.error = 'As senhas não coincidem.';
      return;
    }

    this.auth
      .cadastro(this.nome, this.email, this.username, this.password)
      .subscribe({
        next: () => {
          this.success = true;
          this.router.navigate(['/login']);
        },
        error: () => (this.error = 'Erro ao registrar. Verifique os dados.'),
      });
  }
}
