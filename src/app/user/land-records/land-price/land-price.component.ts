import { Component,AfterViewInit, Inject, } from "@angular/core";
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart } from "chart.js";
@Component({
    selector: 'app-land-price',
    template: `
      <h2 mat-dialog-title>FUTURE LAND PRICE PREDICTION</h2>
      <div mat-dialog-content>
      <canvas id="lineChart" width="600" height="400" style="height: 325px;
      width: 483px;"></canvas> <!-- Set fixed width and height -->
      </div>
    `,
    styleUrls: ['./land-price.component.css']

  })
  export class LandPriceComponent implements  AfterViewInit {
    allYearPrices: { year: number, price: number }[] = [];
  
    constructor(public dialogRef: MatDialogRef<LandPriceComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {}
  
  
  
    ngAfterViewInit() {
      // Draw the line chart
      this.drawLineChart();
    }
  
    private drawLineChart() {

        const purchasePricesArray = this.data;
        const dataset: { x: number; y: number }[] = [];
      
        // Iterate over purchasePricesArray to populate the dataset
        purchasePricesArray.forEach((pricesObj: any) => {
          const year = pricesObj.year;
          const price = pricesObj.price;
      
          // Ensure year and price are valid
          if (!isNaN(year) && !isNaN(price)) {
            dataset.push({ x: year, y: price });
          }
        });
      
        dataset.sort((a, b) => a.x - b.x);
      
        const years = dataset.map(data => data.x);
      
     const chart=new Chart(document.getElementById("lineChart") as HTMLCanvasElement, {
          type: 'line',
          data: {
            labels: years.map(year => year.toString()), // Use years as x-axis labels
            datasets: [{
              label: 'Land Value Range (Rs)',
              data: dataset, // Use the sorted dataset
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 2,
              pointBackgroundColor: 'rgb(255, 99, 132)',
              fill: false // Set fill to false for line chart
            }]
          },
          options: {
            aspectRatio: 1.4,
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
        this.drawLineChart();
    
      }
  }
  