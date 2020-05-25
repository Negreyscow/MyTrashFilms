import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieReadComponent } from './components/movie/movie-read/movie-read.component';
import { MovieEditComponent } from './components/movie/movie-edit/movie-edit.component'
import { MovieCreateComponent } from './components/movie/movie-create/movie-create.component';

import { HttpClientModule } from '@angular/common/http'

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import {MatGridListModule} from '@angular/material/grid-list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio'

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialElevationDirective } from './directives/material-elevation.directive'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MovieComponent,
    MovieReadComponent,
    MovieEditComponent,
    MovieCreateComponent,
    MaterialElevationDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    MatGridListModule,
    NgbModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
