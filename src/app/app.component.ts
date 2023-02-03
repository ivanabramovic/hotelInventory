import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { localStorageToken } from './localstorage.token'
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 // template: 'Hello World from inline template',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'hotelinventoryapp';

  role = 'Admin';

  // @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef;


  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent)
  //   componentRef.instance.numberOfRooms = 50;
  // }

  constructor(@Inject(localStorageToken) private localStorage: Storage){}


  @ViewChild('name', { static: true }) name!: ElementRef;

  ngOnInit(){
    console.log(this.name);
    this.name.nativeElement.innerText = "Hilton Hotels";
    this.localStorage.setItem('name', 'Hilton Hotel')
  }


}
