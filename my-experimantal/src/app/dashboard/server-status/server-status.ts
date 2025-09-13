import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-status',
  imports: [],
  templateUrl: './server-status.html',
  styleUrl: './server-status.css'
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  currentStatus: 'online' | 'offline' | 'unknown' = 'offline';
  private interval?: ReturnType<typeof setInterval>;

  constructor() {}

  ngOnInit() {
    console.log('ON INIT');
     setInterval(() => {
      const rnd = Math.random(); // 0 - 0.99999

      if (rnd < 0.5){
          this.currentStatus ='online'
      } else if(rnd < 0.9){
         this.currentStatus = 'offline'
      } else {
         this.currentStatus = 'unknown'
      }
    }, 5000)
  }

  ngAfterViewInit(){
    console.log('AFTER VIEW INIT');
  }

  ngOnDestroy(): void {
    clearTimeout(this.interval)
  }
}
