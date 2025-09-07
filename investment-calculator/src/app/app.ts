import { Component, signal } from '@angular/core';
import { HeaderComponent } from "./header/header";
import { UserInputComponent } from "./user-input/user-input";

import { InvestmentResultsComponent } from "./investment-results/investment-results";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    
}
