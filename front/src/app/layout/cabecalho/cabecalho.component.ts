import { CamposFormularioComponent } from '../../shared/components/index.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss'],
})
export class CabecalhoComponent
  extends CamposFormularioComponent
  implements OnInit
{
  @Output() public ativarSidebar = new EventEmitter<void>();

  constructor() {
    super(new FormBuilder());
  }

  public ngOnInit(): void {}

  public ativar() {
    this.ativarSidebar.emit();
  }
}
