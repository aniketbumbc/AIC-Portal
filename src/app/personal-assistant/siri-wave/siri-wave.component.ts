
import { Component, OnInit } from '@angular/core';

declare var SiriWave: any;

@Component({
  selector: 'app-wave',
  templateUrl: './siri-wave.component.html',
  styleUrls: ['./siri-wave.component.scss']
})
export class SiriWaveComponent implements OnInit {

  siriWaveObject: any;
  // @Input() width: number = 100;
  // @Input() height: number = 50;
  // @Input() ratio: number = 1;
  // @Input() speed: number = 0.025;
  // @Input() frequency: number = 6;
  // @Input() amplitude: number = 1;
  // @Input() speed_interpolation_speed: number = 0.005;
  // @Input() amplitude_interpolation_speed: number = 0.005;
  // @Input() color: string;
  // @Input() container: any;

  constructor() {

  }

  ngOnInit() {
    this.addSiriWave();
  }

  addSiriWave(): void {
    // tslint:disable-next-line:no-unused-expression
    this.siriWaveObject = new SiriWave({
      width: 100,
      height: 30,
      ratio: 1,
      speed: 0.035,
      frequency: 15,
      amplitude: 1,
      speed_interpolation_speed: 0.005,
      amplitude_interpolation_speed: 0.005,
      color: '#000000',
      container: document.getElementById('my-siri-wave'),
      autostart: true,
      style: 'ios9'
    });

    this.siriWaveObject.start();
  }

}
