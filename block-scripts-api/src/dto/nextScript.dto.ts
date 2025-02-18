import { Script } from "@prisma/client";

export class NextScriptDto {
  script: Script | null;
  totalCount: number;

  constructor(script: Script, totalCount: number) {
    this.script = script;
    this.totalCount = totalCount;
  }
}
