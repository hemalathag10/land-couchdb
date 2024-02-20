// page.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  fetchedData: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Subscribe to changes in the shared service
    this.dataService.getData().subscribe(
      (data: any) => {
        this.fetchedData = data;
        console.log("data",this.fetchedData)
      }
    );
  }
}
