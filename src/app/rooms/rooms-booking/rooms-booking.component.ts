import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit{
  
  constructor(private router: ActivatedRoute){}

  id : Number = 0
  // id$ = this.router.params.pipe(map(params => params['id'])) //it works and can be used 
  id$ = this.router.paramMap.pipe(map((params) => params.get('id')))
  
  ngOnInit(): void {
    // this.id$ = this.router.params.pipe(
    //   map(params => params['id'])
    // )
    // this.id = this.router.snapshot.params['id'] //this will never recieve a new vaule
    // this.router.params.subscribe((params) => {this.id = params['id']})

    // this.router.paramMap.subscribe((params) => { params.get('id')})
  }

  

}
