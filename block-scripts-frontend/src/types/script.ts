export interface Script {
  id: number;
  hash: string;
  content: string;
  source: string;
  usage: number;
  verified: boolean;
  isMalicious: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UnverifiedScriptsResponse {
  script: Script;
  totalCount: number;
}
