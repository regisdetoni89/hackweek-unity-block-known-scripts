import { Script, UnverifiedScriptsResponse } from "@/types/script";
import { ScriptCard } from "@/components/script-review/card/script-card";

async function getNextScript(): Promise<{
  script: Script;
  totalCount: number;
}> {
  const response = await fetch(
    `${process.env.API_URL}/api/unverified-scripts/next`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch script");
  }

  const { script, totalCount }: UnverifiedScriptsResponse =
    await response.json();

  return { script, totalCount };
}

export default async function ScriptReviewQueuePage() {
  const { script, totalCount } = await getNextScript();

  if (!script) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Script Review Queue</h1>
        <p className="text-center text-lg font-medium text-muted-foreground">
          No more scripts to review
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Script Review Queue</h1>
        <p className="text-sm text-muted-foreground">
          {totalCount} scripts pending review
        </p>
      </div>

      <ScriptCard script={script} />
    </div>
  );
}
