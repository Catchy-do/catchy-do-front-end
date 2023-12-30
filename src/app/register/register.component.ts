import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
import { ToastrService } from 'ngx-toastr';
import { RegionResp } from '../services/model/regionResp';
import { VilleResp } from '../services/model/villeResp';
import { PaysResp } from '../services/model/paysResp';
import { PublicServicesService } from '../services/public/public-services.service';
import { Resps } from '../services/model/response';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CompetenceResp } from '../services/model/competenceResp';
import { UserInfo } from '../admin/model/userInfo';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  mentors: any = [];
  mentees: any = [];
  reg_type = 'Mentee Register';
  isMentor = 'Are you a Mentor?';
  
  regions!: RegionResp[];
  villes!: VilleResp[];
  pays!: PaysResp[];
  result!: Resps;
  selectedCountry!: PaysResp;
  indexSelection: any;
  registrationForm!: UntypedFormGroup;

  checked: boolean = true;//to hide or to show password characters
  hide: boolean = false;

  passwordConf!: String;
  message: boolean = false;
  gender!: String;

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  files!: File[];
  

  competencesList!: CompetenceResp[];
  selectedCompetence = new Array<CompetenceResp>();
  constructor(
    private toastr: ToastrService,
    public commonService: CommonServiceService,
    public router: Router,
    public pubServices: PublicServicesService,
    public fb: UntypedFormBuilder,public userInfo:UserInfo,
  ) {
    this.registrationForm = new UntypedFormGroup({
      firstName: new UntypedFormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]),
      lastName: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', Validators.compose([Validators.required])),
      adresse: new UntypedFormControl(''),
      sexe: new UntypedFormControl(''),
      phoneNumber: new UntypedFormControl('', Validators.compose([Validators.required, Validators.pattern(("[1-2-3-4-5-6-7-8-9]\\d{7}"))])),
      username: new UntypedFormControl('', Validators.compose([Validators.required])),
      password: new UntypedFormControl('', Validators.compose([Validators.required])),
      passwordConf: new UntypedFormControl('', Validators.compose([Validators.required])),
      villeID: new UntypedFormControl('', Validators.compose([Validators.required])),
      niveau: new UntypedFormControl(''),
      competences: new UntypedFormControl(''),

    });

    this.message = false;
  }

  ngOnInit(): void {
    this.getAllPays();
    this.getAllCompetences();
    
  }
  

  signup() {
    this.userInfo.firstName = this.registrationForm.get('firstName')?.value;
    this.userInfo.lastName = this.registrationForm.get('lastName')?.value;
    this.userInfo.email = this.registrationForm.get('email')?.value;
    this.userInfo.phoneNumber = this.registrationForm.get('phoneNumber')?.value;
    this.userInfo.adresse = this.registrationForm.get('adresse')?.value;
    this.userInfo.sexe = this.registrationForm.get('sexe')?.value;
    this.userInfo.username = this.registrationForm.get('username')?.value;
    this.userInfo.password = this.registrationForm.get('password')?.value;
    this.userInfo.villeID = this.registrationForm.get('villeID')?.value;
    this.userInfo.niveau = this.registrationForm.get('niveau')?.value;
    this.userInfo.isMentor = this.hide;
    //retrieve competence id and intitule from the selected competence
    this.userInfo.competencesId = [];
    this.userInfo.competences = [];
    this.userInfo.competences = this.selectedCompetence;
    this.selectedCompetence.forEach(element => {
      this.userInfo.competencesId.push(element.competenceId);
    });
    console.log(this.userInfo);
    
    
    this.pubServices.addUSer(this.userInfo).subscribe((res) => {
      this.result = res as Resps;

      if (this.result.status == '200') {
        this.toastr.success('', 'Inscription fait avec succès!');
        this.router.navigate(['/login-page']);
      } else {
        this.toastr.error("Erreur se poduise lors de l'inscription : email deja utilisé");
        ;
      }

    });
  }

  changeRegType() {
    if (this.reg_type === 'Mentor Register') {
      this.reg_type = 'Mentee Register';
      this.isMentor = 'Are you a Mentor?';
      //this.userInfo.isMentor = false;
      this.hide = false;
    } else {
      this.reg_type = 'Mentor Register';
      this.isMentor = 'Not a Mentor?';
      //this.userInfo.isMentor = true;
      this.hide = true;
    }
  }

 
  onChangePass(e: any) {
    this.message = false;
    if (e != this.userInfo.password) {
      this.message = true;
    } else {
      this.message = false;
    }
  }
  
  getAllCompetences(){
    this.pubServices.getAllCompetences().subscribe(
      (result) =>{
        this.competencesList = result as any[];
        console.log(this.competencesList);
      }, (error) =>{
        console.log('Error occurred:', error);
      })
  }

  getAllPays() {
    this.pubServices.getAllPays().subscribe(
      (result) => {
        this.result = result as Resps;
        this.pays = this.result.data as PaysResp[];
      }, (error) =>{
        console.log('Error occurred:', error);
      });
  }
  getAllPaysRegion(c: any) {
    this.indexSelection = this.getCountrySelectedIndex(this.selectedCountry.id);
    let p = this.pays.find(x => x.id === this.selectedCountry.id);
    this.pubServices.getAllRegionByCountry(Number(p!.id)).subscribe(
      (result) => {
        this.result = result as Resps;
        this.regions = this.result.data as RegionResp[];
      }, (error) =>{
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
      }, (error) =>{
        console.log('Error occurred:', error);
      });
  }

  fileToBlob(file: File ): Blob  {
    
      return new Blob([file], { type: file.type });
    
  }
  selectFiles(event: any)  {
    
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    // const reader = new FileReader();
    
    // if (this.selectedFiles) {
    //   for (let i = 0; i < this.selectedFiles.length; i++) {
    //     reader.readAsDataURL(this.selectedFiles[i])
    //   }
    // }
    // console.log(this.files);
    
    
  }

  uploadFiles(): void {
    
  
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(this.selectedFiles[i]);
      }
    }
  }

  upload(file: File) {
    //this.confimeChange = false;
    const formData = new FormData();
    formData.append('description', "mentorFiles");
    formData.append('type', "certf");
    // if (this.selectedFiles){
    // for (let i = 0; i < this.selectedFiles.length; i++) {
    //   formData.append('files', this.selectedFiles[i])
    // }}
    formData.append('files', file);
    formData.append('userID', '6');

    this.pubServices.uploadFiles(formData).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {

        case HttpEventType.Sent:
          break;
        case HttpEventType.ResponseHeader:
          break;
        case HttpEventType.UploadProgress:
          //this.progress = Math.round(event.loaded / event.total! * 100);
          break;
        case HttpEventType.Response:
          setTimeout(() => {
            //this.progress = 0;
          }, 1500);
          console.log(event.body)

      }
    })
  }




   // getMentors() {
  //   this.commonService.getMentors().subscribe((res) => {
  //     this.mentors = res;
  //   });
  // }

  // getpatients() {
  //   this.commonService.getpatients().subscribe((res) => {
  //     this.mentees = res;
  //   });
  // }
}
