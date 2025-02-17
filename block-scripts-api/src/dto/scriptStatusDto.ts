
export class ScriptStatusDto {

    scriptHash: string;
    isMalicious: boolean;
    exist: boolean;
    
    constructor(scriptHash: string, isMalicious: boolean, exist: boolean) {
        this.scriptHash = scriptHash;
        this.isMalicious = isMalicious;
        this.exist = exist;
    }

}
