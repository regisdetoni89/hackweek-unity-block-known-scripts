import { Injectable } from "@nestjs/common";
import { ScriptStatusDto } from "./dto/scriptStatus.dto";
import { NewScriptDTO } from "./dto/newScript.dto";

@Injectable()
export class AppService {

  getScriptStatusByHash(hash: string): ScriptStatusDto {
    return {
      exist: false,
      isMalicious: false,
      scriptHash: hash,
    };
  }

  newScriptToInvestigate(hash: string, content: string): NewScriptDTO {
    return {
      content: content,
      hash: hash,
    };
  }
}
