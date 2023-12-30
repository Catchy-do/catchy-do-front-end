import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewEncapsulation,
  AfterViewChecked,
} from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { Location, PlatformLocation } from '@angular/common';
import { CommonServiceService } from './common-service.service';
import { LinkService } from './link.service';
import { AttributeService } from './attribute.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'mentor';
  url:any;
  loadFooter = false;
  show: boolean = true;
  hideFooter: boolean = false;
  isBreadcrumb: boolean = false;
  searchBreadcrumb: boolean = true;
  splitVal:any;
  base = '';
  page = '';

 
  constructor(
    private activeRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    public Router: Router,
    location: Location,
    private link:LinkService,
    public commonServic: CommonServiceService,
    platform: PlatformLocation,
    public Attrubuteservice: AttributeService
  ) {
    platform.onPopState(() => {
      
    });
    Router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
        if (this.Router.url === '/index' || this.Router.url === '/' || this.base === '/admin/') {
          this.show = true;
          this.hideFooter = false;
          this.isBreadcrumb = true;
          this.searchBreadcrumb = true;
        }
         else {
          this.isBreadcrumb = false;
        }
        if (this.base == 'admin') {
          this.show = false;
          this.hideFooter = true;
        }
        if (this.base === 'admin') {
          this.isBreadcrumb = true;
          this.show = false;
          this.hideFooter = true;
          if (this.page === 'error-first' || this.page === 'error-second') {
            document.body.classList.add('error-page');
            document.body.classList.remove('mat-typography');
          } else {
            document.body.classList.remove('error-page');
            document.body.classList.add('mat-typography');
          }
        } else {
          if (
            event.url === '/register' ||
            event.url === '/login-page' ||
            event.url === '/forgot-password'
          ) {
            this.hideFooter = true;
            this.show = false;
            this.isBreadcrumb = true;
            this.searchBreadcrumb = true;
            document.body.classList.add('account-page');
            document.body.classList.remove('mat-typography');
          } else if (
            event.url === '/video-call' ||
            event.url === '/voice-call'
          ) {
            this.isBreadcrumb = true;
            this.searchBreadcrumb = true;
            document.body.classList.add('call-page');
            document.body.classList.remove('mat-typography');
          } else if (event.url === '/map-grid') {
            this.hideFooter = true;
            this.isBreadcrumb = true;
            this.searchBreadcrumb = true;
          } else if (event.url === '/message') {
            this.hideFooter = true;
            this.isBreadcrumb = true;
            this.searchBreadcrumb = true;
          } else if (event.url === '/' || event.url === '/index') {
            this.hideFooter = false;
            this.show = true;
            this.isBreadcrumb = true;
            this.searchBreadcrumb = true;
          } else if (event.url === '/message') {
            this.isBreadcrumb = true;
            this.searchBreadcrumb = true;
          } else if (event.url === '/search-mentor') {
            this.isBreadcrumb = true;
            this.searchBreadcrumb = false;
          } else {
            this.isBreadcrumb = false;
            this.searchBreadcrumb = true;
            this.hideFooter = false;
            this.show = true;
            document.body.classList.remove('account-page');
            document.body.classList.add('mat-typography');
            document.body.classList.remove('call-page');
            document.body.classList.add('mat-typography');
          }
          if (this.page !== undefined) {
            if (this.page === 'mentees') {
              this.page = 'Mentee List';
            } else if (this.page === 'booking') {
              this.page = 'My Bookings';
            } else if (this.page === 'success') {
              this.page = 'Booking Success';
            } else if (this.page === 'settings') {
              this.page = 'Profile Settings';
            } else if (this.page.includes('-') === true) {
              let x = this.page.split('-');
              if (x[1].includes('?') === true) {
                x[1] = x[1].split('?')[0];
              }
              this.page = x[0].toUpperCase() + ' ' + x[1].toUpperCase();
            }
          } else {
            if (this.base === 'blog') {
              this.page = 'Blog List';
            } else if (this.base === 'blank') {
              this.page = 'Blank Page';
            } else {
              if (this.base.includes('-') === true) {
                let x = this.base.split('-');
                if (x[1].includes('?') === true) {
                  x[1] = x[1].split('?')[0];
                }
                this.base = this.page =
                  x[0].toUpperCase() + ' ' + x[1].toUpperCase();
              } else {
                this.page = this.base;
              }
            }
          }
        }
      }
    });
  }
  ngOnInit() {
    setTimeout(() => (this.loadFooter = true), 2000);
    this.Router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        $('html').removeClass('menu-opened');
        $('.sidebar-overlay').removeClass('opened');
        $('.main-wrapper').removeClass('slide-nav');
      }
    });
    this.Attrubuteservice.usersideMenuresponsive();
  }
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
}
