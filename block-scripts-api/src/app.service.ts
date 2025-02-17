import { Injectable } from "@nestjs/common";
import { ScriptStatusDto } from "./dto/scriptStatus.dto";
import { NewScriptDTO } from "./dto/newScript.dto";
import { ScriptService } from "./script.service";
import { Script } from '@prisma/client';

@Injectable()
export class AppService {

  constructor(private script: ScriptService) {}

  async getScriptStatusByHash(hash: string): Promise<ScriptStatusDto> {
    const scriptFound:Script | null = await this.script.findByHash(hash);

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

  async newScriptToInvestigate(hash: string, content: string): Promise<NewScriptDTO> {
    await this.script.createScript({
      content: content,
      hash: hash,
      usage: 1,
      verified: false,
      isMalicious: false,  
    });
    return {
      content: content,
      hash: hash,
    };
  }

  async addUserToScript(steamId: string, hash: string): Promise<void> {
    try{
      await this.script.createScriptUser({
        hash: hash,
        steamId: steamId,
      });
    }catch(e){}
  }

  async increaseCounter(hash: string): Promise<void> {
    await this.script.increaseCounter(hash);
  }
}
