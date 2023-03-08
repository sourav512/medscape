import { Component, OnInit } from '@angular/core';
import { BackendService } from './config/backend.service';
import { PageService } from './config/page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'medscape';
  constructor(private pageService : PageService) {
    this.pageService.loadUserDetail()
  }
}
