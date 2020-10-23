import { Component, OnInit } from '@angular/core';
import {LoadersCSS} from 'ngx-loaders-css';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  loader: LoadersCSS = 'pacman';
  bgColor = 'black';
  color = 'rgba(100, 100, 100, 0.5)';
  constructor() { }

  ngOnInit() {}

}
