import {TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {TranslationService} from './translation.service';
import {TranslateService} from '@ngx-translate/core';

describe('TranslationService', () => {
    let service: TranslationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            providers: [
                {
                    provide: TranslateService,
                },
            ],
        }).compileComponents();
        service = TestBed.inject(TranslationService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
