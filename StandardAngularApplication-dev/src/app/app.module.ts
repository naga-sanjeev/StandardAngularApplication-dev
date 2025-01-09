import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CardsComponent } from './components/materialComponents/Elements/cards/cards.component';
import { StandardButtonsComponent } from './components/materialComponents/Elements/standard-buttons/standard-buttons.component';
import { StepperComponent } from './components/materialComponents/Elements/stepper/stepper.component';
import { TabsComponent } from './components/materialComponents/components/tabs/tabs.component';
import { AccordionComponent } from './components/materialComponents/components/accordion/accordion.component';
import { ProgressbarComponent } from './components/materialComponents/components/progressbar/progressbar.component';
import { TooltipandpopoversComponent } from './components/materialComponents/components/tooltipandpopovers/tooltipandpopovers.component';
import { PaginationComponent } from './components/materialComponents/components/pagination/pagination.component';
import { DropdownsComponent } from './components/materialComponents/Elements/dropdowns/dropdowns.component';
import { LinechartComponent } from './components/materialComponents/components/linechart/linechart.component';
import { BarchartComponent } from './components/materialComponents/components/barchart/barchart.component';
import { PiechartComponent } from './components/materialComponents/components/piechart/piechart.component';
import { BarchartsComponent } from './shared/barcharts/barcharts.component';
import { PiechartsComponent } from './shared/piecharts/piecharts.component';
import { CardComponent } from './shared/card/card.component';
import { TabComponent } from './shared/tab/tab.component';
import { SteppersComponent } from './shared/steppers/steppers.component';
import { AccordionsComponent } from './shared/accordions/accordions.component';
import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { CustomButtonsComponent } from './shared/custom-buttons/custom-buttons.component';
import { CarouselComponent } from './components/materialComponents/components/carousel/carousel.component';
import { ModalComponent } from './components/materialComponents/components/modal/modal.component';
import { ModalsComponent } from './shared/modals/modals.component';
import { BadgesComponent } from './components/materialComponents/components/badges/badges.component';
import { ToolbarComponent } from './components/materialComponents/Elements/toolbar/toolbar.component';
import { UserRegistrationComponent } from './shared/user-registration/user-registration.component';
import { ListGroupsComponent } from './components/materialComponents/Elements/list-groups/list-groups.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import { HighchartsChartModule } from 'highcharts-angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TruncatePipe } from './truncate.pipe';
import { HighlightDirective } from './highlight.directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    SharedModule,
    RouterModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatStepperModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatTabsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    HighchartsChartModule,
    CarouselModule,
    MatDialogModule,
    MatToolbarModule,
    MatBadgeModule,
    MatMenuModule,
    MatSidenavModule,
    MatCheckboxModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    CardsComponent,
    StandardButtonsComponent,
    TabsComponent,
    AccordionComponent,
    StepperComponent,
    ProgressbarComponent,
    TooltipandpopoversComponent,
    PaginationComponent,
    DropdownsComponent,
    LinechartComponent,
    BarchartComponent,
    PiechartComponent,
    BarchartsComponent,
    PiechartsComponent,
    CardComponent,
    TabComponent,
    SteppersComponent,
    AccordionsComponent,
    DropdownComponent,
    CustomButtonsComponent,
    CarouselComponent,
    ModalComponent,
    ModalsComponent,
    BadgesComponent,
    ToolbarComponent,
    UserRegistrationComponent,
    ListGroupsComponent,
    TruncatePipe,
    HighlightDirective,
    PageNotFoundComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
