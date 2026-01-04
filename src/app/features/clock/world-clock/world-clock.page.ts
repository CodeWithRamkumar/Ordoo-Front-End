import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonCard, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { HeaderService } from 'src/app/shared/services/header.service';
import { addIcons } from 'ionicons';
import { globeOutline } from 'ionicons/icons';

interface WorldClock {
  city: string;
  timezone: string;
  time: string;
  date: string;
}

@Component({
  selector: 'app-world-clock',
  templateUrl: './world-clock.page.html',
  styleUrls: ['./world-clock.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonCard, IonCardContent]
})
export class WorldClockPage implements OnInit, OnDestroy {
  worldClocks: WorldClock[] = [
    { city: 'Mumbai', timezone: 'Asia/Kolkata', time: '', date: '' },
    { city: 'New York', timezone: 'America/New_York', time: '', date: '' },
    { city: 'London', timezone: 'Europe/London', time: '', date: '' },
    { city: 'Tokyo', timezone: 'Asia/Tokyo', time: '', date: '' },
    { city: 'Sydney', timezone: 'Australia/Sydney', time: '', date: '' },
    { city: 'Dubai', timezone: 'Asia/Dubai', time: '', date: '' },
    { city: 'Los Angeles', timezone: 'America/Los_Angeles', time: '', date: '' }
  ];
  
  globeIcon: string = 'globe-outline';
  private timeInterval: any;

  constructor(private headerService: HeaderService) {
    addIcons({ globeOutline });
  }

  ngOnInit() {
    this.updateWorldClocks();
    this.timeInterval = setInterval(() => {
      this.updateWorldClocks();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  ionViewDidEnter() {
    this.headerService.updateHeaderData({
      title: 'World Clock',
      subtitle: 'Global time zones',
      image: 'globe-outline',
      imageType: 'icon',
      showBack: true,
      showMenu: true,
      backNavigationUrl: '/workspace/clock'
    });
  }

  private updateWorldClocks() {
    this.worldClocks.forEach(clock => {
      const now = new Date();
      const timeInZone = new Date(now.toLocaleString('en-US', { timeZone: clock.timezone }));
      
      clock.time = timeInZone.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      clock.date = timeInZone.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    });
  }
}