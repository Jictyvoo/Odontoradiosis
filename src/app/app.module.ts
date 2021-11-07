import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    CephalometricCanvasModule,
    CephalometricCanvasService,
} from 'cephalometric-canvas';
import { SidenavService } from 'src/services/sidenav.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
    declarations: [
        // Custom Components
        AppComponent,
        HelpPageComponent,
        SidebarComponent,
        ToolbarComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,

        // Angular Material Components
        MatSelectModule,
        MatIconModule,
        MatSliderModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatCardModule,

        // Custom Modules
        CephalometricCanvasModule,
    ],
    providers: [SidenavService, CephalometricCanvasService],
    bootstrap: [AppComponent],
})
export class AppModule {}
