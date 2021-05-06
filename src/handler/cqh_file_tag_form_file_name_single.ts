
import * as vscode from "vscode";

import * as path from "path";
import { getConfig } from "../config";
import { addTag, getTagHistoryList } from "../service_history";

export async function cqh_file_tag_from_file_name_single(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
    let document = textEditor.document;
    let fileName = path.basename(document.uri.fsPath);
    let tag_list: Array<string> = [];
    tag_list.push(fileName);
    let tagExcludeList = getConfig().tagExCludeList || [];
    if (fileName.indexOf("__") > -1) {
        tag_list.push(...fileName.split("__"));
    }
    let final_list: Array<string> = [...getTagHistoryList()]
    for (let piece of tag_list) {
        piece = piece.trim();
        if (piece.length > 0 && tagExcludeList.indexOf(piece) == -1) {
            final_list.push(piece);
        }
    }
    if (final_list.length == 0) {
        vscode.window.showErrorMessage("final_list 为空")
        return;
    }

    let stringprefix = (value: string, count: number): string => {
        let prefix = "0".repeat(count);
        let tmp = prefix + value;
        return tmp.slice(tmp.length - count);
    }
    let quickItemList: vscode.QuickPickItem[] = [];
    for (let i = 0; i < final_list.length; i++) {
        let tag = final_list[i];
        let prefix = stringprefix('' + i, 2);
        quickItemList.push({
            "label": `${prefix}.${tag}`,
            "description": tag

        })

    }

    let item = await vscode.window.showQuickPick(quickItemList)

    if (!item) {
        return;
    }
    let { label, description } = item;
    let final_tag_list = final_list;
    for (let i = 0; i < final_tag_list.length; i++) {
        let tag = final_tag_list[i];

        if (tag == description) {
            addTag(tag);
            await vscode.commands.executeCommand("workbench.action.quickOpen", tag);
        }// if(title==description)
    }


}