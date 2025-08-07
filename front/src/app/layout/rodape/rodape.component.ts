import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rodape',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.scss'],
})
export class RodapeComponent implements OnInit {
  constructor() {}

  public ngOnInit() {}
}
