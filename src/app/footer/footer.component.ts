import {Component, OnInit} from '@angular/core';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

    private now: Date;

    constructor() {
        this.now = new Date();
    }

    ngOnInit(): void {
    }

    get currentDate(): number {
        const lastYearEdition = 2024;

        const currentYear = this.now.getFullYear();
        return Math.max(lastYearEdition, currentYear);
    }
}
