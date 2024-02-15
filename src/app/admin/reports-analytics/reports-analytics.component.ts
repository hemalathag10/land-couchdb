import { Component, OnInit, } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { AssetService } from 'src/app/services/asset.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-reports-analytics',
  templateUrl: './reports-analytics.component.html',
  styleUrls: ['./reports-analytics.component.css']
})
export class ReportsAnalyticsComponent implements OnInit {
  form!: FormGroup;
  assetData: any;
    searchDistrict: string = ''; 
    searchTaluk: string = ''; 


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




      },
      (error) => {
        console.error('Error fetching asset data:', error);
      }
    );
  }



// private drawLineChart() {
//   const landValueRange = this.extractLandValueFromDatabase(this.searchDistrict, this.searchTaluk);

//   // Convert the data to arrays for labels and data
//   const years = Object.keys(landValueRange).map(Number);
//   const purchasePricesArray = Object.values(landValueRange);

//   // Create a single dataset with points sorted by x-axis (year)
//   const dataset: { x: number; y: number }[] = [];

//   purchasePricesArray.forEach((prices, index) => {
//     // Add each point to the dataset
//     prices.forEach((price: number) => {
//       dataset.push({ x: years[index], y: price });
//     });
//   });

//   // Sort dataset points based on the x-axis values (years)
//   dataset.sort((a, b) => a.x - b.x);

//   new Chart(document.getElementById("lineChart") as HTMLCanvasElement, {
//     type: 'line',
//     data: {
//       labels: years,
//       datasets: [{
//         label: 'Land Value Range (Rs)',
//         data: dataset,
//         borderColor: 'rgb(255, 99, 132)',
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderWidth: 2,
//         pointBackgroundColor: 'rgb(255, 99, 132)',
//       }],
//     },
//     options: {
//       aspectRatio: 2.0,
//       scales: {
//         y: {
//           title: {
//             display: true,
//             text: 'Price per square feet(Rs.)',
//           },
//           beginAtZero: true,
//           grid: {
//             color: 'rgba(0, 0, 0, 0.1)',
//           }
//         },
//         x: {
//           title: {
//             display: true,
//             text: 'Years',
//           },
//           grid: {
//             color: 'rgba(0, 0, 0, 0.1)',
//           }
//         }
//       },
//       plugins: {
//         tooltip: {
//           backgroundColor: 'rgba(0, 0, 0, 0.7)',
//           bodyFont: {
//             size: 14,
//           },
//           titleFont: {
//             size: 16,
//             weight: 'bold',
//           }
//         },
//         legend: {
//           labels: {
//             font: {
//               size: 14,
//             }
//           }
//         },
//       }
//     }
//   });
// }


  


private drawLineChart() {
  const landValueRange = this.extractLandValueFromDatabase(this.searchDistrict, this.searchTaluk);

  // Convert the data to arrays for labels and data
  const years = Object.keys(landValueRange).map(Number);
  const purchasePricesArray = Object.values(landValueRange);

  // Create a single dataset with points sorted by x-axis (year)
  const dataset: { x: number; y: number }[] = [];

  purchasePricesArray.forEach((prices, index) => {
    // Add each point to the dataset
    prices.forEach((price: number) => {
      dataset.push({ x: years[index], y: price });
    });
  });

  // Sort dataset points based on the x-axis values (years)
  dataset.sort((a, b) => a.x - b.x);

  const chart = new Chart(document.getElementById("lineChart") as HTMLCanvasElement, {
    type: 'line',
    data: {
      labels: years,
      datasets: [{
        label: 'Land Value Range (Rs)',
        data: dataset,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(255, 99, 132)',
      }],
    },
    options: {
      aspectRatio: 2.4,
      scales: {
        y: {
          title: {
            display: true,
            text: 'Price per square feet(Rs.)',
          },
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          }
        },
        x: {
          title: {
            display: true,
            text: 'Years',
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          }
        }
      },
      plugins: {
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          bodyFont: {
            size: 14,
          },
          titleFont: {
            size: 16,
            weight: 'bold',
          },
          callbacks: {
            label: (context: any) => {
              const currentValue = Math.abs(context.dataset.data[context.dataIndex].y);
              const index = context.dataIndex;
              const previousValue = Math.abs(index > 0 ? context.dataset.data[index - 1].y : null);
              const currentYear = context.dataset.data[context.dataIndex].x;
              const previousYear = index > 0 ? context.dataset.data[index - 1].x : null;
          console.log("current",currentValue)
          console.log("previous",previousValue)
              let Change = previousValue !== 0 ? (((currentValue - previousValue)).toFixed(2)) : '0.00';
              console.log((((currentValue - previousValue) ).toFixed(2)))
              if (isNaN(parseFloat(Change))) {
              Change = 'N/A';
              } else {
               Change = Math.min(parseFloat(Change), 100).toFixed(2);
                if (currentValue < previousValue) {
                  Change = 'Decrease: Rs.' +Change ;
                } else if (currentValue > previousValue) {
                  Change = 'Increase: Rs.' + Change ;
                } else {
                  Change = 'No Change';
                }
              }
          
              return `${currentYear}: Rs.${currentValue.toFixed(2)} | ${Change}`;
            },
          },
          
        },
        legend: {
          labels: {
            font: {
              size: 14,
            }
          }
        },
      }
    }
  });
}






  private extractLandValueFromDatabase(searchDistrict: string, searchTaluk: string): { [key: number]: number[] } {
    const landValueRange: { [key: number]: number[] } = {};
  
    if (this.assetData && this.assetData.asset) {
      this.assetData.asset.forEach((landArray: any[]) => {
        landArray.forEach((land: any) => {
          if (land.selectedDistrict === searchDistrict && land.selectedTaluk === searchTaluk) {
            land.owners.forEach((owner: any) => {
              const ownershipDurationFrom = owner.ownershipDurationFrom;
  
              if (ownershipDurationFrom) {
                const year = new Date(ownershipDurationFrom).getFullYear();
                const purchasePrice = this.getPurchasePrice(owner);
                const landArea = land.landArea || 0;


  
                if (!isNaN(year) && !isNaN(purchasePrice)) {
                 if (!landValueRange.hasOwnProperty(year)) {
                  // If the year doesn't exist, create a new array with the purchase price
                  landValueRange[year] = [Math.floor(purchasePrice / landArea)];
                } else {
                  // If the year already exists, add the purchase price to the existing array
                  landValueRange[year].push(Math.floor(purchasePrice/landArea));
                }
                }
              }
            });
          }
        });
      });
    }
  
    console.log(landValueRange);
    console.log(this.assetData);
  
    return landValueRange;
  }
  
  private getPurchasePrice(owner: any): number {
    const nestedOwners = owner.owners;
  
    if (nestedOwners && nestedOwners.length > 0) {
      const purchasePrice = nestedOwners[0].purchasePrice;
  
      if (typeof purchasePrice === 'number') {
        return purchasePrice;
      } else if (typeof purchasePrice === 'string') {
        return parseInt(purchasePrice, 10) || 0;
      }
    }
  
    return 0;
  }
  
search(){
  this.drawLineChart()

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
  districts: string[] = ['Ariyalur', 'Chennai', 'Madurai'];
  taluks: { [key: string]: string[] } = {
    'Ariyalur': ['none', 'Andimadam', 'Ariyalur', 'Sendurai', 'Udayarpalayam'],
    'Chennai': ['none', 'Alandur', 'Ambattur', 'Aminjikarai', 'Ayanavaram', 'Egmore', 'Guindy', 'Madhavaram', 'Maduravoyal', 'Mambalam', 'Mylapore', 'Perambur', 'Purasawalkam', 'Sholinganallur', 'Thiruvottiyur', 'Tondiarpet', 'Velachery'],
    'Madurai': ['none', 'Kalligudi', 'Madurai East', 'Madurai North', 'Madurai(South)', 'Madurai West', 'Melur', 'Peraiyur', 'Thirupparankundram', 'Tirumangalam', 'Usilampatti', 'Vadipatti'],
    // Add other districts with taluks
  };
  onDistrictChange() {
    const selectedDistrict = this.form.get('selectedDistrict')?.value;
    this.form.get('selectedTaluk')?.setValue(this.taluks[selectedDistrict][0]);
  }

 
 
}

