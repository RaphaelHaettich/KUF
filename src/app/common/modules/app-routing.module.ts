import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ObUnknownRouteModule} from '@oblique/oblique';
import {backPath, dossierId, genericRoutes, pageRoutes} from '../routes/page-routes';
import {DossierDetailComponent} from '../../pages/dossiers/dossier-detail/dossier-detail.component';
import {DossierOverviewComponent} from '../../pages/dossiers/dossier-overview/dossier-overview.component';

const routes: Routes = [
    {path: '', redirectTo: pageRoutes.dossier, pathMatch: 'full'},
    {
        path: pageRoutes.dossier,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: genericRoutes.overview,
            },
            {
                path: genericRoutes.overview,
                component: DossierOverviewComponent,
            },
            {
                path: `${genericRoutes.detail}/:${dossierId}`,
                component: DossierDetailComponent,
                data: {
                    [backPath]: `${pageRoutes.dossier}/${genericRoutes.overview}`,
                },
            },
        ],
    },
    {path: '**', redirectTo: pageRoutes.unkown},
];

@NgModule({
    imports: [RouterModule.forRoot(routes), ObUnknownRouteModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
