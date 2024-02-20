import { Injectable } from '@angular/core';
import * as Sentiment from 'sentiment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SentimentAnalysisService {
  private sentimentAnalyzer: any;

  constructor() {
    // Initialize the sentiment analyzer
    this.sentimentAnalyzer = new Sentiment();
  }

  analyzeSentiment(text: string): Observable<number> {
    // Analyze sentiment and get a numeric score
    const result = this.sentimentAnalyzer.analyze(text);
    const score = result.score;
    return of(score);
  }
}
