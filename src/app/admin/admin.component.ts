import {
  Component,
  OnInit,
  ViewEncapsulation,
  Inject,
  AfterViewInit,
} from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
  Params,
  NavigationEnd,
} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { CommonServiceService } from '../common-service.service';
import { AttributeService } from '../attribute.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent implements OnInit {
  adminShow: boolean = true;
  constructor(
    public commonService: CommonServiceService,
    private route: ActivatedRoute,
    public Router: Router,
    public Attributeservice: AttributeService
  ) {
    Router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (
          event.url === '/admin/forgot-pass' ||
          event.url === '/admin/lock-screen' ||
          event.url === '/admin/login-form' ||
          event.url === '/admin/register' ||
          event.url === '/admin/error-first' ||
          event.url === '/admin/error-second'
        ) {
          this.adminShow = false;
        } else {
          this.adminShow = true;
        }
      }
    });
  }
  ngOnInit(): void {
    this.commonService.nextmessage('admin');
    let scope = this;
    setTimeout(() => {
      scope.Router.navigateByUrl('/admin/dashboard');
    }, 100);
    this.Router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        $('html').removeClass('menu-opened');
        $('.sidebar-overlay').removeClass('opened');
        $('.main-wrapper').removeClass('slide-nav');
      }
    });
    this.Attributeservice.adminsideMenuresponsive();
  }
  
}
