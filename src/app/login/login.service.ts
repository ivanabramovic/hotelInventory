import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class LoginService {
	isLoggedIn: boolean = false;

	isAdmin = false;

	constructor() {}

	login(email: string, password: string) {
		if (email == "admin@admin" && password == "555555") {
			//	this.route.navigate(["/rooms", "add"]); way one, under -> way two
			this.isLoggedIn = true;
			this.isAdmin = true;
		}
		if (email == "user@admin" && password == "555555") {
			this.isLoggedIn = true;
			this.isAdmin = false;
		}
		return this.isLoggedIn;
	}
}
