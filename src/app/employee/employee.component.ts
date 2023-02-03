import { AfterContentInit, Component, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [RoomsService]
})
export class EmployeeComponent implements OnInit, AfterContentInit{

  constructor(@Self() private roomService: RoomsService){}

  empName: string = "John";
  
  ngAfterContentInit(): void {

  }
  ngOnInit(): void {

  }


}
