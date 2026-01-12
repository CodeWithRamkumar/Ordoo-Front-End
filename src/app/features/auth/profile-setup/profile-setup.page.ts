import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {  IonInput, 
  IonItem, IonIcon, IonText, IonAvatar, IonSelect, IonSelectOption,
  IonTextarea,
  IonContent,
  IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personOutline, callOutline,
  cameraOutline, calendarOutline, 
  checkmarkCircle
} from 'ionicons/icons';
import { CloudinaryService } from '../../../shared/services/cloudinary.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { AuthService } from '../../../shared/services/auth.service';

declare var $: any;

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.page.html',
  styleUrls: ['./profile-setup.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonButton, IonInput,
    IonItem, IonIcon, IonText, IonAvatar, IonSelect, IonSelectOption,
    IonTextarea, CommonModule, ReactiveFormsModule
  ]
})
export class ProfileSetupPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dateOfBirthInput', { static: false }) dateOfBirthInput!: ElementRef;
  
  profileForm: FormGroup;
  selectedImageUrl: string = '';
  selectedFile: File | null = null;
  dob: Date | null = null;
  isDateFocused: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private cloudinaryService: CloudinaryService,
    private loader: LoaderService,
    private authService: AuthService
  ) {
    addIcons({
      personOutline, callOutline, cameraOutline, calendarOutline, checkmarkCircle
    });

    this.profileForm = this.formBuilder.group({
      full_name: ['', [Validators.required, Validators.minLength(2)]],
      phone_number: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      bio: ['', [Validators.required,Validators.maxLength(500)]]
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeDatepicker();
    }, 100);
  }

  ngOnDestroy() {
    this.destroyDatepicker();
  }

  private initializeDatepicker() {
    $(this.dateOfBirthInput.nativeElement).datepicker({
      format: 'mm/dd/yyyy',
      autoclose: true,
      todayHighlight: true,
      minViewMode: 0,
      maxViewMode: 2,
      container: 'body',
      orientation: 'auto'
    }).on('changeDate', (e: any) => {
      this.dob = e.date;
      this.profileForm.patchValue({ dob: e.date });
      this.profileForm.get('dob')?.markAsTouched();
    });
  }

  private destroyDatepicker() {
    $(this.dateOfBirthInput.nativeElement).datepicker('destroy');
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerImageUpload() {
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    fileInput?.click();
  }

  async onSubmit() {
    if (this.isSubmitting) return;
    
    this.profileForm.markAllAsTouched();
    
    if (this.profileForm.valid) {
      this.isSubmitting = true;
      await this.loader.show('Setting up profile...');
      
      if (this.selectedFile) {
        this.cloudinaryService.uploadLargeFile(this.selectedFile).subscribe({
          next: (result) => {
            if (result.type === 4 && result.body) {
              this.updateProfile(result.body.public_id);
            }
          },
          error: async (error) => {
            this.isSubmitting = false;
            await this.loader.hide();
            console.error('Upload failed:', error);
          }
        });
      } else {
        this.updateProfile('');
      }
    }
  }

  private async updateProfile(publicId: string) {
    const profileData = {
      ...this.profileForm.value,
      avatar_url: publicId
    };
    
    this.cloudinaryService.updateProfile(profileData).subscribe({
      next: async (response) => {
        console.log('Profile updated:', response);
        // Update local storage with new profile data
        if (response.profile) {
          await this.authService.updateProfile(response.profile);
        }
        this.isSubmitting = false;
        await this.loader.hide();
        this.navCtrl.navigateRoot('/workspace');
      },
      error: async (error) => {
        this.isSubmitting = false;
        await this.loader.hide();
        console.error('Profile update failed:', error);
      }
    });
  }

  onPhoneInput(event: any) {
    const value = event.target.value.replace(/[^0-9]/g, '');
    const maskedValue = this.formatIndianPhoneNumber(value);
    this.profileForm.patchValue({ phone_number: maskedValue });
  }

  formatIndianPhoneNumber(value: string): string {
    if (!value) return '';
    
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength < 6) return phoneNumber;
    if (phoneNumberLength < 11) {
      return `${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5)}`;
    }
    return `${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5, 10)}`;
  }

  skipSetup() {
    this.navCtrl.navigateRoot('/workspace');
  }

  onDateBlur() {
    this.isDateFocused = false;
    this.profileForm.get('dob')?.markAsTouched();
  }

  // Validation state getters for date input
  get isDateTouched(): boolean {
    return this.profileForm.get('dob')?.touched || false;
  }

  get isDateInvalid(): boolean {
    return this.profileForm.get('dob')?.invalid || false;
  }

  get isDateValid(): boolean {
    return this.profileForm.get('dob')?.valid || false;
  }
}
