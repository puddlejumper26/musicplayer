import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SheetParams, SheetService } from 'src/app/services/sheet.service';

@Component({
  selector: 'app-sheet-list',
  templateUrl: './sheet-list.component.html',
  styleUrls: ['./sheet-list.component.less']
})
export class SheetListComponent implements OnInit {

  listParams: SheetParams = {
    cat: 'All',
    order: 'hot',
    offset: 1,
    limit: 35
  }

  /**
   * @param snapshot
   * route pass value as flow(rxjs), but if we just need one parameter
   * we could use @snapshot to obtain the value, without observable
   *
   * @cat paramter before we call we need to modify
   * cause could click any of the following on page 华语，流行，摇滚，民谣，电子
   * so here we would need the queryParams parameter
   */
  constructor(
    private route: ActivatedRoute,
    private sheetServe: SheetService
  ) {
    this.listParams.cat = this.route.snapshot.queryParamMap.get('cat') || 'All';
    console.log('SheetListComponent - this.listParams - ', this.listParams);
    this.getList();
  }

  ngOnInit() {
  }

  private getList() {
    this.sheetServe.getSheets(this.listParams).subscribe(res => {
      console.log('SheetListComponent - getList - res -', res)
    })
  }

}
