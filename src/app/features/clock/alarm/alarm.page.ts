import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonItem, IonLabel, IonList, IonCheckbox } from '@ionic/angular/standalone';
import { HeaderService } from 'src/app/shared/services/header.service';

interface Alarm {
  id: number;
  time: string;
  label: string;
  enabled: boolean;
}

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.page.html',
  styleUrls: ['./alarm.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonButton, IonInput, IonItem, IonLabel, IonList, IonCheckbox]
})
export class AlarmPage implements OnInit, OnDestroy {
  alarms: Alarm[] = [];
  newAlarmTime = '';
  newAlarmLabel = '';
  private checkInterval: any;

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.updateHeaderData({
      title: 'Alarm',
      subtitle: 'Set wake-up alarms',
      image: 'alarm',
      imageType: 'icon',
      showBack: true,
      showMenu: true,
      backNavigationUrl: '/workspace/clock'
    });
    this.startChecking();
  }

  ngOnDestroy() {
    if (this.checkInterval) clearInterval(this.checkInterval);
  }

  addAlarm() {
    if (this.newAlarmTime) {
      this.alarms.push({
        id: Date.now(),
        time: this.newAlarmTime,
        label: this.newAlarmLabel || 'Alarm',
        enabled: true
      });
      this.newAlarmTime = '';
      this.newAlarmLabel = '';
    }
  }

  deleteAlarm(id: number) {
    this.alarms = this.alarms.filter(alarm => alarm.id !== id);
  }

  toggleAlarm(alarm: Alarm) {
    alarm.enabled = !alarm.enabled;
  }

  private startChecking() {
    this.checkInterval = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      this.alarms.forEach(alarm => {
        if (alarm.enabled && alarm.time === currentTime) {
          this.triggerAlarm(alarm);
        }
      });
    }, 1000);
  }

  private triggerAlarm(alarm: Alarm) {
    alert(`⏰ ${alarm.label} - ${alarm.time}`);
    alarm.enabled = false;
  }
}