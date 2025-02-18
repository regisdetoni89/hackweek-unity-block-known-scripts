"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { verifyScript } from "@/actions/scripts";
import { CheckIcon, XIcon } from "lucide-react";

interface ScriptActionsProps {
  scriptId: number;
}

export function ScriptActions({ scriptId }: ScriptActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAction = async (action: "malicious" | "safe") => {
    startTransition(async () => {
      if (action === "safe") {
        await verifyScript(scriptId, false);
      } else {
        await verifyScript(scriptId, true);
      }
      router.refresh();
    });
  };

  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
      <Button
        variant="destructive"
        onClick={() => handleAction("malicious")}
        disabled={isPending}
      >
        <XIcon />
        Flag as Malicious
      </Button>
      <Button
        variant="default"
        onClick={() => handleAction("safe")}
        disabled={isPending}
      >
        <CheckIcon />
        Mark as Safe
      </Button>
    </div>
  );
}
