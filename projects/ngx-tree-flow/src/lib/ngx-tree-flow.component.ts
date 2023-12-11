import {Component, DoCheck, ElementRef, HostBinding, Inject, Input, KeyValueDiffers, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {TreeFlowNodeState} from './resource/TreeFlowNodeState';
import {TreeFlowNode} from './resource/TreeFlowNode';
import {DesignTreeFlowNode} from './resource/DesignTreeFlowNode';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'ngx-tree-flow',
  templateUrl: './ngx-tree-flow.component.html',
  styleUrls: ['./ngx-tree-flow.component.scss'],
})
export class NgxTreeFlowComponent implements OnInit, DoCheck {
  @ViewChild('anchorScroll')
  anchorScroll!: ElementRef;

  @Input('data')
  data: TreeFlowNode[][] | TreeFlowNode[] = [];

  @Input('maxWidth')
  maxWidth: string | undefined = undefined;

  @Input('minWidth')
  minWidth: string | undefined = undefined;

  @Input('viewboxWidth')
  viewboxWidth = 500;

  @Input('viewboxHeight')
  viewboxHeightInput: number | undefined = undefined;

  @Input('levelSpacing')
  levelSpacing = 65; //50 % 100

  @Input('nodeRadius')
  nodeRadius = 14; // 10 % 30

  @Input('nodeStrokeWidth')
  nodeStrokeWidth = 2;

  @Input('nodeJoinRadius')
  nodeJoinRadius = 8;

  @Input('nodeJoinStrokeWidth')
  nodeJoinStrokeWidth = 2;

  @Input('lineStrokeWidth')
  lineStrokeWidth = 2;

  @Input('rotation')
  rotation = 0;

  @Input('useLabels')
  useLabels = false;

  @Input('useStartingJoinNode')
  useStartingJoinNode = true;

  @Input('useEndingJoinNode')
  useEndingJoinNode = true;

  @Input('hideLinearModelLabel')
  hideLinearModelLabel = false;

  @Input('disableAutoLineColor')
  disableAutoLineColor = false;

  @Input('fitParent')
  fitParent = false;

  @Input('horizontalAlign')
  horizontalAlign: 'start' | 'center' | 'end' = 'center';

  @Input('scrollOnActive')
  scrollOnActive = false;

  protected viewBox: string | undefined = undefined;
  protected viewBoxNode: string | undefined = undefined;
  protected viewBoxJoinNode: string | undefined = undefined;
  protected verticalAlignTranslate = `translate(0, 0)`;
  protected design: DesignTreeFlowNode[][] = [];
  protected states = TreeFlowNodeState;

  private joinNode: TreeFlowNode = {
    id: -1,
    state: TreeFlowNodeState.default,
  };

  private _data: TreeFlowNode[][] = [];
  protected viewboxHeight!: number;

  private itemDifferMap = new Map<string, any>();
  private itemMap = new Map<string, TreeFlowNode>();

  private document: Document;

  constructor(@Inject(DOCUMENT) document: Document, private kvDiffers: KeyValueDiffers) {
    this.id = this.newGuid();
    this.document = document;
  }

  protected singleNode!: DesignTreeFlowNode;
  protected isSingleNode = false;
  protected isLinear = true;
  protected readonly id!: string;

  ngOnInit(): void {
    //choose if data is a linear array or if it is nested with multiple possible elements

    for (let level of this.data) {
      if (Array.isArray(level)) {
        this.isLinear = false;
        break;
      }
    }
    if (this.isLinear) {
      for (let level of this.data) {
        this._data.push([level] as any);
      }
    } else {
      for (let level of this.data) {
        this._data.push(level as any);
      }
    }

    //Create design collection
    let levelIndex = 0;
    for (let level of this._data) {
      let designNodes: DesignTreeFlowNode[] = [];

      levelIndex++;
      //next level if available or -1 if last level is reached
      let nextLevelIndex = levelIndex + 1;
      if (nextLevelIndex >= this._data.length) nextLevelIndex = -1;

      let nodeIndex = 1;

      //if first level has multiple object add a source node

      if (levelIndex == 1 && level.length >= 2) {
        const joiningNode = new DesignTreeFlowNode(this.joinNode, this._data[nextLevelIndex]);
        joiningNode.levelIndex = levelIndex;
        joiningNode.dx = this.viewboxWidth / 2 - this.nodeRadius;
        joiningNode.dy = (levelIndex - 1) * this.levelSpacing;
        joiningNode.levelNodeCount = level.length;
        joiningNode.nextLevelNodeCount = nextLevelIndex == -1 ? 0 : this._data[nextLevelIndex].length;
        // joiningNode.isJoinNode = true;

        if (this._data.indexOf(level) != 0 || this.useStartingJoinNode) {
          this.design.push([joiningNode]);
          levelIndex++;
        }
      }

      for (let node of level) {
        const designNode = new DesignTreeFlowNode(node);
        designNode.levelIndex = levelIndex;
        designNode.dx = nodeIndex * (this.viewboxWidth / (level.length + 1)) - this.nodeRadius;
        designNode.dy = (levelIndex - 1) * this.levelSpacing;
        designNode.levelNodeCount = level.length;
        designNode.nextLevelNodeCount = nextLevelIndex === -1 ? 0 : this._data[nextLevelIndex].length;
        //designNode.isJoinNode = false;

        designNodes.push(designNode);
        nodeIndex++;
      }
      this.design.push(designNodes);

      if (level.length >= 2 || (nextLevelIndex !== -1 && this._data[nextLevelIndex - 1].length >= 2)) {
        if (this._data.indexOf(level) + 1 != this._data.length || this.useEndingJoinNode) {
          levelIndex++;

          let referenceNodes = undefined;
          if (nextLevelIndex === -1) referenceNodes = this._data[this._data.length - 1];
          else referenceNodes = this._data[nextLevelIndex - 1];

          const joiningNode = new DesignTreeFlowNode(this.joinNode, referenceNodes);
          joiningNode.levelIndex = levelIndex;
          joiningNode.dx = this.viewboxWidth / 2 - this.nodeRadius;
          joiningNode.dy = (levelIndex - 1) * this.levelSpacing;
          joiningNode.levelNodeCount = level.length;
          joiningNode.nextLevelNodeCount = nextLevelIndex == -1 ? 0 : this._data[nextLevelIndex].length;
          //joiningNode.isJoinNode = true;

          this.design.push([joiningNode]);
        }
      }
    }

    if (this.viewboxHeightInput) this.viewboxHeight = this.viewboxHeightInput;
    else {
      this.viewboxHeight = this.design.length * this.levelSpacing;
    }

    this.viewBox = `0 0 ${this.viewboxWidth} ${this.viewboxHeight}`;
    this.viewBoxNode = `0 0 ${this.nodeRadius * 2 + this.nodeStrokeWidth} ${this.nodeRadius * 2 + this.nodeStrokeWidth}`;
    this.viewBoxJoinNode = `0 0 ${this.nodeJoinRadius * 2 + this.nodeJoinStrokeWidth} ${this.nodeJoinRadius * 2 + this.nodeJoinStrokeWidth}`;

    let vShift = 0;
    if (this.design.length === 1) {
      this.singleNode = this.design[0][0];
      vShift = (this.viewboxHeight - this.nodeRadius * 2) / 2;
      this.isSingleNode = true;
      this.viewBox = `0 0 100 100`;
      this.viewBoxNode = this.viewBox;
      this.nodeRadius = 40;
      this.nodeStrokeWidth = 5;
      this.fitParent = true;
    } else if (this.design.length > 1) vShift = (this.viewboxHeight - this.levelSpacing * (this.design.length - 1) - this.nodeRadius * 2) / 2;

    if (vShift <= 0) vShift = 0;

    this.verticalAlignTranslate = `translate(0, ${vShift})`;

    this._data.forEach((level) => {
      level.forEach((n) => {
        const id = this.id + '_node_' + n.id.toString();
        this.itemDifferMap.set(id, this.kvDiffers.find(n).create());
        this.itemMap.set(id, n);
      });
    });
  }

  ngDoCheck(): void {
    if (this.scrollOnActive && !this.fitParent) {
      for (let [key, nodeDiff] of this.itemDifferMap) {
        const anyChanges = nodeDiff.diff(this.itemMap.get(key));
        if (anyChanges) {
          anyChanges.forEachChangedItem((record: {readonly key: string; previousValue: any; currentValue: any}) => {
            if (record.key === 'state' && record.previousValue !== record.currentValue) {
              if (record.currentValue === TreeFlowNodeState.active) {
                this.scrollToActiveNode(key);
              }
            }
          });
        }
      }
    }
  }

  protected scrollToActiveNode(nodeId: string) {
    const t = this.document.getElementById(nodeId) as HTMLElement;
    t?.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'nearest',
    });
  }

  //Generate a prefix id for each compoent
  private newGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
