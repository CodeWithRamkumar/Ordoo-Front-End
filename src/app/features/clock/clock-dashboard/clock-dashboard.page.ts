import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderService } from 'src/app/shared/services/header.service';
import { WorkspaceCardsComponent } from "../../dashboard/workspace-cards/workspace-cards.component";
import { WorkspaceCard } from 'src/app/core/utils/work-space-card';
import { time, watch, stopwatch, globeOutline, timerOutline, alarm } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-clock-dashboard',
  templateUrl: './clock-dashboard.page.html',
  styleUrls: ['./clock-dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, WorkspaceCardsComponent]
})
export class ClockDashboardPage implements OnInit {

  customCards: WorkspaceCard[] = [
    {
      icon: 'time',
      text: 'Digital Clock',
      subtext: 'Modern digital time display',
      route: '/workspace/clock/digital-clock'
    },
    {
      icon: 'watch',
      text: 'Analog Clock',
      subtext: 'Classic analog clock face',
      route: '/workspace/clock/analog-clock'
    },
    {
      icon: 'globe-outline',
      text: 'World Clock',
      subtext: 'Time zones around the world',
      route: '/workspace/clock/world-clock'
    },
    {
      icon: 'stopwatch',
      text: 'Stopwatch',
      subtext: 'Precise time measurement',
      route: '/workspace/clock/stopwatch'
    },
    {
      icon: 'timer-outline',
      text: 'Timer',
      subtext: 'Countdown timer',
      route: '/workspace/clock/timer'
    },
    {
      icon: 'alarm',
      text: 'Alarm',
      subtext: 'Set wake-up alarms',
      route: '/workspace/clock/alarm'
    }
  ];

  pageHeading: string = 'Choose a Clock';
  pageSubHeading: string = 'Select from our collection of clock tools';

  constructor(private headerService: HeaderService) { 
    addIcons({ time, watch, globeOutline, stopwatch, timerOutline, alarm });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    console.log('Clock ionViewDidEnter called');
    this.headerService.updateHeaderData({
      title: 'Clocks',
      subtitle: 'Click back to return',
      image: 'time',
      imageType:'icon',
      showBack: true,
      showMenu: true,
      backNavigationUrl: '/workspace'
    });
  }
}