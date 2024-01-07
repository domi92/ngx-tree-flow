import {Component, OnInit} from '@angular/core';
import {TreeFlowNode} from 'projects/ngx-tree-flow/src/lib/resource/TreeFlowNode';
import {TreeFlowNodeState} from 'projects/ngx-tree-flow/src/lib/resource/TreeFlowNodeState';
import {interval} from 'rxjs';

@Component({
  selector: 'ngx-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  protected fistData: TreeFlowNode[][] = [];
  protected scrollingData: TreeFlowNode[][] = [];

  protected linearDataActive!: TreeFlowNode;
  protected linearData: TreeFlowNode[] = [];

  protected singleData: TreeFlowNode[] = [];

  ngOnInit(): void {
    this.singleData.push({
      id: 1,
      label: 'Start',
      state: TreeFlowNodeState.default,
    });

    for (var i = 1; i < 29; i++) {
      this.linearData.push({
        id: i,
        label: 'Start',
        state: TreeFlowNodeState.enabled,
      });
    }

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
      state: TreeFlowNodeState.disabled,
    };

    this.fistData.push([a, b]);

    this.fistData.push([c]);

    this.fistData.push([d, e]);
    this.fistData.push([f, g, h]);
    // this.data.push([e]);
    this.scrollingData = [...this.fistData];

    const source = interval(1600);

    const subscribe = source.subscribe({
      next: (t) => {
        // this.rotation ++;

        //Basic change e state
        var node = c;
        switch (node.state) {
          case TreeFlowNodeState.active:
            node.state = TreeFlowNodeState.completed;
            break;
          case TreeFlowNodeState.completed:
            node.state = TreeFlowNodeState.disabled;
            break;
          case TreeFlowNodeState.disabled:
            node.state = TreeFlowNodeState.enabled;
            break;
          case TreeFlowNodeState.enabled:
            node.state = TreeFlowNodeState.error;
            break;
          case TreeFlowNodeState.error:
            node.state = TreeFlowNodeState.default;
            break;
          case TreeFlowNodeState.default:
            node.state = TreeFlowNodeState.active;
            break;
        }

        if (!this.linearDataActive) {
          this.linearDataActive = this.linearData[0];
        } else {
          const index = this.linearData.findIndex((e) => e === this.linearDataActive);
          if (index < this.linearData.length - 1) this.linearDataActive = this.linearData[index + 1];
          else {
            this.linearData.forEach((e) => (e.state = TreeFlowNodeState.enabled));
            this.linearDataActive = this.linearData[0];
          }
        }

        this.linearDataActive.state = TreeFlowNodeState.active;
      },
    });
  }
}
