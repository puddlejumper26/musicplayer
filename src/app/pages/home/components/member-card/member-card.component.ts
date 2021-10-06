import { timer } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { User } from 'src/app/services/data-types/member.type';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.less']
})
export class MemberCardComponent implements OnInit {
  tipTitle = '';
  showTip = false;

  @Input() user: User;

  @Output() openModal = new EventEmitter<void>();

  constructor(
    private memberServe: MemberService,
  ) { }

  ngOnInit() {
  }

  onSignin() {
    this.memberServe.signin()
      .subscribe(res => {
        console.log('MemberCardComponent - onSignin - res -', res);
        this.tipTitle = 'Point +' + res.point;
        this.showTip = true;
        timer(1500).subscribe(() => {
          this.showTip = false;
          this.tipTitle = '';
        });
      }, error => {
        console.log('MemberCardComponent - onSignin - error -', error);
      })
  }
}
