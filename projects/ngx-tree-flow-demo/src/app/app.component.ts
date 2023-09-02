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
      state: TreeFlowNodeState.completed,
    });

    this.linearData.push({
      id: 2,
      label: 'Step1',
      state: TreeFlowNodeState.error,
    });
    this.linearData.push({
      id: 3,
      label: 'Complete',
      state: TreeFlowNodeState.disabled,
    });

    const a = {
      id: 1,
      label: 'A',
      state: TreeFlowNodeState.completed,
    };
    // this.data.push([a]);

    const b: TreeFlowNode = {
      id: 2,
      label: 'B',
      state: TreeFlowNodeState.active,
    };
    const c: TreeFlowNode = {
      id: 3,
      label: 'C',
      state: TreeFlowNodeState.disabled,
    };
    const d: TreeFlowNode = {
      id: 4,
      label: 'D',
      state: TreeFlowNodeState.enabled,
    };
    const e: TreeFlowNode = {
      id: 5,
      label: 'E',
      state: TreeFlowNodeState.default,
    };
    const f: TreeFlowNode = {
      id: 6,
      label: 'F',
      state: TreeFlowNodeState.disabled,
    };
    const g: TreeFlowNode = {
      id: 7,
      label: 'G',
      state: TreeFlowNodeState.disabled,
    };
    const h: TreeFlowNode = {
      id: 8,
      label: 'H',
      state: TreeFlowNodeState.error,
    };

    this.data.push([a, b]);

    this.data.push([c]);

    this.data.push([d, e]);
    this.data.push([f, g, h]);
    // this.data.push([e]);

    const source = interval(1000);

    const subscribe = source.subscribe({
      next: (t) => {
        // this.rotation ++;

        switch (h.state) {
          case TreeFlowNodeState.active:
            h.state = TreeFlowNodeState.completed;
            break;
          case TreeFlowNodeState.completed:
            h.state = TreeFlowNodeState.disabled;
            break;
          case TreeFlowNodeState.disabled:
            h.state = TreeFlowNodeState.enabled;
            break;
          case TreeFlowNodeState.enabled:
            h.state = TreeFlowNodeState.error;
            break;
          case TreeFlowNodeState.error:
            h.state = TreeFlowNodeState.default;
            break;
          case TreeFlowNodeState.default:
            h.state = TreeFlowNodeState.active;
            break;
        }
      },
    });
  }
}
