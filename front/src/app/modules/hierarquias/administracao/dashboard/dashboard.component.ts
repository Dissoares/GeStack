import {
  ChartConfiguration,
  DoughnutController,
  PieController,
  BarController,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  Chart,
} from 'chart.js';
import {
  AfterViewInit,
  Component,
  ViewChild,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { UsuarioService } from '../../../../services';
import { Usuario } from '../../../../core/models';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

Chart.register(
  PieController,
  DoughnutController,
  BarController,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    BaseChartDirective,
    MatIconModule,
    MatCardModule,
    CommonModule,
    MatToolbar,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  private readonly usuarioService = inject(UsuarioService);

  public usuariosAtivos = signal(0);
  public usuariosInativos = signal(0);

  constructor() {}

  public ngOnInit() {
    this.buscarUsuarios();
  }

  public buscarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe({
      next: (usuarios: Array<Usuario>) => {
        this.usuariosAtivos.set(
          usuarios.filter((usuario) => usuario.ativo).length
        );
        this.usuariosInativos.set(
          usuarios.filter((usuario) => !usuario.ativo).length
        );
      },
    });
  }

  public listaUsuarios = computed<ChartConfiguration<'pie'>['data']>(() => ({
    labels: ['Ativos', 'Inativos'],
    datasets: [
      {
        data: [this.usuariosAtivos(), this.usuariosInativos()],
        backgroundColor: ['#4caf50', '#f44336'],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  }));

  public listaSkills: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Java', 'C#', 'Angular', 'Dotnet', 'Spring', 'SQL'],
    datasets: [
      {
        data: [10, 8, 12, 6, 5, 7],
        backgroundColor: [
          '#f44336',
          '#4caf50',
          '#2196f3',
          '#ff9800',
          '#9c27b0',
          '#607d8b',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  public listaDemandas: ChartConfiguration<'bar'>['data'] = {
    labels: [
      'Em andamento',
      'Concluídas',
      'Pendentes',
      'Entregues',
      'Teste hml',
      'Impedimento',
      'Em produção',
    ],
    datasets: [
      {
        label: 'Demandas',
        data: [15, 31, 27, 39, 6, 4, 17],
        backgroundColor: [
          '#0be012ff',
          '#e01608ff',
          '#be850aff',
          '#ce06b3ff',
          '#3649f4ff',
          '#4d0303ff',
          '#010a55ff',
        ],
        borderWidth: 1,
      },
    ],
  };

  public listaDemandasOptions: ChartConfiguration<'bar'>['options'] = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  public listaSkillsOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout: '50%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 15,
          font: { size: 14, weight: 'bold' },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: usado em ${context.parsed} sistemas`,
        },
      },
    },
  };
}
