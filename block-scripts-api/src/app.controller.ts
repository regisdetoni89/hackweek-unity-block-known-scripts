import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { NewScriptDTO } from "./dto/newScript.dto";
import { NextScriptDto } from "./dto/nextScript.dto";
import { ScriptStatusDto } from "./dto/scriptStatus.dto";
import { VerifyScriptDTO } from "./dto/verifyScript.dto";

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

    @Get("unverified-scripts/next")
    async getNextUnverifiedScript(): Promise<NextScriptDto> {
        return await this.appService.getNextUnverifiedScript();
    }

    @Patch("scripts/:id")
    async verifyScript(
        @Param("id", new ParseIntPipe()) id: number,
        @Body() body: VerifyScriptDTO
    ) {
        try {
            await this.appService.verifyScript(id, body.isMalicious);
            return { success: true };
        } catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
            return { success: false, error: "Unknown error" };
        }
    }
}
