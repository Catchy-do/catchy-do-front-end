import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { ResizedEvent } from 'angular-resize-event';
import { CommonServiceService } from './../common-service.service';

@Component({
  selector: 'app-map-grid',
  templateUrl: './map-grid.component.html',
  styleUrls: ['./map-grid.component.css'],
})
export class MapGridComponent implements OnInit {
  slider:any;
  infowindow:any = null;
  bounds = new google.maps.LatLngBounds();
  map:any;
  doc_name:any;
  current = 0;
  content: any;
  mapGrid = true;
  mapList = false;
  mentors: any = [];
  locations = [
    {
      id: 1,
      doc_name: 'Ruby Perrin',
      speciality: 'Digital Marketer',
      address: 'Florida, USA',
      next_available: 'Available on Fri, 22 Mar',
      amount: '$300 - $1000',
      lat: 53.470692,
      lng: -2.220328,
      icons: 'default',
      profile_link: 'profile.html',
      total_review: '17',
      image: 'assets/img/user/user.jpg',
    },
    {
      id: 2,
      doc_name: 'Darren Elder',
      speciality: 'Digital Marketer',
      address: 'Newyork, USA',
      next_available: 'Available on Fri, 23 Mar',
      amount: '$50 - $300',
      lat: 53.469189,
      lng: -2.199262,
      icons: 'default',
      profile_link: 'profile.html',
      total_review: '35',
      image: 'assets/img/user/user1.jpg',
    },
    {
      id: 3,
      doc_name: 'Deborah Angel',
      speciality: 'UNIX, Calculus, Trigonometry',
      address: 'Georgia, USA',
      next_available: 'Available on Fri, 24 Mar',
      amount: '$100 - $400',
      lat: 53.468665,
      lng: -2.189269,
      icons: 'default',
      profile_link: 'profile.html',
      total_review: '27',
      image: 'assets/img/user/user2.jpg',
    },
    {
      id: 4,
      doc_name: 'Sofia Brient',
      speciality: 'Computer Programming',
      address: 'Louisiana, USA',
      next_available: 'Available on Fri, 25 Mar',
      amount: '$150 - $250',
      lat: 53.463894,
      lng: -2.17788,
      icons: 'default',
      profile_link: 'profile.html',
      total_review: '4',
      image: 'assets/img/user/user3.jpg',
    },
    {
      id: 5,
      doc_name: 'Marvin Campbell',
      speciality: 'ASP.NET,Computer Gaming',
      address: 'Michigan, USA',
      next_available: 'Available on Fri, 25 Mar',
      amount: '$50 - $700',
      lat: 53.466359,
      lng: -2.213314,
      icons: 'default',
      profile_link: 'profile.html',
      total_review: '66',
      image: 'assets/img/user/user4.jpg',
    },
    {
      id: 6,
      doc_name: 'Katharine Berthold',
      speciality: 'Digital Marketer',
      address: 'Texas, USA',
      next_available: 'Available on Fri, 25 Mar',
      amount: '$100 - $500',
      lat: 53.463906,
      lng: -2.213271,
      icons: 'default',
      profile_link: 'profile.html',
      total_review: '52',
      image: 'assets/img/user/user5.jpg',
    },
    {
      id: 7,
      doc_name: 'Linda Tobin',
      speciality: 'UNIX, Calculus, Trigonometry',
      address: 'Kansas, USA',
      next_available: 'Available on Fri, 25 Mar',
      amount: '$100 - $1000',
      lat: 53.461974,
      lng: -2.210661,
      icons: 'default',
      profile_link: 'profile.html',
      total_review: '43',
      image: 'assets/img/user/user6.jpg',
    },
    {
      id: 8,
      doc_name: 'Paul Richard',
      speciality: 'Computer Programming',
      address: 'California, USA',
      next_available: 'Available on Fri, 25 Mar',
      amount: '$100 - $400',
      lat: 53.458785,
      lng: -2.188532,
      icons: 'default',
      profile_link: 'profile.html',
      total_review: '49',
      image: 'assets/img/user/user7.jpg',
    },
    {
      id: 9,
      doc_name: 'John Gibbs',
      speciality: 'ASP.NET,Computer Gaming',
      address: 'Oklahoma, USA',
      next_available: 'Available on Fri, 25 Mar',
      amount: '$500 - $2500',
      lat: 53.4558571,
      lng: -2.1950372,
      icons: 'default',
      profile_link: 'profile.html',
      total_review: '112',
      image: 'assets/img/user/user8.jpg',
    },
    {
      id: 10,
      doc_name: 'Olga Barlow',
      speciality: 'Periodontology and Oral',
      address: 'Montana, USA',
      next_available: 'Available on Fri, 25 Mar',
      amount: '$75 - $250',
      lat: 53.45885,
      lng: -2.194549,
      icons: 'default',
      profile_link: 'profile.html',
      total_review: '65',
      image: 'assets/img/user/user9.jpg',
    },
    {
      id: 11,
      doc_name: 'Julia Washington',
      speciality: 'Endocrinology',
      address: 'Oklahoma, USA',
      next_available: 'Available on Fri, 25 Mar',
      amount: '$275 - $450',
      lat: 53.461733,
      lng: -2.194502,
      icons: 'default',
      profile_link: 'profile.html',
      total_review: '5',
      image: 'assets/img/user/user10.jpg',
    },
    {
      id: 12,
      doc_name: 'Shaun Aponte',
      speciality: 'Diploma in (DLO)',
      address: 'Indiana, USA',
      next_available: 'Available on Fri, 25 Mar',
      amount: '$150 - $350',
      lat: 53.460548,
      lng: -2.190956,
      icons: 'default',
      profile_link: 'profile.html',
      total_review: '5',
      image: 'assets/img/user/user11.jpg',
    },
  ];
  constructor(
    public Router: Router,
    public commonService: CommonServiceService
  ) {}
  images = [
    {
      path: 'assets/img/features/feature-01.jpg',
    },
    {
      path: 'assets/img/features/feature-02.jpg',
    },
    {
      path: 'assets/img/features/feature-03.jpg',
    },
    {
      path: 'assets/img/features/feature-04.jpg',
    },
  ];

  ngOnInit(): void {
    this.initilize();
    this.getMentors();
    var navbar = document.getElementById('navbar');
  }

  mapGridClick() {
    this.mapGrid = true;
    this.mapList = false;
  }
  mapListClick() {
    this.mapGrid = false;
    this.mapList = true;
  }

  setInfo(marker:any) {
    var content =
      '<div class="profile-widget" style="width: 100%; display: inline-block;">' +
      '<div class="user-avatar">' +
      '<a [routerLink]="/mentor-profile' +
      '" tabindex="0" target="_blank">' +
      '<img class="img-fluid" alt="' +
      marker.doc_name +
      '" src="' +
      marker.image +
      '">' +
      '</a>' +
      '</div>' +
      '<div class="pro-content">' +
      '<h3 class="title">' +
      '<a [routerLink]="/mentor-profile' +
      '" tabindex="0">' +
      marker.doc_name +
      '</a>' +
      '<i class="fas fa-check-circle verified"></i>' +
      '</h3>' +
      '<p class="speciality">' +
      marker.speciality +
      '</p>' +
      '<div class="rating">' +
      '<i class="fas fa-star filled"></i>' +
      '<i class="fas fa-star filled"></i>' +
      '<i class="fas fa-star filled"></i>' +
      '<i class="fas fa-star filled"></i>' +
      '<i class="fas fa-star"></i>' +
      '<span class="d-inline-block average-rating"> (' +
      marker.total_review +
      ')</span>' +
      '</div>' +
      '<ul class="available-info">' +
      '<li><i class="fas fa-map-marker-alt"></i> ' +
      marker.address +
      ' </li>' +
      '<li><i class="far fa-clock"></i> ' +
      marker.next_available +
      '</li>' +
      '<li><i class="far fa-money-bill-alt"></i> ' +
      marker.amount +
      '</li>' +
      '</ul>' +
      '</div>' +
      '</div>';

    this.infowindow.setContent(content);
  }

  initilize() {
    window.location.reload();
    window.stop();
    this.bounds = new google.maps.LatLngBounds();
    const mapOptions = {
      zoom: 14,
      center: { lat: 53.470692, lng: -2.220328 },
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      mapOptions
    );
    this.map.slide = true;

    this.setMarkers(this.map, this.locations);
    this.infowindow = new google.maps.InfoWindow({
      content: 'loading...',
    });
    // google.maps.event.addListener(this.infowindow, 'closeclick', function () {
    //   this.infowindow.close();
    // });
    // this.slider = window.setTimeout(this.show, 3000);
  }
  setMarkers(map:any, locations:any) {
    for (var i = 0; i < locations.length; i++) {
      let item = locations[i];
      let latlng = new google.maps.LatLng(item.lat, item.lng);
      let marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: 'assets/img/marker.png',
      });
      this.bounds.extend(latlng);
      google.maps.event.addListener(marker, 'click', () => {
        this.setInfo(item);
        this.infowindow.open(map, marker);
      });
    }
    map.fitBounds(this.bounds);
    google.maps.event.addListener(map, 'zoom_changed', function () {
      if (map.zoom > 16) map.slide = false;
    });
  }
  mapListclick() {
    this.Router.navigate(['/map-list']);
  }
  getMentors() {
    this.commonService.getMentors().subscribe((res) => {
      this.mentors = res;
    });
  }
}
