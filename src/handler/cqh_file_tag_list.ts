import * as vscode from "vscode";
import * as static_var from "../static_var"
import { IConfig,getSnippetForExt } from "../config";
import path = require("path");




export async function cqh_file_tag_list(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
    let document = textEditor.document;

    let blocks: Array<[string, vscode.Range]> = [];
    const lines: string[] = document.getText().split(/\r?\n/g);
    let i = 0;
    // let snippet = null;
    let ext = path.extname(document.uri.fsPath);
    let snippet = getSnippetForExt(ext);

    // for (let i = 0; i < config.byExt.length; i++) {
    //     let current_snippet = config.byExt[i];
    //     if (current_snippet.name === ext) {
    //         snippet = current_snippet;
    //         break;
    //     }
    // }
    let error_message = ""
    if (snippet == null) {
        error_message = `snippet 为空 [${ext}]`
        vscode.window.showErrorMessage(error_message);
        throw new Error(error_message);
    }

    let tag_list:Array<string> = [];



    for (let line_index = 0; line_index < lines.length; line_index++) {
        let currentLine = lines[line_index];
        currentLine = currentLine.trim();
        let start_text_list = ['cqh_file_tag', 'cqh-file-tag']
        for(let  start_text_piece of start_text_list) {

            let start_text = snippet.list[0] + start_text_piece;
            if (currentLine.startsWith(start_text)) {
                if (snippet.list[1] && !currentLine.endsWith(snippet.list[1])) {
                    continue;
                }
                let title = currentLine.slice(start_text.length);
                if(snippet.list[1]) {
                    title = title.slice(title.length-snippet.list[1].length);
                }
                let tag_piece_list = title.trim().split("||");
                for(let tag of tag_piece_list) {
                    tag_list.push(tag);
                }
                // requestRanges.push([line_index, line_index + 1, title]);
            }// // if currentLine.startsWith

        } // for


    }


    if (tag_list.length == 0) {
        error_message = "列表为空"
        vscode.window.showErrorMessage(error_message);
        throw new Error(error_message)

    };

    let quickPickItem: vscode.QuickPickItem[] = [];
    let stringprefix = (value: string, count: number): string => {
        let prefix = "0".repeat(count);
        let tmp = prefix + value;
        return tmp.slice(tmp.length - count);
    }
    for (let i = 0; i < tag_list.length; i++) {
        let prefix = stringprefix('' + i, 2);
        let tag = tag_list[i]
        quickPickItem.push({
            "label": `${prefix}.${tag}`,
            "description": tag

        })
    }

    let item = await vscode.window.showQuickPick(quickPickItem)

    if (!item) {
        return;
    }
    let { label, description } = item;
    for (let i = 0; i < tag_list.length; i++) {
        let tag = tag_list[i];
        if (tag == description) {
            await  vscode.commands.executeCommand("workbench.action.quickOpen", tag);
        }// if(title==description)
    }
}