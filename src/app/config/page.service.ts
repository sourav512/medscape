import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  isUserLoggedIn= new Subject<boolean>;
  constructor() { }

}
