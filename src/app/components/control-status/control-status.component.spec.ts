import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ControlStatusComponent} from './control-status.component';

jest.mock('../../common/libs/call-valid-function', () => ({
    __esModule: true,
    default: jest.fn(),
}));

import callValidFunction from '../../common/libs/call-valid-function';
import {states} from '../../../configs/control.config';

describe('ControlStatusComponent', () => {
    let component: ControlStatusComponent;
    let fixture: ComponentFixture<ControlStatusComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ControlStatusComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ControlStatusComponent);
        component = fixture.componentInstance;
        component.initState = states.notChecked;
        component.callback = jest.fn();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should initialize with the correct state', () => {
        expect(component.state()).toBe(states.notChecked);
    });

    it('should revert state if callback returns false', () => {
        component.state.set(states.notChecked);
        (callValidFunction as jest.Mock).mockReturnValue(false);
        component.updateState();
        expect(component.state()).toBe(states.notChecked);
    });

    it('should keep the new state if callback returns true', () => {
        component.state.set(states.approved);
        (callValidFunction as jest.Mock).mockReturnValue(true);
        component.updateState();
        expect(component.state()).toBe(states.notApproved);
    });
});
