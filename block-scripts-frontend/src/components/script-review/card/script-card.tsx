import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Script } from "@/types/script";
import { ScriptActions } from "./script-actions";
import {
  getDisplayName,
  getSyntaxLanguage,
} from "@/lib/constants/mouse-software";
import { CodeBlock } from "@/components/codeblock";

interface ScriptCardProps {
  script: Script;
}

export function ScriptCard({ script }: ScriptCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Script #{script.id}</CardTitle>
        <CardDescription className="flex flex-col">
          <div>
            <span className="font-bold">Software: </span>
            <span className="text-muted-foreground">
              {getDisplayName(script.source)}
            </span>
          </div>
          <div>
            <span className="font-bold">Hash: </span>
            <span className="text-muted-foreground">{script.hash}</span>
          </div>
          <div>
            <span className="text-muted-foreground">
              Used <span className="font-bold text-yellow">{script.usage}</span> times
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">
              Detected Keywords <span className="font-bold text-red">{script.alertKeywordFound}</span> times
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CodeBlock
          lang={getSyntaxLanguage(script.source)}
          className="overflow-x-auto"
        >
          {script.content.trim()}
        </CodeBlock>
      </CardContent>
      <CardFooter className="flex justify-between sm:justify-end">
        <ScriptActions scriptId={script.id} />
      </CardFooter>
    </Card>
  );
}
