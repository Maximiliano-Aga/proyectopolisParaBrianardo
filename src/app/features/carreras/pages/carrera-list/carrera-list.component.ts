import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Carrera } from '../../models/carrera.model';
import { CarreraService } from '../../services/carrera.service';

@Component({
  selector: 'app-carrera-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrera-list.component.html',
  styleUrls: ['./carrera-list.component.css']
})
export class CarreraListComponent implements OnInit {

  public carreras$!: Observable<Carrera[]>;

  constructor(private carreraService: CarreraService) { }

  ngOnInit(): void {
    this.carreras$ = this.carreraService.getCarrerasConMaterias();
  }

}
