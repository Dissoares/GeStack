import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nada-encontrado',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './nada-encontrado.component.html',
  styleUrls: ['./nada-encontrado.component.scss'],
})
export class NadaEncontradoComponent implements OnInit {
  @Input() mensagem: string = 'Nenhum registro encontrado!';
  @Input() icone: string = 'search_off';

  constructor() {}

  public ngOnInit() {}
}
