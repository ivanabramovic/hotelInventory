import { DOCUMENT } from "@angular/common";
import {
	Directive,
	ElementRef,
	HostListener,
	Inject,
	Input,
	OnInit,
	Renderer2,
} from "@angular/core";

@Directive({
	selector: "[appHover]",
})
export class HoverDirective implements OnInit {
	// we can pass the color as input property
	@Input() color: string = "lightblue";

	constructor(private element: ElementRef, private renderer: Renderer2) {
		console.log(element);
	}

	ngOnInit(): void {
		// this.element.nativeElement.style.backgroundColor = this.color;
		this.renderer.setStyle(
			this.element.nativeElement,
			"backgroundColor",
			this.color
		);
	}

	@HostListener("mouseenter") onMouseEnter() {
		this.renderer.setStyle(
			this.element.nativeElement,
			"backgroundColor",
			"lightgreen"
		);
	}

	@HostListener("mouseleave") onMouseLeave() {
		this.renderer.setStyle(
			this.element.nativeElement,
			"backgroundColor",
			"white"
		);
	}
}
