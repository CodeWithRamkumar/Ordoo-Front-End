import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading: HTMLIonLoadingElement | null = null;

  constructor(private loadingController: LoadingController) {}

  async show(message: string = 'Loading...') {
    try {
      if (this.loading) {
        await this.hide();
      }
      
      this.loading = await this.loadingController.create({
        message,
        spinner: 'circular'
      });
      
      await this.loading.present();
    } catch (error) {
      console.error('Error showing loader:', error);
    }
  }

  async hide() {
    try {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
      }
    } catch (error) {
      console.error('Error hiding loader:', error);
    }
  }
}