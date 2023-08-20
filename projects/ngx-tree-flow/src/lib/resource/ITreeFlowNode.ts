import { TreeFlowNodeState } from './TreeFlowNodeState';

export interface ITreeFlowNode {
  id: number;
  label?: string;
  state: TreeFlowNodeState;
}
