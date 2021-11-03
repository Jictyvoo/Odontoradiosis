import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CephalometricCanvasComponent } from './cephalometric-canvas.component';

describe('CephalometricCanvasComponent', () => {
    let component: CephalometricCanvasComponent;
    let fixture: ComponentFixture<CephalometricCanvasComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CephalometricCanvasComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CephalometricCanvasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
