export class NewScriptDTO {
  hash: string;
  content: string;
  source: string;

  constructor(hash: string, content: string, source: string) {
    this.hash = hash;
    this.content = content;
    this.source = source;
  }
}
