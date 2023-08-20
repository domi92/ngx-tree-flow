import { TreeFlowNodeState } from './TreeFlowNodeState';
import { ITreeFlowNode } from './ITreeFlowNode';

export class TreeFlowNode implements ITreeFlowNode {
  id!: number;
  label?: string;
  state!: TreeFlowNodeState;
}
