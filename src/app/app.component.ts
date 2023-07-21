import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebsocketService} from "./shared/services/seguimiento/websocket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'encuestas-web';

  constructor(private websocketService: WebsocketService){}

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
    console.log("LA APP SE DESTRUYE");
    throw new Error('Method not implemented.');
  }
}
