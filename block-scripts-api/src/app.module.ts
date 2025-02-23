import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma.service";
import { ScriptService } from "./script.service";
import { ScheduleModule } from "@nestjs/schedule";
import { TaskService } from "./task.service";

@Module({
    imports: [ScheduleModule.forRoot()],
    controllers: [AppController],
    providers: [AppService, PrismaService, ScriptService, TaskService],
})
export class AppModule {}
