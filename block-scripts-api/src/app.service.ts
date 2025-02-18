import { Injectable } from "@nestjs/common";
import { Script } from "@prisma/client";
import { NewScriptDTO } from "./dto/newScript.dto";
import { NextScriptDto } from "./dto/nextScript.dto";
import { ScriptStatusDto } from "./dto/scriptStatus.dto";
import { ScriptService } from "./script.service";

@Injectable()
export class AppService {
  constructor(private script: ScriptService) {}

  async getScriptStatusByHash(hash: string): Promise<ScriptStatusDto> {
    const scriptFound: Script | null = await this.script.findByHash(hash);

    if (!scriptFound) {
      return {
        exist: false,
        verified: false,
        isMalicious: false,
        scriptHash: hash,
      };
    }

    return {
      exist: scriptFound ? true : false,
      verified: !!scriptFound.verified,
      isMalicious: !!scriptFound.isMalicious,
      scriptHash: hash,
    };
  }

  async newScriptToInvestigate(
    hash: string,
    content: string,
    source: string
  ): Promise<NewScriptDTO> {
    await this.script.createScript({
      content: content,
      hash: hash,
      source: source,
      usage: 1,
      verified: false,
      isMalicious: false,
    });
    return {
      content: content,
      hash: hash,
      source: source,
    };
  }

  async addUserToScript(steamId: string, hash: string): Promise<void> {
    try {
      await this.script.createScriptUser({
        hash: hash,
        steamId: steamId,
      });
    } catch (e) {}
  }

  async increaseCounter(hash: string): Promise<void> {
    await this.script.increaseCounter(hash);
  }

  async verifyScript(id: number, isMalicious: boolean): Promise<void> {
    try {
      await this.script.verifyScrypt(id, isMalicious);
    } catch (error) {
      throw new Error("Failed to verify script: " + error);
    }
  }

  async getNextUnverifiedScript(): Promise<NextScriptDto> {
    try {
      const [script, totalCount] = await Promise.all([
        this.script.getNextUnverifiedScript(),
        this.script.countUnverifiedScripts(),
      ]);

      return {
        script,
        totalCount,
      };
    } catch (error) {
      throw new Error("Failed to fetch next unverified script: " + error);
    }
  }
}
