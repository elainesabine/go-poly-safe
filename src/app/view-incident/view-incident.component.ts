import { Component, OnInit } from '@angular/core';
import { IncidentObject } from '../incidentobject';
import { IncidentService } from '../incident.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-view-incident',
  templateUrl: './view-incident.component.html',
  styleUrls: ['./view-incident.component.css']
})
export class ViewIncidentComponent implements OnInit {
  lat: number = 35.3050;
  lng: number = -120.6625;
  incidentUrl="../assets/images/Exclamation.svg";
  comment: string = "";

  constructor(public incidentService:IncidentService, private http:HttpClient) { }

  ngOnInit() {
    this.lat = Number(this.incidentService.incident.location[0]);
    this.lng = Number(this.incidentService.incident.location[1]);
    this.http.post('api/queryComments', this.incidentService.incident).subscribe(res => {
      this.incidentService.incident.comments = res['comments'];
    })
  }

  insertComment() {
    if (!this.incidentService.incident.comments) {
      this.incidentService.incident.comments = [this.comment];
    } else {
      this.incidentService.incident.comments.push(this.comment);
    }
    this.http.post('api/insertComment', this.incidentService.incident).subscribe(res => {});
  }

  setIncidentStatusFalse() {
    this.http.post('api/setIncidentStatusFalse', this.incidentService.incident).subscribe(res =>{});
    this.incidentService.incident.status = false;
  }
}


