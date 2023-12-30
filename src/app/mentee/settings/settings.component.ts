import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { error } from 'console';
import { UserInfo } from 'src/app/admin/model/userInfo';
import { MenteeServicesService } from 'src/app/services/mentee/mentee-services.service';
import { PaysResp } from 'src/app/services/model/paysResp';
import { RegionResp } from 'src/app/services/model/regionResp';
import { Resps } from 'src/app/services/model/response';
import { VilleResp } from 'src/app/services/model/villeResp';
import { PublicServicesService } from 'src/app/services/public/public-services.service';
import { DataStorageService } from 'src/app/services/storage/data-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {

  userImage: string | null = null;
  file!: any;
  res: any;
  confimeChange: boolean = false;
  progress: number = 0;
  uId: any = localStorage.getItem('userId');
  userId: any = parseInt(this.uId);
  settingsForm!: UntypedFormGroup;

  regions!: RegionResp[];
  villes!: VilleResp[];
  pays!: PaysResp[];
  result!: Resps;
  indexSelection: any;
  selectedCountry!: PaysResp;
  defaultVille !: string;





  constructor(
    public userInfo: UserInfo,
    public dataStore: DataStorageService,
    public pubServices: PublicServicesService,
    public fb: UntypedFormBuilder,
    private menteeService: MenteeServicesService) {
    this.settingsForm = new UntypedFormGroup({
      firstName: new UntypedFormControl(''),
      lastName: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', Validators.compose([Validators.required])),
      dateOfBirth: new UntypedFormControl('', Validators.compose([Validators.required])),
      adresse: new UntypedFormControl(''),
      phoneNumber: new UntypedFormControl('', Validators.compose([Validators.required, Validators.pattern(("[1-2-3-4-5-6-7-8-9]\\d{7}"))])),
      villeID: new UntypedFormControl('', Validators.compose([Validators.required])),
      region: new UntypedFormControl('', Validators.compose([Validators.required])),
      zipCode: new UntypedFormControl('', Validators.compose([Validators.required])),
      pays: new UntypedFormControl('', Validators.compose([Validators.required])),

    });

    this.userInfo = this.dataStore.getUserInfo();
  }

  ngOnInit(): void {
    console.log(this.userInfo)
    this.getAllPays();
    this.getuserImage();
    this.menteeService.getUserProfile( this.userInfo.userId).subscribe(
      (result) => {
        let res = result as UserInfo;
      },
      (error) => {
        console.log('Error occurred:', error);
      })
  }


  getuserImage() {
    if (this.userInfo != null)
      for (let s = 0; s < this.userInfo.media.length; s++) {
        if (this.userInfo.media[s].type == "PIC") {
          this.userImage = this.userInfo.media[s].url;
          break;
        }

      }
  }
  onChange(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (e: any) => {
      this.userImage = e.target.result;
      this.confimeChange = true;
    };

  }

  upload() {
    this.confimeChange = false;
    const formData = new FormData();
    formData.append('documentType', "PIC");
    formData.append('files', this.file);
    formData.append('userID', String(this.userInfo.userId));

    this.pubServices.uploadImages(formData).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {

        case HttpEventType.Sent:
          break;
        case HttpEventType.ResponseHeader:
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total! * 100);
          break;
        case HttpEventType.Response:
          setTimeout(() => {
            this.progress = 0;
          }, 1500);
          console.log(event.body)

      }
    })
  }

  cancel() {
    console.log("cancel")
    this.confimeChange = false;
    this.file = null;
    this.getuserImage();
  }
  save() {
    window.scroll(0, 0);
    this.userInfo = this.dataStore.getUserInfo();

    this.dataStore.removeFromStorage('userInfo');
    this.userInfo.firstName = this.settingsForm.get('firstName')?.value;
    this.userInfo.lastName = this.settingsForm.get('lastName')?.value;
    this.userInfo.dateOfBirth = this.settingsForm.get('dateOfBirth')?.value;
    this.userInfo.email = this.settingsForm.get('email')?.value;
    this.userInfo.phoneNumber = this.settingsForm.get('phoneNumber')?.value;
    this.userInfo.adresse = this.settingsForm.get('adresse')?.value;
    this.userInfo.villeID = this.settingsForm.get('villeID')?.value;
    this.userInfo.zipCode = this.settingsForm.get('zipCode')?.value;

    this.menteeService.updateUserProfile(this.userInfo).subscribe(
      (result) => {
        console.log("user updated with success");
        console.log(result);
      }, (error) => {
        console.log('Error occurred:', error);
      });
    this.dataStore.setUserInfo(this.userInfo)

  }

  getAllPays() {
    this.pubServices.getAllPays().subscribe(
      (result) => {
        this.result = result as Resps;
        this.pays = this.result.data as PaysResp[];
      }, (error) => {
        console.log('Error occurred:', error);
      });
  }

  getAllPaysRegion(c: any) {
    console.log(this.selectedCountry)
    this.indexSelection = this.getCountrySelectedIndex(this.selectedCountry.id);
    let p = this.pays.find(x => x.id === this.selectedCountry.id);
    this.pubServices.getAllRegionByCountry(Number(p!.id)).subscribe(
      (result) => {
        this.result = result as Resps;
        this.regions = this.result.data as RegionResp[];
      }, (error) => {
        console.log('Error occurred:', error);
      });
  }
  getCountrySelectedIndex(val: string) {
    return this.pays.findIndex(x => x.id === val);
  }
  getAllRVille(id: any) {
    this.pubServices.getPubVille(id).subscribe(
      (result) => {
        this.result = result as Resps;
        this.villes = this.result.data.children as VilleResp[];
      }, (error) => {
        console.log('Error occurred:', error);
      });
  }
}
