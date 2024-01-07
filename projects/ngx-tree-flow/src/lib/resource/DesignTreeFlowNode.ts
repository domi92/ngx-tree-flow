import {TreeFlowNodeState} from './TreeFlowNodeState';
import {ITreeFlowNode} from './ITreeFlowNode';
import {IDesignTreeFlowNode} from './IDesignTreeFlowNode';

export class DesignTreeFlowNode implements IDesignTreeFlowNode {
  private source: ITreeFlowNode;

  private _isJoinNode: boolean = false;
  private references: ITreeFlowNode[] | undefined = undefined;

  /**
   * if ony a source if provided a simple node is created. if
   */
  constructor(source: ITreeFlowNode, references: ITreeFlowNode[] | undefined = undefined) {
    this.source = source;
    this.references = references;

    if (references !== undefined) this._isJoinNode = true;
  }

  public dx!: number;
  public dy!: number;
  public levelIndex!: number;
  public levelNodeCount!: number;
  public nextLevelNodeCount!: number;
  //public isJoinNode!: boolean;

  get isJoinNode(): boolean {
    return this._isJoinNode;
  }

  get id(): number {
    return this.source.id;
  }
  get label(): string | undefined {
    return this.source.label;
  }

  get state(): TreeFlowNodeState {
    if (!this._isJoinNode) return this.source.state;
    else {
      return this.maxValue();
    }
  }

  private maxValue(): TreeFlowNodeState {
    if (!this.references) return this.source.state;
    else {
      const min = Math.min(...this.references.map((e) => e.state));
      const max = Math.max(...this.references.map((e) => e.state));

      if (max === TreeFlowNodeState.error) return max;

      return min;
    }
  }
}
