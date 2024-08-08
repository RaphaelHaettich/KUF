import {Component, OnInit} from '@angular/core';
import {filter, of, switchMap} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {backPath} from '../../../common/routes/page-routes';

@Component({
    selector: 'app-back-button',
    templateUrl: './back-button.component.html',
    styleUrl: './back-button.component.scss',
})
export class BackButtonComponent implements OnInit {
    backButtonCSSClass = 'back-button';
    backButtonPath!: string | null;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
    ) {}

    ngOnInit(): void {
        this.fetchBackPath();
    }

    navigateBack() {
        void this.router.navigate([this.backButtonPath]);
        this.backButtonPath = null;
    }

    private fetchBackPath(): void {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                switchMap(() => {
                    let route = this.activatedRoute.firstChild;
                    if (!route) {
                        return of(null);
                    }

                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route.data;
                }),
            )
            .subscribe((data) => {
                if (data && backPath in data) {
                    this.backButtonPath = data[backPath];
                }
            });
    }
}
