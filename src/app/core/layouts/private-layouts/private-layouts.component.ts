import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth/auth-service.service';


@Component({
  selector: 'app-private-layouts',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './private-layouts.component.html',
  styleUrls: ['./private-layouts.component.css']
})

export class PrivateLayoutsComponent implements OnInit {
  role: string | null = null;
  private authService = inject(AuthServiceService);

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
  }
}
