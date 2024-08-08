import {Component, Input} from '@angular/core';
import {states} from '../../../../configs/control.config';

@Component({
    selector: 'app-detail-card',
    templateUrl: './detail-card.component.html',
    styleUrl: './detail-card.component.scss',
})
export class DetailCardComponent {
    componentName = 'detail-card';

    @Input() public number: string | undefined;
    @Input() public checkState = states.notChecked;
    @Input() public displayBadge: boolean | undefined = false;

    /**
     * This method is called when the control point is clicked.
     * It's only used for the demo.
     */
    controlPointClicked() {}
}
