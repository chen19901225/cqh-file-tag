
import * as vscode from "vscode";

import * as path from "path";
import { getConfig } from "../config";
import { addTag, getTagHistoryList } from "../service_history";

export async function cqh_file_tag_from_file_name(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, {add_history=false}={}) {
    let document = textEditor.document;
    let fileName = path.basename(document.uri.fsPath).split(".")[0];
    let tag_list: Array<string> = [];
    tag_list.push(fileName);
    let tagExcludeList = getConfig().tagExCludeList || [];
    if (fileName.indexOf("__") > -1) {
        tag_list.push(...fileName.split("__"));
    }
    // let final_list: Array<string> = [...getTagHistoryList()]
    let final_list: Array<string> = []
    if(add_history){
        final_list.push(...getTagHistoryList());
    }
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

    let itemList = await vscode.window.showQuickPick(quickItemList, { canPickMany: true })

    if (!itemList) {
        return;
    }
    let startItem: vscode.QuickPickItem, endItem: vscode.QuickPickItem
    if (itemList.length == 1) {
        startItem = itemList[0]
        endItem = itemList[0]
    } else {
        startItem = itemList[0]
        endItem = itemList[itemList.length - 1]
    }
    // let { label, description } = item;
    let startIndex: number = -1, endIndex: number = -1;
    let final_tag_list = final_list;
    for (let i = 0; i < final_tag_list.length; i++) {
        let tag = final_tag_list[i];

        if (tag == startItem.description) {
            startIndex = i;
            // addTag(tag);
            // await vscode.commands.executeCommand("workbench.action.quickOpen", tag);
        }// if(title==description)
        if (tag == endItem.description) {
            endIndex = i;
        }
    }
    let desc = final_tag_list.slice(startIndex, endIndex + 1).join("__");
    addTag(desc);
    await vscode.commands.executeCommand("workbench.action.quickOpen", desc);



}