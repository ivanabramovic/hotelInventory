import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ChangeDetectionStrategy,
	OnChanges,
	SimpleChanges,
	OnDestroy,
} from "@angular/core";
import { RoomList } from "../rooms";

@Component({
	selector: "app-rooms-list",
	templateUrl: "./rooms-list.component.html",
	styleUrls: ["./rooms-list.component.scss"],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {
	@Input() rooms: RoomList[] = [];
	@Input() title: string = "";
	@Output() roomSelected = new EventEmitter<RoomList>();

	constructor() {}

	@Input() price: number = 0;

	ngOnDestroy(): void {
		console.log("on destroy is called");
	}

	//Monitors the change of the variable
	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
		if (changes["title"]) {
			this.title = changes["title"].currentValue.toUpperCase();
		}
	}

	ngOnInit(): void {}

	selectRoom(room: RoomList) {
		this.roomSelected.emit(room);
	}
}
