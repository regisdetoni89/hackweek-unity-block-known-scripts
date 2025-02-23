import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma.service";
import { ScriptService } from "./script.service";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
    imports: [ScheduleModule.forRoot()],
    controllers: [AppController],
    providers: [AppService, PrismaService, ScriptService],
})
export class AppModule {}
