import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';
import {
  AngularGridInstance,
  AutocompleteOption,
  Column,
  Editors,
  EditorArguments,
  EditorValidator,
  FieldType,
  Filters,
  FlatpickrOption,
  Formatter,
  Formatters,
  GridOption,
  LongTextEditorOption,
  OnEventArgs,
  OperatorType,
  SortComparers,
} from 'node_modules/angular-slickgrid';
import { CustomInputFilter } from './custom-inputFilter';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  


  totalAssets: number = 0;
  totalUsers: number = 0;
  recentRegistrations: number = 0;
  newAssetsToday: number = 0;
  newUsersToday: number = 0;
  recentRegistrationsData: any[] = [];
  columnDefinitions: any[] = [];
  gridOptions: any = {};
  dataset: any[] = [];
  angularGrid!: AngularGridInstance;

  constructor(private assetService: AssetService) {}
  
  ngOnInit() {
    // Assuming you have a method in your AssetService to fetch all assets
    this.assetService.getAllAssets().subscribe((response: any) => {
      const assetsArrays: any[][] = response.asset || [];

      console.log("response", response);
      this.totalAssets = assetsArrays.length;

      const today = new Date().toISOString().split('T')[0];
      this.newAssetsToday = assetsArrays.filter(assetArray =>
        assetArray.some(asset =>
          asset.created_at && asset.created_at.split('T')[0] === today
        )
      ).length;

      // Calculate recent registrations (within last 7 days)
      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);

      this.recentRegistrationsData = assetsArrays
        .flatMap(assetArray => assetArray.filter(asset =>
          asset.created_at && new Date(asset.created_at) > last7Days
        ));

      console.log('Recent Registrations Data:', this.recentRegistrationsData);

      this.recentRegistrations = this.recentRegistrationsData.length;

      // Populate column definitions dynamically
      this.columnDefinitions = [
        { id: 'id', name: 'S.No', field: 'id', sortable: true, maxWidth: 50 },
        {
          id: 'description',
          name: 'Description',
          field: 'description',
          filterable: true,
          sortable: true,
          minWidth: 80,
          type: FieldType.string,
          filter: {
            model: CustomInputFilter, // Here is where you assign the custom filter
            enableTrimWhiteSpace: true
          }
        },
        { id: 'landArea', name: 'Land Area', field: 'landArea', sortable: true, maxWidth: 90 },
        { id: 'State', name: 'State', field: 'State', sortable: true, maxWidth: 110 },
        { id: 'District', name: 'District', field: 'District', sortable: true,maxWidth: 120,filterable:true,},
        { id: 'Taluk', name: 'Taluk', field: 'Taluk', sortable: true, maxWidth: 210 },
        { id: 'Ward', name: 'Ward', field: 'Ward', sortable: true, maxWidth: 100},
        { id: 'SurveyNumber', name: 'Survey Number', field: 'SurveyNumber', sortable: true, maxWidth: 130 },
        { id: 'ownership', name: 'Type of Ownership', field: 'ownership', sortable: true, maxWidth: 150},
        { id: 'LandUseType', name: 'Land Use Type', field: 'LandUseType', sortable: true, maxWidth: 150},
      ];
      

      // Populate dataset dynamically
      this.dataset = this.recentRegistrationsData.map((registration, index) => ({
        id: index + 1,
        description: registration.landArea,
        State: registration.state,
        District:registration.selectedDistrict,
        Taluk:registration.selectedTaluk,
        Ward:registration.ward,
        SurveyNumber:registration.surveyNumber,
        ownership:registration.ownership,
        LandUseType:registration.landUseType
      }));
      
     
      // Set grid options
      this.gridOptions = {
        enableAutoResize: true,
        enableCellNavigation: true,
        enableSorting: true,
        autoHeight: true, // Disable autoHeight to enable vertical scrolling
        explicitInitialization: true, // Explicit initialization is needed when using autoHeight or virtual scrolling
        showHeaderRow: true, // Show header row if needed
        headerRowHeight: 10, // Adjust header row height as needed
        rowHeight: 40, // Adjust row height as needed
        enableAsyncPostRender: true, // Enable async post render if needed
        enableVirtualRendering: true ,
        autoResize: {
          maxWidth: 1050,
          maxHeight:500
        },
      
      };
    });

    this.assetService.getAllUsers().subscribe((response: any) => {
      const users: any[] = response.user || [];

      console.log(users.length);
      this.totalUsers = users.length;
      const today = new Date().toISOString().split('T')[0];

      this.newUsersToday = users.filter(user =>
        user.createdAt && user.createdAt.split('T')[0] === today
      ).length;

      console.log(this.newUsersToday);
    });
  }
  angularGridReady(event: any) {
    this.angularGrid = event.grid;
  }
  

}
