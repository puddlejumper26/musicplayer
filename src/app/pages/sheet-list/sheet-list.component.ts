import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SheetList } from 'src/app/services/data-types/common.types';
import { SheetParams, SheetService } from 'src/app/services/sheet.service';
import { BatchActionsService } from 'src/app/store/batch-actions.service';

@Component({
  selector: 'app-sheet-list',
  templateUrl: './sheet-list.component.html',
  styleUrls: ['./sheet-list.component.less']
})
export class SheetListComponent implements OnInit {

  listParams: SheetParams = {
    cat: '全部',
    order: 'hot',
    offset: 1,
    limit: 35
  }
  sheets: SheetList;
  orderValue = 'hot';

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
    private router: Router,
    private sheetServe: SheetService,
    private batchActionsServe: BatchActionsService
  ) {
    this.listParams.cat = this.route.snapshot.queryParamMap.get('cat') || '全部';
    // console.log('SheetListComponent - this.listParams - ', this.listParams);
    this.getList();
  }

  ngOnInit() {
  }

  onOrderChange(order: 'new' | 'hot') {
    // console.log('SheetListComponent - onOrderChange - order - ', order);
    this.listParams.order = order;
    this.listParams.offset = 1;
    // console.log('SheetListComponent - onOrderChange - this.listParams - ', this.listParams);
    this.getList();
  }

  onPageChange(offset: number) {
    // console.log('SheetListComponent - onPageChange - offset - ', offset);
    this.listParams.offset = offset;
    this.getList();
  }

  private getList() {
    this.sheetServe.getSheets(this.listParams).subscribe(sheets => {
      // console.log('SheetListComponent - getList - sheets -', sheets);
      this.sheets = sheets;
    })
  }

  // Same as in home.component.ts
  onPlaySheet(id: number) {
    this.sheetServe.playSheet(id).subscribe(list => {
      this.batchActionsServe.selectPlayList({ list, index: 0});
    })
  }

  toInfo(id: number) {
    this.router.navigate(['/sheetInfo', id]);
  }
}
