import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      CityGo Admin Panel ©2020
    </span>
    <div class="socials">
      <a href="https://github.com/AP-Elektronica-ICT/cloud-applications-20-21-citygo" target="_blank" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {
}
