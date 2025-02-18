import { PrismaClient } from "@prisma/client";
import * as crypto from "crypto";

const prisma = new PrismaClient();

const baseScripts = [
  {
    content: `
function OnEvent(event, arg)
  if event == "MOUSE_BUTTON_PRESSED" and arg == 1 then
    repeat
      PressMouseButton(1)
      Sleep(50)
      ReleaseMouseButton(1)
    until not IsMouseButtonPressed(1)
  end
end
    `,
    source: "Logitech GHUB",
    usage: 157842,
  },
  {
    content: `
function OnEvent(event, arg)
  if IsMouseButtonPressed(1) then
    MoveMouseRelative(0, 2)
    Sleep(10)
  end
end
    `,
    source: "Logitech GHUB",
    usage: 89234,
  },
  {
    content: `
<?xml version="1.0" encoding="utf-8"?>
<Macro>
  <Mouse>
    <Click>Left</Click>
    <Sleep>50</Sleep>
    <Release>Left</Release>
  </Mouse>
</Macro>
    `,
    source: "Razer Synapse",
    usage: 234567,
  },
  {
    content: `
<?xml version="1.0" encoding="utf-8"?>
<Macro>
  <Mouse>
    <Move Y="2" />
    <Sleep>10</Sleep>
  </Mouse>
</Macro>
    `,
    source: "Razer Synapse",
    usage: 123456,
  },
];

const scripts = Array.from({ length: 25 }, () =>
  baseScripts.map((script) => ({
    ...script,
    hash: crypto.randomBytes(16).toString("hex"),
    verified: false,
    isMalicious: false,
  }))
);

async function main() {
  await prisma.script.deleteMany({});

  await prisma.script.createMany({
    data: scripts.flat(),
  });

  console.log("Database seeded!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
