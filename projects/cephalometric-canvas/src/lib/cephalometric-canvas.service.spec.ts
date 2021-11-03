import { TestBed } from '@angular/core/testing';

import { CephalometricCanvasService } from './cephalometric-canvas.service';

describe('CephalometricCanvasService', () => {
    let service: CephalometricCanvasService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CephalometricCanvasService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
