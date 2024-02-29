import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: '<div class="loader"></div>',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

}
