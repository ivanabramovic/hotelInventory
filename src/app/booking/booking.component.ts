import { Component, OnInit } from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	FormArray,
	FormControl,
	Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { mergeMap } from "rxjs";
import { ConfigService } from "../services/config.service";
import { BookingService } from "./booking.service";
import { CustomValidator } from "./validators/custom-validator";

@Component({
	selector: "app-booking",
	templateUrl: "./booking.component.html",
	styleUrls: ["./booking.component.scss"],
})
export class BookingComponent implements OnInit {
	bookingForm!: FormGroup;

	constructor(
		private configService: ConfigService,
		private fb: FormBuilder,
		private bookingService: BookingService,
		private route: ActivatedRoute
	) {}

	get guests() {
		return this.bookingForm.get("guests") as FormArray;
	}

	ngOnInit(): void {
		const roomId = this.route.snapshot.paramMap.get("roomid");
		this.bookingForm = this.fb.group(
			{
				roomId: new FormControl(
					{ value: roomId, disabled: true },
					{ validators: [Validators.required] }
				),
				guestEmail: ["", [Validators.required, Validators.email]],
				checkinDate: [""],
				checkoutDate: [""],
				bookingStatus: [""],
				bookingAmount: [""],
				bookingDate: [""],
				mobileNumber: [""],
				guestName: [
					"",
					[
						CustomValidator.ValidateName,
						CustomValidator.ValidateSpecialChar("*"),
					],
				],
				address: this.fb.group({
					guestAddress: ["", [Validators.minLength(5)]],
					guestCity: [""],
					guestState: [""],
					guestCountry: [""],
					guestZipCode: [""],
				}),
				guests: this.fb.array([
					this.fb.group({
						guestName: ["", { validators: [Validators.required] }],
						age: [""],
					}),
				]),
				tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
			},
			{
				updateOn: "blur",
				validators: [CustomValidator.validateCheckinDates],
			}
		);

		this.getBookingData();

		this.bookingForm.valueChanges.subscribe((data) => {
			console.log(data);
		});
	}

	addBooking() {
		// console.log(this.bookingForm.value);
		console.log(this.bookingForm.getRawValue());
		// this.bookingService
		// 	.bookRoom(this.bookingForm.getRawValue())
		// 	.subscribe((data) => {
		// 		console.log(data);
		// 	});
		// this.bookingForm.reset();

		this.bookingForm.valueChanges
			.pipe(mergeMap((data) => this.bookingService.bookRoom(data)))
			.subscribe((data) => console.log(data));
	}

	addGuest() {
		this.guests.push(this.fb.group({ guestName: [""], age: [""] }));
	}

	addPassport() {
		this.bookingForm.addControl("passport", new FormControl(""));
	}
	deletePassport() {
		if (this.bookingForm.get("passport")) {
			this.bookingForm.removeControl("passport");
		}
	}
	deleteGuest(i: number) {
		this.guests.removeAt(i);
	}

	getBookingData() {
		this.bookingForm.patchValue({
			//with setValue, you have to pass all the values from the form
			//patchValue can work with some of the controls
			guestEmail: "test@gmail.com",
			checkinDate: new Date("10-Feb-2023"),
			checkoutDate: "",
			bookingStatus: "",
			bookingAmount: "",
			bookingDate: "",
			mobileNumber: "",
			guestName: "",
			address: {
				guestAddress: "",
				guestCity: "",
				guestState: "",
				guestCountry: "",
				guestZipCode: "",
			},
			guests: [],
			tnc: false,
		});
	}
}
