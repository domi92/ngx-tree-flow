import { Component, OnInit } from '@angular/core';
import { TreeFlowNode } from 'projects/ngx-tree-flow/src/lib/resource/TreeFlowNode';
import { TreeFlowNodeState } from 'projects/ngx-tree-flow/src/lib/resource/TreeFlowNodeState';
import { interval } from 'rxjs';

@Component({
  selector: 'ngx-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  protected data: TreeFlowNode[][] = [];

  protected linearData: TreeFlowNode[] = [];

  ngOnInit(): void {

    this.linearData.push({
      id: 1,
      label: 'Start',
      state: TreeFlowNodeState.default,
    })

    this.linearData.push({
      id: 2,
      label: 'Step1',
      state: TreeFlowNodeState.default,
    })
    this.linearData.push({
      id: 3,
      label: 'Complete',
      state: TreeFlowNodeState.default,
    })

    const a = {
      id: 1,
      label: 'A',
      state: TreeFlowNodeState.default,
    };
    // this.data.push([a]);

    const b: TreeFlowNode = {
      id: 2,
      label: 'B',
      state: TreeFlowNodeState.default,
    };
    const c: TreeFlowNode = {
      id: 3,
      label: 'C',
      state: TreeFlowNodeState.default,
    };
    this.data.push([b, c]);

    const d: TreeFlowNode = {
      id: 44,
      label: 'D',
      state: TreeFlowNodeState.error,
    };
    this.data.push([d]);

    const e: TreeFlowNode = {
      id: 3,
      label: 'E',
      state: TreeFlowNodeState.error,
    };
    this.data.push([b, c]);
    this.data.push([b, c, e, c, c]);
    // this.data.push([e]);

    const source = interval(1000);

    const subscribe = source.subscribe({
      next: (t) => {
        // this.rotation ++;

        switch (this.data[0][0].state) {
          case TreeFlowNodeState.active:
            this.data[0][0].state = TreeFlowNodeState.completed;
            break;
          case TreeFlowNodeState.completed:
            this.data[0][0].state = TreeFlowNodeState.disabled;
            break;
          case TreeFlowNodeState.disabled:
            this.data[0][0].state = TreeFlowNodeState.enabled;
            break;
          case TreeFlowNodeState.enabled:
            this.data[0][0].state = TreeFlowNodeState.error;
            break;
          case TreeFlowNodeState.error:
            this.data[0][0].state = TreeFlowNodeState.default;
            break;
          case TreeFlowNodeState.default:
            this.data[0][0].state = TreeFlowNodeState.active;
            break;
        }
      },
    });
  }
}
