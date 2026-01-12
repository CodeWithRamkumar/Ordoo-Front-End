import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./clock-dashboard/clock-dashboard.page').then(m => m.ClockDashboardPage)
  },
  {
    path: 'digital-clock',
    loadComponent: () => import('./digital-clock/digital-clock.page').then(m => m.DigitalClockPage)
  },
  {
    path: 'analog-clock',
    loadComponent: () => import('./analog-clock/analog-clock.page').then(m => m.AnalogClockPage)
  },
  {
    path: 'world-clock',
    loadComponent: () => import('./world-clock/world-clock.page').then(m => m.WorldClockPage)
  },
  {
    path: 'stopwatch',
    loadComponent: () => import('./stopwatch/stopwatch.page').then(m => m.StopwatchPage)
  },
  {
    path: 'timer',
    loadComponent: () => import('./timer/timer.page').then(m => m.TimerPage)
  },
  {
    path: 'alarm',
    loadComponent: () => import('./alarm/alarm.page').then(m => m.AlarmPage)
  },
  {
    path: 'alarm',
    loadComponent: () => import('./alarm/alarm.page').then( m => m.AlarmPage)
  }
];