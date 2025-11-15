import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';


@Component({
  selector: 'app-private-layouts',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './private-layouts.component.html',
  styleUrls: ['./private-layouts.component.css']
})

export class PrivateLayoutsComponent {
  role: string = 'admin';
}
