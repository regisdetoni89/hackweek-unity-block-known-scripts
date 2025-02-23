import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScriptService } from "./script.service";
import { Script } from "@prisma/client";

@Injectable()
export class TaskService {

    constructor(private script: ScriptService) {}

    @Cron(
        CronExpression.EVERY_MINUTE,
        {
            waitForCompletion: true
        }
    )
    async handleCron() {

        const scripts:Script[] | null = await this.script.getScriptsThatHaventBeenCheckByKeywords(20);
        if(scripts == null){
            return;
        }

        if(scripts.length == 0){
            return;
        }

        const keywords:string[] = await this.script.getAllAlertKeywords();

        for(const script of scripts){
            const count:number = this.checkKeywordsOnScript(script, keywords);
            await this.script.updateAlertKeywordFound(script.id, count);
        }

    }

    checkKeywordsOnScript(script:Script, keywords:string[]):number{
        let count:number = 0;
        for(const keyword of keywords){
            if(script.content.includes(keyword)){
                count++;
            }
        }
        return count;
    }

}