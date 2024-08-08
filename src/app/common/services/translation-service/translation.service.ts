import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ObINavigationLink} from '@oblique/oblique';

@Injectable({
    providedIn: 'root',
})
export class TranslationService extends TranslateService {
    public mapToTranslatedNavigationLinks(
        navigationLinks: ObINavigationLink[],
    ): ObINavigationLink[] {
        const clonedNavigationLinks: ObINavigationLink[] = [];
        navigationLinks.forEach((val) => clonedNavigationLinks.push({...val}));

        return clonedNavigationLinks.map((navigationLink: ObINavigationLink) => {
            navigationLink.url = navigationLink.url.toString();
            navigationLink.label = this.instant(navigationLink.label);
            return navigationLink;
        });
    }
}
