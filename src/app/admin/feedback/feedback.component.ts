// import { Component, OnInit } from '@angular/core';
// import { AssetService } from 'src/app/services/asset.service';

// @Component({
//   selector: 'app-feedback',
//   templateUrl: './feedback.component.html',
//   styleUrls: ['./feedback.component.css']
// })
// export class FeedbackComponent implements OnInit {
// feedbackData: any[] = [];


//   constructor(private assetService: AssetService) {}
//   ngOnInit(): void {
//     this.assetService.getFeedback().subscribe((data) => {
//         this.feedbackData = data.messages;
//       });
//   }
// }
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

  @ViewChild(ChartComponent) speedometerChart!: ChartComponent;

  constructor(private assetService: AssetService,) {}

  ngOnInit(): void {
    this.assetService.getFeedback().subscribe((data) => {
      this.feedbackData = data.messages;

      // Perform sentiment analysis on feedback
      this.feedbackData.forEach(feedback => {
        // this.sentimentService.analyzeSentiment(feedback.feedback).subscribe(score => {
        //   this.sentimentScores.push(score);
        // });
      });
    });
  }

  ngAfterViewInit(): void {
    // After view initialization, update the speedometer chart with sentiment data
    if (this.speedometerChart) {
      this.speedometerChart.updateChart();
    }
  }
}
