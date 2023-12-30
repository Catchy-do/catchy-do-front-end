import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';

import { CommonServiceService } from '../../common-service.service';
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  showDropdown = true;
  public bellCollapsed = true;
  public userCollapsed = true;
  splitVal:any;
  base = '';
  page = '';

  constructor(
    public router: Router,
    private commonService: CommonServiceService
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
      }
    });
  }
  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
      $("html").removeClass("menu-opened");
      $(".sidebar-overlay").removeClass("opened");
      $(".main-wrapper").removeClass("slide-nav");
      }
      });
  }

  ngAfterViewInit() {
    this.loadDynmicallyScript('assets/admin/js/script.js');
  }
  loadDynmicallyScript(js:any) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }

  doSomethingWhenScriptIsLoaded() {}
  change(name:any) {
    this.page = name;
    this.commonService.nextmessage('admin');
  }
  home() {
    // this.router.navigate(['/index']);
    window.location.href = '/index';
  }
  main() {
    this.commonService.nextmessage('main');
  }
  clickLogout() {
    window.location.href = '/index';
  }
  bell() {
    this.bellCollapsed = !this.bellCollapsed;
    if (!this.userCollapsed) {
      this.userCollapsed = true;
    }
  }
  user() {
    this.userCollapsed = !this.userCollapsed;
    if (!this.bellCollapsed) {
      this.bellCollapsed = true;
    }
  }
}
