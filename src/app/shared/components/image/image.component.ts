import { Component, OnInit, Input } from '@angular/core';
import { config } from '@app/configs/app.configs';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() userId: string;
  @Input() size: string;
  imageUrl: string;

  constructor() {
    this.size = '36';
  }

  ngOnInit() {
    this.imageUrl = config.AIC_IMAGE_URL;
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getAvatarsUrl(event) {
    let onerrorUrl = config.AIC_URL + '/images/defaultImg.png';
    if (this.userId) {
      this.userId = this.userId.replace(/_|-/g, '+');
      onerrorUrl = 'https://ui-avatars.com/api/?name=' + this.userId + '&background=' + this.getRandomColor() + '&color=fff&rounded=true&size=' + this.size;
    }
    event.target.src = onerrorUrl;
  }
}
