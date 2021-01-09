

let global_tag_history_list: Array<string> = []


export function addTag(piece: string) {
    let global_index = global_tag_history_list.indexOf(piece);
    if (global_index > -1) {
        global_tag_history_list.splice(global_index, 1);

    }
    global_tag_history_list.unshift(piece);
    if (global_tag_history_list.length > 5) {
        global_tag_history_list.pop();
    }
}

export function getTagHistoryList(): Array<string> {
    return global_tag_history_list;
}