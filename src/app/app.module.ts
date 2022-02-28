import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ProfileHubComponent } from './profile-hub/profile-hub.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FundsComponent } from './funds/funds.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BillingComponent } from './billing/billing.component';
import { FormsModule } from '@angular/forms';

const routes: Routes =[
  {path: "", component: HomeComponent},
  {path: "profile", component: ProfileHubComponent},
  {path: "billing", component: BillingComponent},
  {path: "funds", component: FundsComponent},
  {path: "portfolio", component: PortfolioComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProfileHubComponent,
    HomeComponent,
    FundsComponent,
    PortfolioComponent,
    BillingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
