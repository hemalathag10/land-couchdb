import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import * as Sentiment from 'sentiment';

@Component({
  selector: 'app-chart',
  template: `
    <div class="chart-container">
      <canvas #speedometerChartCanvas width="400" height="400"></canvas>
      <div class="feedback-counts">
        <div>Good: {{ goodCount }}</div>
        <div>Neutral: {{ neutralCount }}</div>
        <div>Bad: {{ badCount }}</div>
        <div>Other: {{ otherCount }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  @Input() feedbackData: any[] = [];
  @Input() sentimentScores: number[] = [];

  @ViewChild('speedometerChartCanvas') private speedometerChartCanvas!: ElementRef;

  private chart!: Chart;
  goodCount = 0;
  neutralCount = 0;
  badCount = 0;
  otherCount = 0;

  ngAfterViewInit(): void {
    // Use setTimeout to ensure the view is fully initialized
    setTimeout(() => {
      this.createChart();
      this.updateChart();
    }, 100);
  }

  createChart(): void {
    const ctx = this.speedometerChartCanvas.nativeElement.getContext('2d');

    const data: ChartData = {
      labels: ['Good', 'Neutral', 'Bad', 'Other'],
      datasets: [{
        data: [0, 0, 0, 100],
        backgroundColor: [
          'rgba(0, 255, 0, 0.5)', // Good
          'rgba(255, 255, 0, 0.5)', // Neutral
          'rgba(255, 0, 0, 0.5)', // Bad
          'rgba(192, 192, 192, 0.5)', // Other
        ],
        borderColor: [
          'rgba(0, 255, 0, 1)',
          'rgba(255, 255, 0, 1)',
          'rgba(255, 0, 0, 1)',
          'rgba(192, 192, 192, 1)',
        ],
        borderWidth: 1,
      }],
    };

    const options: ChartOptions = {
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    };

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data,
      options,
    });
  }

  updateChart(): void {
    const sentiment = new Sentiment();

    // Update the chart data based on sentiment analysis results
    const total = this.feedbackData.length;
    this.goodCount = 0;
    this.neutralCount = 0;
    this.badCount = 0;
    this.otherCount = 0;

    this.feedbackData.forEach(feedback => {
      const analysis = sentiment.analyze(feedback.feedback);
      console.log(analysis)

      if (analysis.score >= 3) {
        this.goodCount++;
      } else if (analysis.score <= -3) {
        this.badCount++;
      } else {
        this.otherCount++;
      }
    });

    

    // Access the first dataset in the datasets array
    const dataset = this.chart.data.datasets[0];
    dataset.data = [this.goodCount, this.neutralCount, this.badCount, this.otherCount];

    this.chart.update();
  }
}
