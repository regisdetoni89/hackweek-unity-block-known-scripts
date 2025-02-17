
export class ScriptStatusDto {

    scriptHash: string;
    isMalicious: boolean;
    exist: boolean;
    verified: boolean;
    
    constructor(scriptHash: string, isMalicious: boolean, exist: boolean, verified: boolean) {
        this.scriptHash = scriptHash;
        this.isMalicious = isMalicious;
        this.exist = exist;
        this.verified = verified;
    }

}
