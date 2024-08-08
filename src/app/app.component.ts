import {Component} from '@angular/core';
import {genericRoutes, pageRoutes} from './common/routes/page-routes';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    readonly genericRoutes = genericRoutes;
    readonly pageRoutes = pageRoutes;
    componentName = 'app';
}
