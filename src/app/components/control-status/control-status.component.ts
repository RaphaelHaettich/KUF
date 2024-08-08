import {Component, Input, OnInit, signal} from '@angular/core';
import {states} from '../../../configs/control.config';
import callValidFunction from '../../common/libs/call-valid-function';

@Component({
    selector: 'app-control-status',
    templateUrl: './control-status.component.html',
    styleUrl: './control-status.component.scss',
})
export class ControlStatusComponent implements OnInit {
    componentName = 'control-status';
    states = states;
    @Input() public initState!: string;
    @Input() public callback!: (state: string) => boolean;
    state = signal(this.initState);

    ngOnInit() {
        this.state.set(this.initState);
    }

    updateState() {
        const stateArray = Object.values(this.states);
        const oldState = this.state();
        const newState = stateArray[(stateArray.indexOf(this.state()) + 1) % stateArray.length];
        this.state.set(newState);
        const success = callValidFunction(this.callback, newState);

        if (!success) {
            this.state.set(oldState);
        }
    }
}
