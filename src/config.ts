import * as vscode from "vscode"
import { extname } from "path";

export interface ICommand {
    name: string
    list: [string, string];
}

export interface IConfig extends vscode.WorkspaceConfiguration {
    byExt: ICommand[];
}

export function getSnippetForExt(ext: string):ICommand|null {
    if(!ext.startsWith(".")){ // 不是ext二十路径
        ext = extname(ext);
    }
    let config = vscode.workspace.getConfiguration("cqh-file-tag") as IConfig;
    let snippet = null;
    for(let i=0;i<config.byExt.length;i++){
        let current_snippet = config.byExt[i];
        if(current_snippet.name === ext){
            snippet = current_snippet;
            break;
        }
    }
    
    return snippet;
    //return null;
}