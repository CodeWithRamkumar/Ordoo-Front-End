import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

declare var $: any;
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonButton, 
  IonIcon, 
  IonAvatar, 
  IonInput, 
  IonSelect, 
  IonSelectOption, 
  IonTextarea, 
  IonToggle,
  IonItem 
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { CloudinaryService } from '../../../shared/services/cloudinary.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, 
  createOutline, 
  checkmarkOutline, 
  cameraOutline, 
  personOutline, 
  callOutline, 
  transgenderOutline, 
  calendarOutline, 
  documentTextOutline, 
  lockClosedOutline, 
  notificationsOutline, 
  moonOutline, 
  chevronForwardOutline, 
  logOutOutline 
} from 'ionicons/icons';
import { UserProfile } from '../../../core/utils/user-profile.utils';
import { LogoutService } from '../../../shared/services/logout.service';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonButton, 
    IonIcon, 
    IonAvatar, 
    IonInput, 
    IonSelect, 
    IonSelectOption, 
    IonTextarea, 
    IonToggle,
    IonItem,
    CommonModule, 
    FormsModule,
    DateFormatPipe
  ]
})
export class ProfileViewPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('imageUpload') imageUpload!: ElementRef<HTMLInputElement>;
  @ViewChild('dateOfBirthInput', { static: false }) dateOfBirthInput!: ElementRef;

  isEditMode = false;
  notificationsEnabled = true;
  darkModeEnabled = false;
  dob: Date | null = null;
  isDateFocused: boolean = false;

  userProfile: UserProfile = {};
  editProfile: UserProfile = {};
  selectedFile: File | null = null;
  avatar_url_public_id: any;

  constructor(private router: Router, private authService: AuthService, private cloudinaryService: CloudinaryService, private loader: LoaderService, private logoutService: LogoutService) {
    addIcons({
      arrowBackOutline,
      createOutline,
      checkmarkOutline,
      cameraOutline,
      personOutline,
      callOutline,
      transgenderOutline,
      calendarOutline,
      documentTextOutline,
      lockClosedOutline,
      notificationsOutline,
      moonOutline,
      chevronForwardOutline,
      logOutOutline
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.isEditMode) {
        this.initializeDatepicker();
      }
    }, 100);
  }

  ngOnDestroy() {
    this.destroyDatepicker();
  }

  private initializeDatepicker() {
    if (this.dateOfBirthInput?.nativeElement) {
      $(this.dateOfBirthInput.nativeElement).datepicker({
        format: 'M d, yyyy',
        autoclose: true,
        todayHighlight: true,
        minViewMode: 0,
        maxViewMode: 2,
        container: 'body',
        orientation: 'auto'
      }).on('changeDate', (e: any) => {
        this.dob = e.date;
        this.editProfile.dob = this.formatDateDisplay(e.date);
        this.dateOfBirthInput.nativeElement.value = this.formatDateDisplay(e.date);
      });
    }
  }

  private formatDateDisplay(date: Date): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  private destroyDatepicker() {
    if (this.dateOfBirthInput?.nativeElement) {
      $(this.dateOfBirthInput.nativeElement).datepicker('destroy');
    }
  }

  async loadUserProfile() {
    const userData = await this.authService.getUserData();
    if (userData && userData.profile) {
      this.userProfile = {
        full_name: userData.profile.full_name || '',
        email: userData.user?.email || '',
        phone_number: userData.user?.phone_number || '',
        gender: userData.profile.gender || '',
        dob: userData.profile.dob || '',
        bio: userData.profile.bio || '',
        avatar_url: userData.profile.avatar_url || ''
      };
      this.avatar_url_public_id = userData.profile.avatar_url_public_id || '';
      this.editProfile = { ...this.userProfile };
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  toggleEditMode() {
    if (this.isEditMode) {
      this.saveProfile();
    } else {
      this.isEditMode = true;
      this.editProfile = { ...this.userProfile };
      // Initialize datepicker after edit mode is enabled
      setTimeout(() => {
        this.initializeDatepicker();
        // Set the input value to the current date and update has-value class
        if (this.dateOfBirthInput?.nativeElement && this.userProfile.dob) {
          const formattedDate = this.formatDateDisplay(new Date(this.userProfile.dob));
          this.dateOfBirthInput.nativeElement.value = formattedDate;
          this.dob = new Date(this.userProfile.dob);
        }
      }, 100);
    }
  }

  triggerImageUpload() {
    this.imageUpload.nativeElement.click();
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editProfile.avatar_url = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async saveProfile() {
    await this.loader.show('Updating profile...');
    
    try {
      if (this.selectedFile) {
        this.cloudinaryService.uploadLargeFile(this.selectedFile).subscribe({
          next: (result) => {
            if (result.type === 4 && result.body) {
              this.selectedFile = null;
              this.updateProfile(result.body.public_id);
            }
          },
          error: async (error) => {
            await this.loader.hide();
            console.error('Upload failed:', error);
          }
        });
      } else {
        this.updateProfile(this.avatar_url_public_id ? this.avatar_url_public_id:'');
      }
    } catch (error) {
      await this.loader.hide();
      console.error('Failed to save profile:', error);
    }
  }

  private async updateProfile(publicId: string) {
    const profileData = {
      ...this.editProfile,
      dob: this.editProfile.dob ? new Date(this.editProfile.dob).toISOString().split('T')[0] : '',
      avatar_url: publicId
    };
    
    this.cloudinaryService.updateProfile(profileData).subscribe({
      next: async (response) => {
        console.log('Profile updated:', response);
        if (response.profile) {
          await this.authService.updateProfile(response);
        }
        this.userProfile = { ...this.editProfile };
        this.isEditMode = false;
        await this.loader.hide();
      },
      error: async (error) => {
        await this.loader.hide();
        console.error('Profile update failed:', error);
      }
    });
  }

  cancelEdit() {
    this.destroyDatepicker();
    this.isEditMode = false;
    this.editProfile = { ...this.userProfile };
  }

  changePassword() {
    // Navigate to change password page
    this.router.navigate(['/auth/reset-password']);
  }

  logout() {
    this.logoutService.logout();
  }

  onDateBlur() {
    this.isDateFocused = false;
  }

  // Validation state getters for date input
  get isDateTouched(): boolean {
    return true;
  }

  get isDateInvalid(): boolean {
    return false;
  }

  get isDateValid(): boolean {
    return true;
  }
}
