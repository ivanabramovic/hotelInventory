import { HttpEventType } from "@angular/common/http";
import {
	AfterViewChecked,
	AfterViewInit,
	Component,
	DoCheck,
	OnDestroy,
	OnInit,
	QueryList,
	SkipSelf,
	ViewChild,
	ViewChildren,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { catchError, Observable, of, Subject, Subscription } from "rxjs";
import { HeaderComponent } from "../header/header.component";
import { ConfigService } from "../services/config.service";
import { Room, RoomList } from "./rooms";
import { RoomsService } from "./services/rooms.service";

@Component({
	selector: "app-rooms",
	templateUrl: "./rooms.component.html",
	styleUrls: ["./rooms.component.scss"],
})
export class RoomsComponent
	implements OnInit, DoCheck, AfterViewInit, AfterViewChecked
{
	hotelName = "Hilton Hotel";
	numberOfRooms = 10;
	hideRooms = true;
	title = "Room List";

	selectedRoom!: RoomList;

	error$ = new Subject<String>();

	getError$ = this.error$.asObservable();

	priceFilter = new FormControl();

	rooms$ = this.roomsService.getRooms$.pipe(
		catchError((err) => {
			console.log(err);
			this.error$.next(err);
			return of([]);
		})
	);

	rooms: Room = {
		totalRooms: 20,
		availableRooms: 10,
		bookedRooms: 5,
	};

	roomList: RoomList[] = [];

	stream = new Observable((observer) => {
		observer.next("user1");
		observer.next("user2");
		observer.next("user3");
		observer.complete();
		observer.error("error");
	});

	@ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

	@ViewChildren(HeaderComponent)
	headerChilderComponent!: QueryList<HeaderComponent>;

	constructor(
		@SkipSelf() private roomsService: RoomsService,
		private configService: ConfigService
	) {}

	ngAfterViewChecked(): void {}

	ngAfterViewInit(): void {
		this.headerComponent.title = "Rooms View";
		this.headerChilderComponent.last.title = "Last Title";
	}

	//Checks the changes on entire application -- do not use
	ngDoCheck(): void {
		console.log("Do check");
	}

	totalBytes = 0;

	subscription!: Subscription;

	ngOnInit(): void {
		this.roomsService.getPhotos().subscribe((event) => {
			console.log(event);
			switch (event.type) {
				case HttpEventType.Sent: {
					console.log("Request has been made");
					break;
				}
				case HttpEventType.ResponseHeader: {
					console.log("Request success!");
					break;
				}
				case HttpEventType.DownloadProgress: {
					this.totalBytes += event.loaded;
					break;
				}
				case HttpEventType.Response: {
					console.log(event.body);
				}
			}
		});


		this.stream.subscribe({
			next: (value) => console.log(value),
			complete: () => console.log("complete"),
			error: (error) => console.log(error),
		});
		// this.subscription = this.roomsService.getRooms$.subscribe(rooms => {
		//   this.roomList = rooms;
		// })
	}

	toggle() {
		this.hideRooms = !this.hideRooms;
		this.title = "Rooms";
	}

	selectRoom(room: RoomList) {
		this.selectedRoom = room;
	}

	addRoom() {
		const room: RoomList = {
			roomNumber: 8,
			roomType: "Semi-Deluxe Room",
			amenities: "Lots of",
			price: 300,
			photos: "ddsssdd",
			checkinTime: new Date("21-Dec-2022"),
			checkoutTime: new Date("22-Dec-2022"),
			rating: 1.4,
		};

		//this.roomList = [...this.roomList, room];

		this.roomsService.addRoom(room).subscribe((data) => {
			this.roomList.push(room);
			console.log(this.roomList);
		});
	}

	deleteRoom() {
		// ngOnDestroy(){
		//   if(this.subscription){
		//     this.subscription.unsubscribe;
		//   }
		// }
	}
}
