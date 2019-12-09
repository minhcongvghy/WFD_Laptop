import { Component, OnInit } from '@angular/core';
import {Line} from '../model/line';
import {FormControl, FormGroup} from '@angular/forms';
import {LineService} from '../services/line.service';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  lineList: Line[] = [];
  idLine: any;

  lineForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('')
  });
  lineName: '';

  constructor(private lineService: LineService) { }

  ngOnInit() {
    this.getListLine();
  }

  getListLine() {
    this.lineService.getLineList().subscribe(
      result => {
        this.lineList = result;
      }
    );
  }

  getLineId(lineId) {
    this.idLine = lineId;
  }

  createLine(closeButon: HTMLButtonElement) {
    const {name} = this.lineForm.value;
    if (name === '') {
      closeButon.click();
      return alert('Name can not empty');
    }
    const line: Line = {
      name
    };

    this.lineService.createLine(line).subscribe(
      result => {
        console.log(result);
        closeButon.click();
        this.getListLine();
        this.lineForm.reset();
      }
    );
  }

  updateLine(closeModalRef1: HTMLButtonElement) {
    const {name} = this.lineForm.value;
    if (name === '') {
      closeModalRef1.click();
      return alert('Nothing change!');
    }

    const line: Line = {
      id: this.idLine ,
      name
    };

    this.lineService.updateLine(line).subscribe(
      result => {
        closeModalRef1.click();
        this.getListLine();
        console.log(result);
      }
    );
  }

  deleteLine(closeModalRef2: HTMLButtonElement) {
    this.lineService.deleteLine(this.idLine).subscribe(
      result => {
        this.getListLine();
        closeModalRef2.click();
      }
    );
  }

  searchByLineName() {
    const line: Line = {
      name: this.lineName
    };
    this.lineService.searchLineByName(line).subscribe(
      next => {
        this.lineList = next;
      }, error => {
        console.log(error);
      }
    );
  }

}
