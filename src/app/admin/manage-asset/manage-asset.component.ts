
import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ManageAssetFormDialogComponent } from './manage-asset-form-dialog.component';
import { AssetService } from 'src/app/services/asset.service';
import { OwnersDetailsDialogComponent } from './owners-details-dialog/owners-details-dialog.component';
import { MapComponent } from './map/map.component';
import {
  AngularGridInstance,
 
  Formatter,
 
} from 'node_modules/angular-slickgrid';

const actionFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
  if (dataContext.id ==3) { // option 3 is High
    console.log("grid")

    return `<div class="cell-menu-dropdown-outline">Action<i class="fa fa-caret-down"></i></div>`;
  }
  return `<div class="disabled">Action <i class="fa fa-caret-down"></i></div>`;
};

@Component({
  selector: 'app-manage-asset',
  templateUrl: './manage-asset.component.html',
  styleUrls: ['./manage-asset.component.css']
})
export class ManageAssetComponent implements OnInit {
  assetForm!: FormGroup;
  page1Data: any[] = [];
  page2Form!: FormGroup; 
  columnDefinitions: any[] = [];
  gridOptions: any = {};
  dataset: any[] = [];
  angularGrid!: AngularGridInstance;


  constructor(private dialog: MatDialog, private fb: FormBuilder, private assetService: AssetService) {
    this.assetForm = this.fb.group({
      landArea: [''],
      selectedDistrict: [''],
    });
  }

  ngOnInit(): void {
   
    this.fetchAssets();

    }
    

  showAddNewForm(existingData?: any) {
    const dialogRef = this.dialog.open(ManageAssetFormDialogComponent, {
      width: '400px',
      data: existingData 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        
        this.fetchAssets(); 
      }
    });
  }
  
  
  
  

  fetchAssets() {
    console.log('Fetching Assets...');
    this.assetService.getAllAssets().subscribe(
      (response: any) => {
        this.page1Data = response.asset || [];
        console.log("page",this.page1Data)
        this.columnDefinitions = [
          { id: 'id', name: 'S.No', field: 'id', sortable: true, maxWidth: 50 },
    
          { id: 'landArea', name: 'Land Area', field: 'landArea', sortable: true, maxWidth: 90 },
          { id: 'State', name: 'State', field: 'State', sortable: true, maxWidth: 110 },
          { id: 'District', name: 'District', field: 'District', sortable: true,maxWidth: 120,filterable:true,},
          { id: 'Taluk', name: 'Taluk', field: 'Taluk', sortable: true, maxWidth: 210 },
          { id: 'Ward', name: 'Ward', field: 'Ward', sortable: true, maxWidth: 100},
          { id: 'SurveyNumber', name: 'Survey Number', field: 'SurveyNumber', sortable: true, maxWidth: 130 },
          { id: 'ownership', name: 'Type of Ownership', field: 'ownership', sortable: true, maxWidth: 150},
          { id: 'LandUseType', name: 'Land Use Type', field: 'LandUseType', sortable: true, maxWidth: 150},
          {
            id: 'action', name: 'Update', field: 'action', sortable: false, maxWidth: 150,
            formatter: actionFormatter
          }
          
          
        ];
        
   
    
this.dataset = this.page1Data.map((registrationArray, index) => {
  const registration = registrationArray[0];
  return {
    id: index + 1,
    landArea: registration ? registration.landArea : "", 
    State: registration ? registration.state : "",
    District: registration ? registration.selectedDistrict : "",
    Taluk: registration ? registration.selectedTaluk : "",
    Ward: registration ? registration.ward : "",
    SurveyNumber: registration ? registration.surveyNumber : "",
    ownership: registration ? registration.ownership : "",
    LandUseType: registration ? registration.landUseType : "",
  };
});

       
        this.gridOptions = {
          enableAutoResize: true,
          enableCellNavigation: true,
          enableSorting: true,
          autoHeight: true,
          explicitInitialization: true, 
          showHeaderRow: true,
          headerRowHeight: 10, 
          rowHeight: 40, 
          enableAsyncPostRender: true,
          enableVirtualRendering: true ,
          autoResize: {
            maxWidth: 850,
            maxHeight:500
          },
        
      } 


      },
      (error) => {
        console.error('Error fetching assets:', error);
      }
    );
  }


  update_Asset(landId: number) {
    const clickedAsset = this.page1Data.find(asset => asset.some((a: any) => a.landId === landId));
  
    if (clickedAsset) {
      const assetIndex = clickedAsset.findIndex((a: any) => a.landId === landId);
  
      const page2Data = this.assetForm.value;
  
      const ownersData = page2Data.owners;
  
      if (clickedAsset[assetIndex].owners) {
        clickedAsset[assetIndex].owners.push(...ownersData);
      } else {
        clickedAsset[assetIndex].owners = [...ownersData];
      }
  
     
  
    } else {
      console.error('Clicked asset not found. Cannot update.');
    }
  }
  
  showOwnersDetailsDialog(assetArray: any[]) {
    const dialogRef = this.dialog.open(OwnersDetailsDialogComponent, {
      width: '600px',
      height:'400px',
     
      data: assetArray[0],
      
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Owners View dialog closed:', result);
    });
  }
  
  showMapDialog(assetArray: any[]) {
    const dialogRef = this.dialog.open(MapComponent, {
      width: '400px',
      height:'400px',
     
      data: assetArray[0],
      
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed:', result);
    });
  }

}
