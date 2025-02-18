import { codeToHtml, type BundledLanguage } from "shiki";

interface Props {
  children: string;
  lang: BundledLanguage;
  className?: string;
}

export async function CodeBlock({ children, lang, className }: Props) {
  const out = await codeToHtml(children, {
    lang,
    theme: "github-dark-default",
  });

  return (
    <div dangerouslySetInnerHTML={{ __html: out }} className={className} />
  );
}
