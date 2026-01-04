import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { HeaderService } from 'src/app/shared/services/header.service';
import { addIcons } from 'ionicons';
import { watch, watchOutline } from 'ionicons/icons';

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.page.html',
  styleUrls: ['./analog-clock.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon]
})
export class AnalogClockPage implements OnInit, OnDestroy {
  hourAngle: number = 0;
  minuteAngle: number = 0;
  secondAngle: number = 0;
  currentDate: string = '';
  watchIcon: string = 'watch-outline';
  hours: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  private timeInterval: any;
  private previousSecondAngle: number = 0;
  private previousMinuteAngle: number = 0;
  private previousHourAngle: number = 0;

  constructor(private headerService: HeaderService) {
    addIcons({ watch });
  }

  ngOnInit() {
    this.updateClock();
    this.timeInterval = setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  ionViewDidEnter() {
    this.headerService.updateHeaderData({
      title: 'Analog Clock',
      subtitle: 'Classic clock face',
      image: 'watch',
      imageType: 'icon',
      showBack: true,
      showMenu: true,
      backNavigationUrl: '/workspace/clock'
    });
  }

  private updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    this.hourAngle = (hours * 30) + (minutes * 0.5);
    this.minuteAngle = minutes * 6;
    this.secondAngle = seconds * 6;
    
    this.currentDate = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}