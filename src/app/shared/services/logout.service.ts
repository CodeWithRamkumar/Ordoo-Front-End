import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private authService: AuthService,
    private config: ConfigService,
    private loader: LoaderService
  ) {}

  async logout(): Promise<void> {
    await this.loader.show('Logging out...');
    
    try {
      await this.http.post(this.config.AUTH.LOGOUT, {}).toPromise();
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      await this.authService.clearUserData();
      await this.loader.hide();
      this.navCtrl.navigateRoot('/auth/login');
    }
  }
}