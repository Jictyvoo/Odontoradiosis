import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable()
export class SidenavService {
    private sidenav: MatSidenav | null;

    constructor() {
        this.sidenav = null;
    }

    public setSidenav(sidenav: MatSidenav) {
        this.sidenav = sidenav;
    }

    public open() {
        return this.sidenav?.open();
    }

    public close() {
        return this.sidenav?.close();
    }

    public toggle(): void {
        this.sidenav?.toggle();
    }
}
