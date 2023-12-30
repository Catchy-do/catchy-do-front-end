import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  ApexTheme,
  ApexResponsive,
  ApexPlotOptions
} from "ng-apexcharts";
export type chartrevenue = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid
  markers: ApexMarkers
  responsive: ApexResponsive[];
}
export type chartstatus = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid
  markers: ApexMarkers
  responsive: ApexResponsive[];
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public chartrevenue: chartrevenue = {
    series: [{
      name: "Revenue",
      data: [0, 1, 1.5, 3.5, 2]
    }
    ],
    chart: {
      height: 300,
      type: 'area',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: ['#1b5a90', '#ff9d00', '#DFE5FC'],
    },
    markers: {
      size: 3,
    },
    fill: {
      colors: ['#1b5a90', '#ff9d00', '#DFE5FC'],
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      show: false
    },
    grid: {
      show: false,
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val + "k";
        }
      },
      axisBorder: {
        show: true,
      },
    },
    xaxis: {
      categories: ['2013','2014','2015','2016','2017','2018','2019'],
    },
    responsive: []

  };
  public chartstatus: chartstatus = {
    series: [{
      name: "Mentors",
      data: [100, 20, 90, 50, 120]
    },
    {
      name: "Mentees",
      data: [30, 60, 120, 80, 150]
    }
    ],
    chart: {
      height: 300,
      type: 'area',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: ['#1b5a90','#ff9d00','#DFE5FC'],
    },
    markers: {
      size: 3,
    },
    fill: {
      colors: ['#ffffff', '#ffffff', '#ffffff'],
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      show: false
    },
    grid: {
      show: false,
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val + "k";
        }
      },
      axisBorder: {
        show: true,
      },
    },
    xaxis: {
      categories: ['2013','2014','2015','2016','2017','2018','2019'],
    },
    responsive: []
  };
  constructor() {}

  ngOnInit(): void {
    
  }
}
