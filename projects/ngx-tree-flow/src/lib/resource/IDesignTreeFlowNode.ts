import { ITreeFlowNode } from './ITreeFlowNode';

export interface IDesignTreeFlowNode extends ITreeFlowNode {
  dx: number;
  dy: number;
  levelIndex: number;
  levelNodeCount: number;
  nextLevelNodeCount: number;
  isJoinNode: boolean;
}
