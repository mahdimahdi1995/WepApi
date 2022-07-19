import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-api',
  templateUrl: './get-api.component.html',
  styleUrls: ['./get-api.component.css']
})
export class GetApiComponent implements OnInit {
  ip: string;
  constructor(private http: HttpClient) {
    fetch('https://api.ipify.org/?format=json')
  .then(response => response.json())
  .then(data => this.ip = data.ip);
   }

  ngOnInit(): void {
  }

  setApi(ip){
    this.ip = ip;
  }
}
