import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Script, ScriptUser, Prisma } from "@prisma/client";

@Injectable()
export class ScriptService {
    constructor(private prisma: PrismaService) {}

    async findByHash(hash: string): Promise<Script | null> {
        return this.prisma.script.findFirst({
            where: {
                hash: hash,
            },
        });
    }

    async createScript(data: Prisma.ScriptCreateInput): Promise<Script> {
        return this.prisma.script.create({
            data,
        });
    }

    async createScriptUser(
        data: Prisma.ScriptUserCreateInput
    ): Promise<ScriptUser> {
        return this.prisma.scriptUser.create({
            data,
        });
    }

    async increaseCounter(hash: string): Promise<Script | null> {
        const script = await this.findByHash(hash);
        if (!script) {
            return null;
        }
        return this.prisma.script.update({
            where: {
                id: script.id,
            },
            data: {
                usage: {
                    increment: 1,
                },
            },
        });
    }

    async verifyScrypt(id: number, isMalicious: boolean): Promise<Script> {
        return this.prisma.script.update({
            where: { id },
            data: { verified: true, isMalicious },
        });
    }

    async updateAlertKeywordFound(id: number, keywordAlertCount: number): Promise<Script> {
        return this.prisma.script.update({
            where: { id },
            data: { alertKeywordFound: keywordAlertCount },
        });
    }

    async getNextUnverifiedScript(): Promise<Script | null> {
        return this.prisma.script.findFirst({
            where: {
                verified: false,
            },
            orderBy: [{
                usage: "desc",
            }, {
                alertKeywordFound: "desc",
            }],
        });
    }

    async getScriptsThatHaventBeenCheckByKeywords(limit: number): Promise<Script[] | null> {
        return this.prisma.script.findMany({
            where: {
                verified: false,
                alertKeywordFound: -1,
            },
            orderBy: {
                usage: "desc",
            },
            take: limit
        });
    }

    async getAllAlertKeywords(): Promise<string[]> {
        const keywordsString:string[] = [];
        const keywords = await this.prisma.alertKeyword.findMany();
        for (const keyword of keywords) {
          keywordsString.push(keyword.name);
        }
        return keywordsString;
    }

    async countUnverifiedScripts(): Promise<number> {
        return this.prisma.script.count({
            where: {
                verified: false,
            },
        });
    }
}
