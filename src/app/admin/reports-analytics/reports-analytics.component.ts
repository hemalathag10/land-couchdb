import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { AssetService } from 'src/app/services/asset.service';

@Component({
  selector: 'app-reports-analytics',
  templateUrl: './reports-analytics.component.html',
  styleUrls: ['./reports-analytics.component.css']
})
export class ReportsAnalyticsComponent implements OnInit {
  assetData: any;

  constructor(private assetService: AssetService) { }

  ngOnInit() {
    this.fetchAssetData();
  }

  private fetchAssetData() {
    this.assetService.getAllAssets().subscribe(
      (data) => {
        this.assetData = data;
        this.drawDoughnutChart();
        this.drawPieChart();
        this.drawBarChart();


      },
      (error) => {
        console.error('Error fetching asset data:', error);
      }
    );
  }

  private drawDoughnutChart() {
    const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement;
    const landUseTypes = this.extractLandUseTypesFromDatabase();
   // Initialize count for each land use type
   const landUseTypeCount: { [key: string]: number }  = {
    'Industrial': 0,
    'Residential': 0,
    'Commercial': 0,
    'others': 0,
    'Agricultural': 0
  };

  // Increment count based on data from the database
  landUseTypes.forEach(landUseType => {
    if (landUseTypeCount.hasOwnProperty(landUseType)) {
      landUseTypeCount[landUseType]++;
    }
  });
console.log(landUseTypeCount)
  const allLabels = Object.keys(landUseTypeCount);
  const dataValues = Object.values(landUseTypeCount);
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: allLabels,
      datasets: [{
        data: dataValues,
        backgroundColor: ['#FF5733', '#33FF57', '#5733FF', '#FFD700', '#c800ff'],
      }]
    },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          }
        }
      }
    });
  }
  
  private drawPieChart() {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    const ownership = this.extractOwnershipFromDatabase();
    const ownershipTypeCount: { [key: string]: number }  = {
      'Government': 0,
      'Mitta': 0,
      'Zamindari': 0,
      'other': 0,
      'Inam': 0
    };
  
    // Increment count based on data from the database
    ownership.forEach(ownershipType => {
      if (ownershipTypeCount.hasOwnProperty(ownershipType)) {
        ownershipTypeCount[ownershipType]++;
      }
    });
  console.log(ownershipTypeCount)
    const allLabels = Object.keys(ownershipTypeCount);
    const dataValues = Object.values(ownershipTypeCount);
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: allLabels,
        datasets: [{
          data: dataValues,
          backgroundColor: ['#FF5733', '#33FF57', '#5733FF', '#FFD700', '#c800ff'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          }
        }
      }
    });
  }

  private drawBarChart() {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Category 1', 'Category 2', 'Category 3'],
        datasets: [{
          data: [60, 40, 80],
          backgroundColor: ['#FF5733', '#33FF57', '#5733FF'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  private extractLandUseTypesFromDatabase(): string[] {
    const landUseTypes: string[] = [];
  
    if (this.assetData && this.assetData.asset) {
      this.assetData.asset.forEach((landArray: any[]) => { // Specify type as any[]
        landArray.forEach((land: any) => { // Specify type as any
          landUseTypes.push(land.landUseType);
        });
      });
    }
  
    return landUseTypes;
  }

  private countLandUseTypeOccurrences(landUseTypes: string[]): { [key: string]: number } {
    const landUseTypeCount: { [key: string]: number } = {};

    landUseTypes.forEach(landUseType => {
      landUseTypeCount[landUseType] = (landUseTypeCount[landUseType] || 0) + 1;
    });

    return landUseTypeCount;
  }



  private extractOwnershipFromDatabase(): string[] {
    const ownershipTypes: string[] = [];
  
    if (this.assetData && this.assetData.asset) {
      this.assetData.asset.forEach((ownershipArray: any[]) => { // Specify type as any[]
        ownershipArray.forEach((owner: any) => { // Specify type as any
          ownershipTypes.push(owner.ownership);
        });
      });
    }
  
    return ownershipTypes;
  }

  private countOwnershipTypeOccurrences(ownershipTypes: string[]): { [key: string]: number } {
    const ownershipTypeCount: { [key: string]: number } = {};

    ownershipTypes.forEach(ownershipType => {
      ownershipTypeCount[ownershipType] = (ownershipTypeCount[ownershipType] || 0) + 1;
    });

    return ownershipTypeCount;
  }
}