import { AfterViewInit, Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { Chart } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { LandPriceComponent } from '../land-price/land-price.component';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, AfterViewInit {
  fetchedData: any;
  @ViewChild('lineChartSection') lineChartSection!: ElementRef;

  showChart: boolean = false; 
  allYearPrices: { year: number, price: number }[] = []; // Array to store all years with prices

  constructor(private dataService: DataService, private router: Router,
     private sharedservice: SharedService,private dialog: MatDialog) {}

  ngOnInit() {
    this.dataService.getData().subscribe(
      (data: any) => {
        this.fetchedData = data;
        this.sharedservice._fetchedData = data;
        console.log("data", this.fetchedData[0].owners);

        if (this.fetchedData[0] ?.owners) {
          this.extractAllYearPrices();
          console.log(this.allYearPrices)
        }
      }
    );console.log(this.allYearPrices)
  }
  ngAfterViewInit() {
    this.drawLineChart();
  }

  extractAllYearPrices() {
    const pricesByYear: { [key: number]: number } = {};
  
    this.fetchedData[0].owners.forEach((owner: any) => { 
      if (owner ?.owners) {
        let year = new Date(owner.ownershipDurationFrom).getFullYear();
        owner.owners.forEach((ownerDetail: any) => { 
          if (ownerDetail ?.purchasePrice) {
            const purchasePrice = parseFloat(ownerDetail.purchasePrice);
            if (!isNaN(purchasePrice)) {
              pricesByYear[year] = purchasePrice;
            }
          }
        });
      }
    });
  
    const pricesCount = Object.keys(pricesByYear).length;
    if (pricesCount >= 2) {
      const priceYears = Object.keys(pricesByYear).map(Number);
      const priceChangeRate = (pricesByYear[priceYears[pricesCount - 1]] - pricesByYear[priceYears[0]]) / (pricesCount - 1);
  
      const numYearsToPredict = 3; 
      const currentYear = new Date().getFullYear();

      for (let i = 0; i <= numYearsToPredict; i++) {
        const futureYear = currentYear + i;
        const predictedPrice = Math.round(pricesByYear[priceYears[pricesCount - 1]] + (priceChangeRate * i));
        pricesByYear[futureYear] = predictedPrice;
      }
    }
  
    this.allYearPrices = Object.entries(pricesByYear).map(([year, price]) => ({ year: parseInt(year), price }));
  
    this.allYearPrices.sort((a, b) => a.year - b.year);
  }
  

  goToMap(): void {
    this.router.navigate(['/map-display']);
  }

  goToLandPrice(): void {
    this.router.navigate(['/land-price']);
  }

  private drawLineChart() {

    const purchasePricesArray = this.allYearPrices;
    const dataset: { x: number; y: number }[] = [];
  
    purchasePricesArray.forEach((pricesObj: any) => {
      const year = pricesObj.year;
      const price = pricesObj.price;
  
      if (!isNaN(year) && !isNaN(price)) {
        dataset.push({ x: year, y: price });
      }
    });
  
    dataset.sort((a, b) => a.x - b.x);
  
    const years = dataset.map(data => data.x);
  
    const chart =new Chart(document.getElementById("lineChart") as HTMLCanvasElement, {
      type: 'line',
      data: {
        labels: years.map(year => year.toString()), 
        datasets: [{
          label: 'Land Value Range (Rs)',
          data: dataset, 
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 2,
          pointBackgroundColor: 'rgb(255, 99, 132)',
          fill: false 
        }]
      },
      options: {
        aspectRatio: 2.9,
        scales: {
          y: {
            title: {
              display: true,
              text: 'land price(Rs.)'
            },
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Years'
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        }
      }
    });
  }
  showLineChart(): void {
    const dialogRef = this.dialog.open(LandPriceComponent, {
      width: '590px',
      height:'420px',
     
      data: this.allYearPrices,
      
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Owners View dialog closed:', result);
    });
  }
  
}
