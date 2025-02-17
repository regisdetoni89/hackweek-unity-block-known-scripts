import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { AppService } from "./app.service";
import { ScriptStatusDto } from "./dto/scriptStatusDto";
import { NewScriptDTO } from "./dto/newScript.dto";

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("scripts/:hash")
  checkHash(@Param("hash") hash:string): ScriptStatusDto {
    return this.appService.getScriptStatusByHash(hash);
  }

  @Post("scripts")
  newScriptToInvestigate(@Body() body: NewScriptDTO): NewScriptDTO {
    return this.appService.newScriptToInvestigate(body.hash, body.content);
  }

}
