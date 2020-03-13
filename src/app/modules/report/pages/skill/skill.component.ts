import { Component, OnInit, OnDestroy } from '@angular/core';
import { SkillService } from '@app/shared/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
})
export class SkillComponent implements OnInit, OnDestroy {
  skillMatrixData: any;
  private _onDestroy = new Subject<void>();

  constructor(private skillService: SkillService) {}

  ngOnInit() {
    this.skillService.getSkills().subscribe(res => {
      this.skillMatrixData = res['layers'];
    });
  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
