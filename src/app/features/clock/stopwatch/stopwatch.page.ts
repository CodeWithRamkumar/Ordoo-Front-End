import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.page.html',
  styleUrls: ['./stopwatch.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonButton, IonItem, IonLabel, IonList]
})
export class StopwatchPage implements OnInit, OnDestroy {
  time = 0;
  display = '00:00:00';
  isRunning = false;
  laps: string[] = [];
  private interval: any;

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.updateHeaderData({
      title: 'Stopwatch',
      subtitle: 'Precise time measurement',
      image: 'stopwatch',
      imageType: 'icon',
      showBack: true,
      showMenu: true,
      backNavigationUrl: '/workspace/clock'
    });
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.interval = setInterval(() => {
        this.time += 10;
        this.updateDisplay();
      }, 10);
    }
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false;
      clearInterval(this.interval);
    }
  }

  reset() {
    this.stop();
    this.time = 0;
    this.display = '00:00:00';
    this.laps = [];
  }

  lap() {
    if (this.isRunning) {
      this.laps.unshift(this.display);
    }
  }

  private updateDisplay() {
    const minutes = Math.floor(this.time / 60000);
    const seconds = Math.floor((this.time % 60000) / 1000);
    const centiseconds = Math.floor((this.time % 1000) / 10);
    
    this.display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
  }
}