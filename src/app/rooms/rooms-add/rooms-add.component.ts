import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { RoomList } from "../rooms";
import { RoomsService } from "../services/rooms.service";

@Component({
	selector: "app-rooms-add",
	templateUrl: "./rooms-add.component.html",
	styleUrls: ["./rooms-add.component.scss"],
})
export class RoomsAddComponent implements OnInit {
	room: RoomList = {
		roomNumber: 0,
		roomType: "",
		amenities: "",
		photos: "",
		price: 0,
		checkinTime: new Date(),
		checkoutTime: new Date(),
		rating: 0,
	};

	successMessage: String = "";

	constructor(private roomsService: RoomsService) {}

	ngOnInit(): void {}

	AddRoom(roomsForm: NgForm) {
		this.roomsService
			.addRoom(this.room)
			.subscribe((data) => (this.successMessage = "Room Added."));
		roomsForm.reset();
	}
}
