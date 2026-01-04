import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { HeaderService } from 'src/app/shared/services/header.service';
import { addIcons } from 'ionicons';
import { play, pause, refresh, flag, timerOutline, stopwatch } from 'ionicons/icons';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.page.html',
  styleUrls: ['./stopwatch.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonButton, IonIcon]
})
export class StopwatchPage implements OnInit, OnDestroy {
  time = 0;
  display = '00:00:00';
  isRunning = false;
  laps: string[] = [];
  circumference = 2 * Math.PI * 96;
  dashOffset = this.circumference;
  private interval: any;

  constructor(private headerService: HeaderService) {
    addIcons({ play, pause, refresh, flag, timerOutline, stopwatch });
  }

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
    this.dashOffset = this.circumference;
  }

  lap() {
    if (this.isRunning) {
      this.laps.unshift(this.display);
      // Scroll to top
      setTimeout(() => {
        const scrollElement = document.querySelector('.laps-scroll');
        if (scrollElement) {
          scrollElement.scrollTop = 0;
        }
      }, 0);
    }
  }

  getBestLap(): string {
    if (this.laps.length === 0) return '--:--:--';
    return this.laps.reduce((best, current) => {
      const bestMs = this.timeToMs(best);
      const currentMs = this.timeToMs(current);
      return currentMs < bestMs ? current : best;
    });
  }

  private timeToMs(timeStr: string): number {
    const [min, sec, cs] = timeStr.split(':').map(Number);
    return (min * 60000) + (sec * 1000) + (cs * 10);
  }

  private updateDisplay() {
    const minutes = Math.floor(this.time / 60000);
    const seconds = Math.floor((this.time % 60000) / 1000);
    const centiseconds = Math.floor((this.time % 1000) / 10);
    
    this.display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
    
    // Fill circle completely every second
    const progress = (this.time % 1000) / 1000;
    this.dashOffset = this.circumference * (1 - progress);
  }
}