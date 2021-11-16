import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
import { DragNDropDirective } from '../directives/drag-n-drop/drag-n-drop.directive';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropzoneDialogComponent } from './dropzone/dropzone-dialog.component';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
    declarations: [
        // Custom Components
        AppComponent,
        HelpPageComponent,
        SidebarComponent,
        ToolbarComponent,
        DropzoneComponent,
        DropzoneDialogComponent,
        HomeComponent,

        // Directives
        DragNDropDirective,
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
        MatProgressBarModule,
        MatDialogModule,

        // Custom Modules
        CephalometricCanvasModule,
    ],
    providers: [SidenavService, CephalometricCanvasService],
    entryComponents: [DropzoneDialogComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
