import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { AppService } from "./app.service";
import { ScriptStatusDto } from "./dto/scriptStatus.dto";
import { NewScriptDTO } from "./dto/newScript.dto";

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("scripts/:hash/:steamId")
  async checkHash(
    @Param("hash") hash: string,
    @Param("steamId") steamId: string
  ): Promise<ScriptStatusDto> {
    const status: ScriptStatusDto =
      await this.appService.getScriptStatusByHash(hash);
    await this.appService.addUserToScript(steamId, hash);
    await this.appService.increaseCounter(hash);
    return status;
  }

  @Post("scripts")
  async newScriptToInvestigate(
    @Body() body: NewScriptDTO
  ): Promise<NewScriptDTO> {
    return this.appService.newScriptToInvestigate(
      body.hash,
      body.content,
      body.source
    );
  }
}
