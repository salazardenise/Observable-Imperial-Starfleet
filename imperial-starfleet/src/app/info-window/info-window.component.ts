import { SearchService } from './info-window.service';
import { TurretComponent } from './../internal-defenses/turret/turret.component';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
//import 'rxjs/add/operator/toPromise';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs'; // add this

@Component({
  selector: 'app-info-window',
  templateUrl: './info-window.component.html',
  styleUrls: ['./info-window.component.css']
})
export class InfoWindowComponent implements OnInit {

  dataBanks: any;
  searchSubject = new Subject(); // add this

  constructor(private http: Http, 
              private route: ActivatedRoute,
              private searchService: SearchService) { }

  findTurret(turretNumber) {
    /*
      let url: string = 'http://localhost:3000/api/turret/' + turretNumber;
      this.http.get(url)
        .toPromise()
        .then(response => this.dataBanks = response.json());
        */
       this.searchSubject.next(turretNumber);
  }

  ngOnInit() {
    
    this.route.params.forEach(
      param => this.findTurret(param.id)
    );
    
    this.searchSubject
      .subscribe(turretNumber1 => 
        this.searchService.createAPIObservable(turretNumber1)
        .subscribe(response => this.dataBanks = response.json()));
  }

}