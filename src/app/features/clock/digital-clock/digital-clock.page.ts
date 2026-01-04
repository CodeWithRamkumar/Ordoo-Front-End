import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { HeaderService } from 'src/app/shared/services/header.service';
import { addIcons } from 'ionicons';
import { time } from 'ionicons/icons';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.page.html',
  styleUrls: ['./digital-clock.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent]
})
export class DigitalClockPage implements OnInit, OnDestroy {
  currentTime: string = '';
  currentDate: string = '';
  timeIcon: string = 'time-outline';
  private timeInterval: any;

  constructor(private headerService: HeaderService) {
    addIcons({ time });
  }

  ngOnInit() {
    this.updateTime();
    this.timeInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  ionViewDidEnter() {
    this.headerService.updateHeaderData({
      title: 'Digital Clock',
      subtitle: 'Current time display',
      image: 'time',
      imageType: 'icon',
      showBack: true,
      showMenu: true,
      backNavigationUrl: '/workspace/clock'
    });
  }

  private updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    this.currentDate = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}