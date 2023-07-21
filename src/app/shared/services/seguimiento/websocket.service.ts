import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AutenticacionService } from "../autenticacion/autenticacion.service";
import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {Subject} from "rxjs";
import {APIs} from "../../constants/endpoints";

@Injectable({
  providedIn: "root",
})
export class WebsocketService {

  private topic = '/queue/notify';
  private stompClient: any;
  private interval;
  private webSocket$ = new Subject<string[]>();


  constructor(
    private http: HttpClient,
    private autenticacionService: AutenticacionService
  ) {}

  connect() {
    console.log('Conectando a websocket 1');
    const serverUrl = APIs.seguimiento.websocket;
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const socketApi = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, frame => {
      socketApi.stompClient.subscribe(socketApi.topic, sdkEvent => {
        socketApi.onMessageReceived(sdkEvent);
      });
      console.log('Conectando a websocket 2');
    }, error => console.log('Error => ',  error));
  }

  private onMessageReceived(mensaje) {
    console.log('Mensaje desde el webSocket', JSON.parse(mensaje.body));
    this.webSocket$.next(JSON.parse(mensaje.body));
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected!');
  }

  public getWebSocket$() {
    return this.webSocket$.asObservable();
  }
}
