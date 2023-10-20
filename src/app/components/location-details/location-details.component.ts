import { Component } from '@angular/core';
import { LocationDetailsService, timesheet } from './location-details.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css'],
})
export class LocationDetailsComponent {
  constructor(private readonly locationDetailsService: LocationDetailsService) {
    this.getData();
    setInterval(() => {
      this.getData();
    }, 5000);
  }

  displayedColumns: string[] = ['date', 'startTime', 'endTime', 'inCount', 'outCount', 'totalCount'];
  dataSource: timesheet[] = [];

  disabled = false;
  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10];
  showFirstLastButtons = true;

  tiles = [
    {text: 'Location: ', cols: 2, rows: 1, color: 'lightpink'},
    {text: 'Total Entry taken: ', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Total Exited count: ', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Persons in hall: ', cols: 1, rows: 1, color: 'lightblue'},
  ];

  resetTimestamp: string = '';

  getData() {
    this.locationDetailsService.getLocationByID()
      .subscribe((response) => {
        const { name, inCount, outCount, totalCount, resetTimestamp } = response.body?.data!;
        
        this.tiles[0].text = `Location: ${name}`;
        this.tiles[1].text = `Total Entry taken: ${inCount}`;
        this.tiles[2].text = `Total Exited count: ${outCount}`;
        this.tiles[3].text = `Persons in hall: ${totalCount}`;

        this.resetTimestamp = resetTimestamp;
      });

    this.locationDetailsService.getLocationTimesheet(this.pageIndex, this.pageSize)
      .subscribe((response) => {
        this.dataSource = response.body?.data.timesheet!;
        this.length = response.body?.data.totalCount!;
        this.pageSize = response.body?.data.pageSize!;
        this.pageIndex = response.body?.data.pageIndex!;
      });
  }

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.locationDetailsService.getLocationTimesheet(this.pageIndex, this.pageSize)
      .subscribe((response) => {
        this.dataSource = response.body?.data.timesheet!;
        this.length = response.body?.data.totalCount!;
        this.pageSize = response.body?.data.pageSize!;
        this.pageIndex = response.body?.data.pageIndex!;
      })
  }
}
