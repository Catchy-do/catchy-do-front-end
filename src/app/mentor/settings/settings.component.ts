import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UserInfo } from 'src/app/admin/model/userInfo';
import { CommonServiceService } from 'src/app/common-service.service';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { MentorServicesService } from 'src/app/services/mentor/mentor-services.service';
import { CompetenceResp } from 'src/app/services/model/competenceResp';
import { Resps } from 'src/app/services/model/response';
import { PublicServicesService } from 'src/app/services/public/public-services.service';
import { DataStorageService } from 'src/app/services/storage/data-storage.service';
declare var $: any;
import { RegionResp } from 'src/app/services/model/regionResp';
import { PaysResp } from 'src/app/services/model/paysResp';
import { VilleResp } from 'src/app/services/model/villeResp';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {

  userImage :string | null=null;
  file!:any;
  res: any;
  confimeChange:boolean=false;
  progress: number=0;
  result!: Resps;
  competencesList!: CompetenceResp[];
  selectedCompetence = new Array<CompetenceResp>();

  uId: any = localStorage.getItem('userId') ;
  userId: any = parseInt(this.uId);
  regions!: RegionResp[];
  villes!: VilleResp[];
  pays!: PaysResp[];
  
  indexSelection: any;
  selectedCountry!: PaysResp;
  defaultVille !: string;
  

  mentorSettingsForm!: UntypedFormGroup;
  selectedFiles?: FileList;

  constructor(    private toastr: ToastrService,
                  private modalService: BsModalService,
                  public router: Router,
                  public commonService: CommonServiceService,
                  public userInfo:UserInfo,
                  public dataStore: DataStorageService,
                  private userAuth:UserAuthService,
                  public mentorService: MentorServicesService,
                  public dialog: MatDialog,
                  public pubServices :PublicServicesService) {
                    // this.mentorSettingsForm = new FormGroup({
                    //   firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]),
                    //   lastName: new FormControl('', [Validators.required]),
                    //   email: new FormControl('', Validators.compose([Validators.required])),
                    //   dateOfBirth: new FormControl('', Validators.compose([Validators.required])),
                    //   adresse: new FormControl(''),
                    //   phoneNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern(("[1-2-3-4-5-6-7-8-9]\\d{7}"))])),
                    //   villeID: new FormControl('', Validators.compose([Validators.required])),
                    //   region: new FormControl('', Validators.compose([Validators.required])),
                    //   zipCode: new FormControl('', Validators.compose([Validators.required])),
                    //   pays: new FormControl('', Validators.compose([Validators.required])),
                    //   niveau: new FormControl('', Validators.compose([Validators.required])),
                    //   competences: new FormControl(''),
                
                    // });

                    this.userInfo=this.dataStore.getUserInfo();
                  }

  ngOnInit(): void {
    this.getAllPays();
    this.getuserImage();
    this.getAllCompetences();
    
    // this.mentorService.getUserProfile(this.userId).subscribe( 
    //   (result) => {
    //     let res = result as UserInfo;
    //     console.log(res);
    // },(error) => {
    //   console.log('Error occurred:', error);
    // })
    
    

    // $('#pricing_select input[name="rating_option"]').on('click',  () => {
    //   if ($(this).val() == 'price_free') {
    //     $('#custom_price_cont').hide();
    //   }
    //   if ($(this).val() == 'custom_price') {
    //     $('#custom_price_cont').show();
    //   } else {
    //   }
    // });


    // $('.education-info').on('click', '.trash',  () => {
    //   $(this).closest('.education-cont').remove();
    //   return false;
    // });

    // $('.add-education').on('click', function () {
    //   var educationcontent =
    //     '<div class="row form-row education-cont">' +
    //     '<div class="col-12 col-md-10 col-lg-11">' +
    //     '<div class="row form-row">' +
    //     '<div class="col-12 col-md-6 col-lg-4">' +
    //     '<div class="form-group">' +
    //     '<label>Degree</label>' +
    //     '<input type="text" class="form-control">' +
    //     '</div>' +
    //     '</div>' +
    //     '<div class="col-12 col-md-6 col-lg-4">' +
    //     '<div class="form-group">' +
    //     '<label>College/Institute</label>' +
    //     '<input type="text" class="form-control">' +
    //     '</div>' +
    //     '</div>' +
    //     '<div class="col-12 col-md-6 col-lg-4">' +
    //     '<div class="form-group">' +
    //     '<label>Year of Completion</label>' +
    //     '<input type="text" class="form-control">' +
    //     '</div>' +
    //     '</div>' +
    //     '</div>' +
    //     '</div>' +
    //     '<div class="col-12 col-md-2 col-lg-1"><label class="d-md-block d-sm-none d-none">&nbsp;</label><a href="javascript:void(0);" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a></div>' +
    //     '</div>';

    //   $('.education-info').append(educationcontent);
    //   return false;
    // });

    // // Experience Add More

    // $('.experience-info').on('click', '.trash',  () => {
    //   $(this).closest('.experience-cont').remove();
    //   return false;
    // });

    // $('.add-experience').on('click', function () {
    //   var experiencecontent =
    //     '<div class="row form-row experience-cont">' +
    //     '<div class="col-12 col-md-10 col-lg-11">' +
    //     '<div class="row form-row">' +
    //     '<div class="col-12 col-md-6 col-lg-4">' +
    //     '<div class="form-group">' +
    //     '<label>Hospital Name</label>' +
    //     '<input type="text" class="form-control">' +
    //     '</div>' +
    //     '</div>' +
    //     '<div class="col-12 col-md-6 col-lg-4">' +
    //     '<div class="form-group">' +
    //     '<label>From</label>' +
    //     '<input type="text" class="form-control">' +
    //     '</div>' +
    //     '</div>' +
    //     '<div class="col-12 col-md-6 col-lg-4">' +
    //     '<div class="form-group">' +
    //     '<label>To</label>' +
    //     '<input type="text" class="form-control">' +
    //     '</div>' +
    //     '</div>' +
    //     '<div class="col-12 col-md-6 col-lg-4">' +
    //     '<div class="form-group">' +
    //     '<label>Designation</label>' +
    //     '<input type="text" class="form-control">' +
    //     '</div>' +
    //     '</div>' +
    //     '</div>' +
    //     '</div>' +
    //     '<div class="col-12 col-md-2 col-lg-1"><label class="d-md-block d-sm-none d-none">&nbsp;</label><a href="javascript:void(0);" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a></div>' +
    //     '</div>';

    //   $('.experience-info').append(experiencecontent);
    //   return false;
    // });

    // // Awards Add More

    // $('.awards-info').on('click', '.trash',  () => {
    //   $(this).closest('.awards-cont').remove();
    //   return false;
    // });

    // $('.add-award').on('click', function () {
    //   var regcontent =
    //     '<div class="row form-row awards-cont">' +
    //     '<div class="col-12 col-md-5">' +
    //     '<div class="form-group">' +
    //     '<label>Awards</label>' +
    //     '<input type="text" class="form-control">' +
    //     '</div>' +
    //     '</div>' +
    //     '<div class="col-12 col-md-5">' +
    //     '<div class="form-group">' +
    //     '<label>Year</label>' +
    //     '<input type="text" class="form-control">' +
    //     '</div>' +
    //     '</div>' +
    //     '<div class="col-12 col-md-2">' +
    //     '<label class="d-md-block d-sm-none d-none">&nbsp;</label>' +
    //     '<a href="javascript:void(0);" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a>' +
    //     '</div>' +
    //     '</div>';

    //   $('.awards-info').append(regcontent);
    //   return false;
    // });

    // // Membership Add More

    // $('.membership-info').on('click', '.trash',  () => {
    //   $(this).closest('.membership-cont').remove();
    //   return false;
    // });

    // $('.add-membership').on('click', function () {
    //   var membershipcontent =
    //     '<div class="row form-row membership-cont">' +
    //     '<div class="col-12 col-md-10 col-lg-5">' +
    //     '<div class="form-group">' +
    //     '<label>Memberships</label>' +
    //     '<input type="text" class="form-control">' +
    //     '</div>' +
    //     '</div>' +
    //     '<div class="col-12 col-md-2 col-lg-2">' +
    //     '<label class="d-md-block d-sm-none d-none">&nbsp;</label>' +
    //     '<a href="javascript:void(0);" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a>' +
    //     '</div>' +
    //     '</div>';

    //   $('.membership-info').append(membershipcontent);
    //   return false;
    // });

    // // Registration Add More

    // $('.registrations-info').on('click', '.trash',  () => {
    //   $(this).closest('.reg-cont').remove();
    //   return false;
    // });

    // $('.add-reg').on('click', function () {
    //   var regcontent =
    //     '<div class="row form-row reg-cont">' +
    //     '<div class="col-12 col-md-5">' +
    //     '<div class="form-group">' +
    //     '<label>Registrations</label>' +
    //     '<input type="text" class="form-control">' +
    //     '</div>' +
    //     '</div>' +
    //     '<div class="col-12 col-md-5">' +
    //     '<div class="form-group">' +
    //     '<label>Year</label>' +
    //     '<input type="text" class="form-control">' +
    //     '</div>' +
    //     '</div>' +
    //     '<div class="col-12 col-md-2">' +
    //     '<label class="d-md-block d-sm-none d-none">&nbsp;</label>' +
    //     '<a href="javascript:void(0);" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a>' +
    //     '</div>' +
    //     '</div>';

    //   $('.registrations-info').append(regcontent);
    //   return false;
    // });
  }
  files: File[] = [];

  onSelect(event:any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  save() {
    window.scrollTo(0, 0);
    this.userInfo = this.dataStore.getUserInfo();
    this.dataStore.removeFromStorage('userInfo');

    this.userInfo.firstName = this.mentorSettingsForm.get('firstName')?.value;
    this.userInfo.lastName = this.mentorSettingsForm.get('lastName')?.value;
    this.userInfo.dateOfBirth = this.mentorSettingsForm.get('dateOfBirth')?.value;
    this.userInfo.email = this.mentorSettingsForm.get('email')?.value;
    this.userInfo.phoneNumber = this.mentorSettingsForm.get('phoneNumber')?.value;
    this.userInfo.adresse = this.mentorSettingsForm.get('adresse')?.value;
    this.userInfo.region = this.mentorSettingsForm.get('region')?.value;
    this.userInfo.villeID = this.mentorSettingsForm.get('villeID')?.value;
    this.userInfo.zipCode = this.mentorSettingsForm.get('zipCode')?.value;
    this.userInfo.pays = this.mentorSettingsForm.get('pays')?.value;
    this.userInfo.niveau = this.mentorSettingsForm.get('niveau')?.value;

    //retrieve competence id and intitule from the selected competence
    this.userInfo.competencesId = [];
    this.userInfo.competences = [];
    this.userInfo.competences = this.selectedCompetence;
    this.selectedCompetence.forEach(element => {
      this.userInfo.competencesId.push( element.competenceId);
    });
    this.pubServices.updateUserProfile(this.userInfo).subscribe(
      (result) => {
        console.log("user updated with success");
        console.log(result);
      }, (error) =>{
        console.log('Error occurred:', error);
      });
    this.dataStore.setUserInfo(this.userInfo);

    
  }

  
  upload() {
    this.confimeChange=false;
    const formData = new FormData();
    formData.append('documentType' ,"PIC");
    formData.append('files', this.file);
    formData.append('userID' ,String( this.userInfo.userId));

    this.pubServices.uploadImages(formData).subscribe((event: HttpEvent<any>) => {
    switch (event.type)
    {

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

    }})
  }
  cancel(){
    console.log("cancel")
    this.confimeChange=false;
    this.file=null;
    this.getuserImage();
  }

onChange(event :any) {
  this.file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(this.file);
      reader.onload = (e: any) => {
        this.userImage = e.target.result;
        this.confimeChange=true;
      };
    
  }
  getuserImage() {
    if(this.userInfo!=null)
    for (let s = 0; s <  this.userInfo.media.length; s++) {
      if (this.userInfo.media[s].type == "PIC") {
        this.userImage= this.userInfo.media[s].url;
        break;
      }
      
    }
  }

  getAllCompetences(){
    this.pubServices.getAllCompetences().subscribe(
      (result) =>{
        this.competencesList = result as CompetenceResp[];
        console.log(this.competencesList);
      }, (error) =>{
        console.log('Error occurred:', error);
      })
  }
  getCompetenceSelectedIndex(val: string) {
    return this.competencesList.findIndex(x => x.intitule === val);
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
        console.log( this.regions)
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

  selectFiles(event: any)  {
    
    //this.progressInfos = [];
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
        this.uploadf(this.selectedFiles[i]);
      }
    }
  }

  uploadf(file: File) {
    //this.confimeChange = false;
    const formData = new FormData();
    formData.append('description', "mentorFiles");
    formData.append('type', "certf");
    // if (this.selectedFiles){
    // for (let i = 0; i < this.selectedFiles.length; i++) {
    //   formData.append('files', this.selectedFiles[i])
    // }}
    formData.append('files', file);
    formData.append('userID', String( this.userInfo.userId));

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




}

