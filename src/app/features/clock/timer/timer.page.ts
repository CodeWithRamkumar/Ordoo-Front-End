import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonItem, IonLabel } from '@ionic/angular/standalone';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonButton, IonInput, IonItem, IonLabel]
})
export class TimerPage implements OnInit, OnDestroy {
  totalTime = 0;
  remainingTime = 0;
  display = '00:00';
  isRunning = false;
  isFinished = false;
  minutes = 0;
  seconds = 0;
  private interval: any;

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.updateHeaderData({
      title: 'Timer',
      subtitle: 'Countdown timer',
      image: 'timer',
      imageType: 'icon',
      showBack: true,
      showMenu: true,
      backNavigationUrl: '/workspace/clock'
    });
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }

  setTimer() {
    this.totalTime = (this.minutes * 60) + this.seconds;
    this.remainingTime = this.totalTime;
    this.isFinished = false;
    this.updateDisplay();
  }

  start() {
    if (this.remainingTime > 0 && !this.isRunning) {
      this.isRunning = true;
      this.interval = setInterval(() => {
        this.remainingTime--;
        this.updateDisplay();
        
        if (this.remainingTime <= 0) {
          this.finish();
        }
      }, 1000);
    }
  }

  pause() {
    this.isRunning = false;
    if (this.interval) clearInterval(this.interval);
  }

  reset() {
    this.pause();
    this.remainingTime = this.totalTime;
    this.isFinished = false;
    this.updateDisplay();
  }

  clear() {
    this.pause();
    this.totalTime = 0;
    this.remainingTime = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.isFinished = false;
    this.display = '00:00';
  }

  private finish() {
    this.isRunning = false;
    this.isFinished = true;
    this.remainingTime = 0;
    this.updateDisplay();
    if (this.interval) clearInterval(this.interval);
  }

  private updateDisplay() {
    const mins = Math.floor(this.remainingTime / 60);
    const secs = this.remainingTime % 60;
    this.display = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}