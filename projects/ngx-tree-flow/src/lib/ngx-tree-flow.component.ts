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
  @Input('data')
  data: TreeFlowNode[][] = [];

  @Input('levelSpacing')
  levelSpacing: number = 65; //50 % 100

  @Input('nodeRadius')
  nodeRadius: number = 14; // 10 % 30

  @Input('nodeStrokeWidth')
  nodeStrokeWidth: number = 2;

  @Input('nodeJoinRadius')
  nodeJoinRadius = 8;
  @Input('nodeJoinStrokeWidth')
  nodeJoinStrokeWidth: number = 2;

  @Input('lineStrokeWidth')
  lineStrokeWidth: number = 2;

  @Input('rotation')
  rotation = 0;

  @Input('useLabels')
  useLabels: boolean = true;

  @Input('useStartingJoinNode')
  useStartingJoinNode: boolean = true;

  @Input('useEndingJoinNode')
  useEndingJoinNode: boolean = true;

  protected width: number = 500;
  protected height: number = 680;
  protected viewBox: string | undefined = undefined;
  protected viewBoxNode: string | undefined = undefined;
  protected viewBoxJoinNode: string | undefined = undefined;
  protected verticalAlignTranslate: string = `translate(0, 0)`;
  protected design: DesignTreeFlowNode[][] = [];
  protected states = TreeFlowNodeState;

  private joinNode: TreeFlowNode = {
    id: -1,
    state: TreeFlowNodeState.default,
  };

  constructor() {}

  ngOnInit(): void {
    this.viewBox = `0 0 ${this.width} ${this.height}`;
    this.viewBoxNode = `0 0 ${this.nodeRadius * 2 + this.nodeStrokeWidth} ${
      this.nodeRadius * 2 + this.nodeStrokeWidth
    }`;
    this.viewBoxJoinNode = `0 0 ${this.nodeJoinRadius * 2 + this.nodeJoinStrokeWidth} ${
      this.nodeJoinRadius * 2 + this.nodeJoinStrokeWidth
    }`;

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
        joiningNode.levelIndex = levelIndex;
        joiningNode.dx = this.width / 2 - this.nodeRadius;
        joiningNode.dy = (levelIndex - 1) * this.levelSpacing;
        joiningNode.levelNodeCount = level.length;
        joiningNode.nextLevelNodeCount = nextLevelIndex == -1 ? 0 : this.data[nextLevelIndex].length;
        joiningNode.isJoinNode = true;

        if (this.data.indexOf(level) != 0 || this.useStartingJoinNode) {
          this.design.push([joiningNode]);
          levelIndex++;
        }
      }

      for (let node of level) {
        const designNode = new DesignTreeFlowNode(node);
        designNode.levelIndex = levelIndex;
        designNode.dx = nodeIndex * (this.width / (level.length + 1)) - this.nodeRadius;
        designNode.dy = (levelIndex - 1) * this.levelSpacing;
        designNode.levelNodeCount = level.length;
        designNode.nextLevelNodeCount = nextLevelIndex === -1 ? 0 : this.data[nextLevelIndex].length;
        designNode.isJoinNode = false;

        designNodes.push(designNode);
        nodeIndex++;
      }
      this.design.push(designNodes);

      if (level.length >= 2) {
        levelIndex++;

        const joiningNode = new DesignTreeFlowNode(this.joinNode);
        joiningNode.levelIndex = levelIndex;
        joiningNode.dx = this.width / 2 - this.nodeRadius;
        joiningNode.dy = (levelIndex - 1) * this.levelSpacing;
        joiningNode.levelNodeCount = level.length;
        joiningNode.nextLevelNodeCount = nextLevelIndex == -1 ? 0 : this.data[nextLevelIndex].length;
        joiningNode.isJoinNode = true;

        if (this.data.indexOf(level) + 1 != this.data.length || this.useEndingJoinNode) this.design.push([joiningNode]);
      }
    }

    const vShift = (this.height - this.levelSpacing * (this.design.length - 1)) / 2;
    this.verticalAlignTranslate = `translate(0, ${vShift})`;
  }
}
