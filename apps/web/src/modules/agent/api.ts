/** Agent 业务模块（示例占位） */
export interface Agent {
  id: string;
  name: string;
  description?: string;
}

export async function listAgents(): Promise<Agent[]> {
  return [{ id: '1', name: '示例 Agent', description: '占位用，业务侧自行替换' }];
}
