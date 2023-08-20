import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { TreeFlowNodeState } from './resource/TreeFlowNodeState';
import { TreeFlowNode } from './resource/TreeFlowNode';
import { DesignTreeFlowNode } from './resource/DesignTreeFlowNode';

@Component({
  selector: 'ngx-tree-flow',
  templateUrl: './ngx-tree-flow.component.html',
  styleUrls: ['./ngx-tree-flow.component.scss'],
})
export class NgxTreeFlowComponent {
  @Input('levelSpacing')
  levelSpacing: number = 75; //50 % 100

  @Input('nodeRadius')
  nodeRadius: number = 20; // 10 % 30

  nodeJoinRadius = 10;

  @Input('rotation')
  rotation = 0;
  useLabels: boolean = true;

  protected width: number = 500;
  protected height: number = 680;
  protected viewBox: string | undefined = undefined;
  protected viewBoxNode: string | undefined = undefined;
  protected viewBoxJoinNode: string | undefined = undefined;
  protected verticalAlignTranslate: string = `translate(0, 0)`;

  protected data: TreeFlowNode[][] = [];
  protected design: DesignTreeFlowNode[][] = [];

  protected a: TreeFlowNode;

  protected states = TreeFlowNodeState;

  private joinNode: TreeFlowNode = {
    id: -1,
    state: TreeFlowNodeState.default,
  };

  constructor() {
    this.a = {
      id: 1,
      label: 'A',
      state: TreeFlowNodeState.default,
    };
    this.data.push([this.a]);

    const b: TreeFlowNode = {
      id: 2,
      label: 'B',
      state: TreeFlowNodeState.disabled,
    };
    const c: TreeFlowNode = {
      id: 3,
      label: 'C',
      state: TreeFlowNodeState.active,
    };
    this.data.push([b, c]);

    const d: TreeFlowNode = {
      id: 44,
      label: 'D',
      state: TreeFlowNodeState.completed,
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
  }

  ngOnInit(): void {
    this.viewBox = `0 0 ${this.width} ${this.height}`;
    this.viewBoxNode = `0 0 ${this.nodeRadius * 2} ${this.nodeRadius * 2}`;
    this.viewBoxJoinNode = `0 0 ${this.nodeJoinRadius * 2} ${this.nodeJoinRadius * 2}`;

    //Create design collection
    let levelIndex = 0;
    for (let level of this.data) {
      let designNodes: DesignTreeFlowNode[] = [];

      levelIndex++;
      let nextLevelIndex = levelIndex + 1;
      if (nextLevelIndex >= this.data.length) nextLevelIndex = -1;

      let nodeIndex = 1;

      //if first level has multiple object add a source node

      if (levelIndex == 1 && level.length >= 2) {
        const joiningNode = new DesignTreeFlowNode(this.joinNode);
        (joiningNode.levelIndex = levelIndex),
          (joiningNode.dx = this.width / 2 - this.nodeRadius),
          (joiningNode.dy = (levelIndex - 1) * this.levelSpacing),
          (joiningNode.levelNodeCount = level.length),
          (joiningNode.nextLevelNodeCount = nextLevelIndex == -1 ? 0 : this.data[nextLevelIndex].length),
          (joiningNode.isJoinNode = true);

        this.design.push([joiningNode]);
        levelIndex++;
      }

      for (let node of level) {
        const designNode = new DesignTreeFlowNode(node);
        (designNode.levelIndex = levelIndex),
          (designNode.dx = nodeIndex * (this.width / (level.length + 1)) - this.nodeRadius),
          (designNode.dy = (levelIndex - 1) * this.levelSpacing),
          (designNode.levelNodeCount = level.length);
        designNode.nextLevelNodeCount = nextLevelIndex === -1 ? 0 : this.data[nextLevelIndex].length;
        designNode.isJoinNode = false;

        designNodes.push(designNode);
        nodeIndex++;
      }
      this.design.push(designNodes);

      if (level.length >= 2) {
        levelIndex++;

        const joiningNode = new DesignTreeFlowNode(this.joinNode);
        (joiningNode.levelIndex = levelIndex),
          (joiningNode.dx = this.width / 2 - this.nodeRadius),
          (joiningNode.dy = (levelIndex - 1) * this.levelSpacing),
          (joiningNode.levelNodeCount = level.length),
          (joiningNode.nextLevelNodeCount = nextLevelIndex == -1 ? 0 : this.data[nextLevelIndex].length),
          (joiningNode.isJoinNode = true);

        this.design.push([joiningNode]);
      }
    }

    const vShift = (this.height - this.levelSpacing * (this.design.length - 1)) / 2;
    this.verticalAlignTranslate = `translate(0, ${vShift})`;

    const source = interval(1000);

    const subscribe = source.subscribe({
      next: (_) => {
        // this.rotation ++;

        switch (this.a.state) {
          case TreeFlowNodeState.active:
            this.a.state = TreeFlowNodeState.completed;
            break;
          case TreeFlowNodeState.completed:
            this.a.state = TreeFlowNodeState.disabled;
            break;
          case TreeFlowNodeState.disabled:
            this.a.state = TreeFlowNodeState.enabled;
            break;
          case TreeFlowNodeState.enabled:
            this.a.state = TreeFlowNodeState.error;
            break;
          case TreeFlowNodeState.error:
            this.a.state = TreeFlowNodeState.default;
            break;
          case TreeFlowNodeState.default:
            this.a.state = TreeFlowNodeState.active;
            break;
        }
      },
    });
  }
}
