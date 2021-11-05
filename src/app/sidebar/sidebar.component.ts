import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/services/sidenav.service';
import { default as supportedCephalometric } from 'src/util/supported-cephalometric';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    supportedCurves: string[];
    selectedCurve: string;

    supportedPoints: string[];
    selectedPoint: string;

    @ViewChild('sidenav')
    public sidenav!: MatSidenav;

    constructor(private sidenavService: SidenavService) {
        this.supportedCurves = supportedCephalometric.supportedCurves;
        this.supportedPoints = supportedCephalometric.supportedPoints;
        this.selectedCurve = '';
        this.selectedPoint = '';
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.sidenavService.setSidenav(this.sidenav);
    }
}
