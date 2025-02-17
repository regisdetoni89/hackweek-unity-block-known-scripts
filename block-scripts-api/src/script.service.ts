import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Script, ScriptUser, Prisma } from '@prisma/client';

@Injectable()
export class ScriptService {

    constructor(private prisma: PrismaService) {}

    async findByHash (hash: string): Promise<Script | null> {

        return this.prisma.script.findFirst({
          where: {
            hash: hash,
          },
        });
        
    }

    async createScript (data: Prisma.ScriptCreateInput): Promise<Script> {
        return this.prisma.script.create({
            data,
        });
    }

    async createScriptUser (data: Prisma.ScriptUserCreateInput): Promise<ScriptUser> {
        return this.prisma.scriptUser.create({
            data,
        });
    }

    async increaseCounter (hash: string): Promise<Script | null> {
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

}