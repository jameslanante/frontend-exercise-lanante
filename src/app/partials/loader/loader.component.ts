import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../data/services/loader.service';
import { fadeAnimations } from '../../animations/fading.animation';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less'],
  animations: [fadeAnimations.default],
})
export class LoaderComponent {

  public isLoading: Subject<boolean>;

  constructor(loaderService: LoaderService) {
    this.isLoading = loaderService.isLoading;
  }

}
