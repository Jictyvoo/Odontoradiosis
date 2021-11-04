import { Component, OnInit } from '@angular/core';
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

    constructor() {
        this.supportedCurves = supportedCephalometric.supportedCurves;
        this.supportedPoints = supportedCephalometric.supportedPoints;
        this.selectedCurve = '';
        this.selectedPoint = '';
    }

    ngOnInit(): void {}
}
