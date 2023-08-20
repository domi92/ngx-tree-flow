import { TreeFlowNodeState } from './TreeFlowNodeState';
import { ITreeFlowNode } from './ITreeFlowNode';
import { IDesignTreeFlowNode } from './IDesignTreeFlowNode';

export class DesignTreeFlowNode implements IDesignTreeFlowNode {
  private source: ITreeFlowNode;

  /**
   *
   */
  constructor(source: ITreeFlowNode) {
    this.source = source;
  }

  public dx!: number;
  public dy!: number;
  public levelIndex!: number;
  public levelNodeCount!: number;
  public nextLevelNodeCount!: number;
  public isJoinNode!: boolean;

  get id(): number {
    return this.source.id;
  }
  get label(): string | undefined {
    return this.source.label;
  }
  get state(): TreeFlowNodeState {
    return this.source.state;
  }
}
