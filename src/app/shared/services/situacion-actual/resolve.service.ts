import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenSharePoint } from '../../model/situacion-actual/TokenSharePoint';
import { SituacionActualService } from './situacion-actual.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveService {

  constructor(
    private situacionActualService: SituacionActualService
  ) { }
  resolve(route: ActivatedRouteSnapshot): Observable<TokenSharePoint> {
    return this.situacionActualService.getTokenSharePoint();
}
}
