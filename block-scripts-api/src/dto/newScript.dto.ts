
export class NewScriptDTO {

    hash: string;
    content: string;
    
    constructor(hash: string, content:string) {
        this.hash = hash;
        this.content = content;
    }

}
