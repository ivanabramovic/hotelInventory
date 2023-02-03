import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../rooms';
import { environment } from '../../../environments/environment'
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig.interace';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(@Inject(APP_SERVICE_CONFIG) private config:AppConfig, 
  private http: HttpClient) {
    console.log(this.config.apiEndpoint)
   }

   roomList: RoomList[] = []

   getRooms$ = this.http.get<RoomList[]>('/api/getRooms').pipe(
    shareReplay(1)
   )


  getRooms(){
    return this.http.get<RoomList[]>('/api/getRooms')
  }

  addRoom(room: RoomList){
    console.log('started')
    return this.http.post<RoomList[]>('/api/addRoom', room)
  }

  getPhotos() {
    const request = new HttpRequest('GET', 'https://jsonplaceholder.typicode.com/photos', {
      reportProgress : true,
    });
    return this.http.request(request);
  }
}
