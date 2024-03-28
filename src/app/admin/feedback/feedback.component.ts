
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';
import { ChartComponent} from './chart.component';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, AfterViewInit {
  feedbackData: any[] = [];
  sentimentScores: number[] = [];
  columnDefinitions: any[] = [];
  gridOptions: any = {};
  dataset: any[] = [];
  @ViewChild(ChartComponent) speedometerChart!: ChartComponent;

  constructor(private assetService: AssetService,) {}

  ngOnInit(): void {
    this.assetService.getFeedback().subscribe((data) => {
      this.feedbackData = data.messages;
      this.columnDefinitions = [
        { id: 'id', name: 'S.No', field: 'id', sortable: true, maxWidth: 80 },
        { id: 'name', name: 'Name', field: 'name', sortable: true,maxWidth: 130 },
        { id: 'email', name: 'Email', field: 'email', sortable: true, maxWidth: 290},
        { id: 'feedback', name: 'Feedback', field: 'feedback', sortable: true, maxWidth: 160},
  
      ];
      
  
      // Populate dataset dynamically
      this.dataset = this.feedbackData.map((registration, index) => ({
        id: index + 1,
        name:registration.name,
        email: registration.email,
        feedback: registration.feedback
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
          maxWidth: 600,
          maxHeight:500
        },
     
    }
     
    });
  }

  ngAfterViewInit(): void {
    // After view initialization, update the speedometer chart with sentiment data
    if (this.speedometerChart) {
      this.speedometerChart.updateChart();
    }
  }
}
