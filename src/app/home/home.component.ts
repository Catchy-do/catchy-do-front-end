import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CommonServiceService } from '../common-service.service';
import { UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
declare const $: any;

export interface Doctors {
  id: number;
  doctor_name: string;
  speciality: string;
  Education: string;
  location: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // encapsulation : ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  specialityList: any = [];
  mentors: any = [];
  slidepage: any;
  positions: any = [];
  employeeCtrl = new UntypedFormControl();
  filteredEmployee: Observable<Doctors[]>;
  blogs: any = [];
  keyword = 'name';
  searchDoctor = [];
  public countries = [
    {
      id: 1,
      name: 'Albania',
      img: 'image',
    },
    {
      id: 2,
      name: 'Belgium',
    },
    {
      id: 3,
      name: 'Denmark',
    },
    {
      id: 4,
      name: 'Montenegro',
    },
    {
      id: 5,
      name: 'Turkey',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    },
  ];
  constructor(
    public router: Router,
    public commonService: CommonServiceService
  ) {
    this.filteredEmployee = this.employeeCtrl.valueChanges.pipe(
      startWith(''),
      map((employee) =>
        employee ? this._filterEmployees(employee) : this.mentors.slice()
      )
    );
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    // this.getspeciality();
    // this.getMentors();
    // this.getblogs();
    // this.getPositions();

    // User's voice slider
    $('.testi-slider').each( () => {
      var $show = $(this).data('show');
      var $arr = $(this).data('arrow');
      var $dots = !$arr;
      var $m_show = $show;
      if ($show == 3) $m_show = $show - 1;
      $(this).slick({
        slidesToShow: $show,
        slidesToScroll: 1,
        arrows: $arr,
        autoplay: false,
        autoplaySpeed: 6000,
        adaptiveHeight: true,
        prevArrow:
          '<button type="button" class="prev-nav"><i class="icon ion-ios-arrow-back"></i></button>',
        nextArrow:
          '<button type="button" class="next-nav"><i class="icon ion-ios-arrow-forward"></i></button>',
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: $m_show,
              slidesToScroll: 1,
              infinite: true,
              arrows: $arr,
              dots: $dots,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
        ],
      });
    });
  }
  private _filterEmployees(value: string): Doctors[] {
    const filterValue = value.toLowerCase();
    return this.mentors.filter(
      (state:any) => state.doctor_name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  slides = [
    {
      img: 'assets/img/user/user1.jpg',
      profile_name: 'Donna Yancey',
      author: 'Digital Marketer',
      country: 'Paris, France',
    },
    {
      img: 'assets/img/user/user2.jpg',
      profile_name: 'James Amen',
      author: 'UNIX, Calculus, Trigonometry',
      country: 'Paris, France',
    },
    {
      img: 'assets/img/user/user3.jpg',
      profile_name: 'Marvin Downey',
      author: 'ASP.NET,Computer Gaming',
      country: ' Paris, France',
    },
    {
      img: 'assets/img/user/user4.jpg',
      profile_name: 'Betty Hairston',
      author: 'Computer Programming',
      country: 'Paris, France',
    },
    {
      img: 'assets/img/user/user.jpg',
      profile_name: 'Jose Anderson',
      author: 'Digital Marketer',
      country: 'Paris, France',
    },
    {
      img: 'assets/img/user/user6.jpg',
      profile_name: 'Aaron Pietrzak',
      author: 'UNIX, Calculus, Trigonometry',
      country: 'Paris, France',
    },
    {
      img: 'assets/img/user/user7.jpg',
      profile_name: 'Brian Martinez',
      author: 'ASP.NET,Computer Gaming',
      country: 'Paris, France',
    },
    {
      img: 'assets/img/user/user9.jpg',
      profile_name: 'Brian Martinez',
      author: 'UNIX, Calculus, Trigonometry',
      country: 'Paris, France',
    },
    {
      img: 'assets/img/user/user15.jpg',
      profile_name: 'Misty Lundy',
      author: 'Computer Programming',
      country: 'Paris, France',
    },
    {
      img: 'assets/img/user/user13.jpg',
      profile_name: 'Vern Campbell',
      author: 'Digital Marketer',
      country: 'Paris, France',
    },
    {
      img: 'assets/img/user/user12.jpg',
      profile_name: 'Jessica Fogarty',
      author: 'UNIX,Calculus,Trigonometry',
      country: 'Paris, France',
    },
    {
      img: 'assets/img/user/user11.jpg',
      profile_name: 'Evelyn Stafford',
      author: 'ASP.NET,Computer Gaming',
      country: 'Paris, France',
    },
  ];
  slideConfig = {
    dots: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  ourtestimonialslides = [
    {
      img: "assets/img/user/user1.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut nulla et erat venenatis cursus. Nulla facilisi. Vestibulum in arcu eu nulla venenatis auctor. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
      name: "Rashed kabir",
      prof: "Designer"
    },
    {
      img: "assets/img/user/user2.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut nulla et erat venenatis cursus. Nulla facilisi. Vestibulum in arcu eu nulla venenatis auctor. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
      name: "Rashed kabir",
      prof: "Designer"
    }
  ]
  ourtestimonialOptions = {
    nav: true,
			items: 1,
			autoplay: true,
			loop: true,
			autoplayTimeout: 5000,
			navText: ["<i class='fas fa-chevron-left owl-nav-left'></i>", "<i class='fas fa-chevron-right owl-nav-right'></i>"]
  }
  getPositions() {
    this.commonService.getPositions().subscribe((res) => {
      this.positions = res;
    });
  }

  getspeciality() {
    this.commonService.getSpeciality().subscribe((res) => {
      this.specialityList = res;
    });
  }

  windowTop() {
    window.scrollTo(0, 0);
  }

  getMentors() {
    this.commonService.getMentors().subscribe((res) => {
      this.mentors = res;
      this.slidepage = {
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
      this.countries = [];
      this.mentors.forEach((index:any, i:any) => {
        this.countries.push({
          id: index.id,
          name: index.doctor_name,
        });
      });
    });
  }

  getblogs() {
    this.commonService.getBlogs().subscribe((res) => {
      this.blogs = res;
    });
  }

  selectEvent(item:any) {
    let filter = this.countries.filter((a) => a.name === item.name);
    this.router.navigateByUrl('/mentor-profile?id=' + filter[0].id);
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e:any) {
    // do something
  }
}
