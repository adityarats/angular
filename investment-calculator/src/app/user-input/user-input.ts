import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentInput } from '../investment-input.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.html',
  styleUrl: './user-input.css'
})
export class UserInputComponent {

enterInitialInvestment = signal('0');
enterAnnualInvestment = signal('0');
enterExpectedReturn = signal('5');
enterDuration = signal('10');

constructor(private investmentService: InvestmentService) {}

  onSubmit() {
    this.investmentService.onCalculateInvestmentResults({
      initialInvestment: +this.enterInitialInvestment(),
      annualInvestment: +this.enterAnnualInvestment(),
      expectedReturn: +this.enterExpectedReturn(),
      duration: +this.enterDuration()
    });
    // Handle the form submissio
    this.enterInitialInvestment.set('0');
    this.enterAnnualInvestment.set('0');
    this.enterExpectedReturn.set('5');
    this.enterDuration.set('10');
  }
}
