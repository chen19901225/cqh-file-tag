// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { cqh_file_tag_from_file_name_history } from './handler/cqh_file_tag_form_file_name_single';
import { cqh_file_tag_from_file_name, cqh_file_tag_from_file_name_insert } from './handler/cqh_file_tag_from_file_name';
import { cqh_file_tag_list } from './handler/cqh_file_tag_list';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cqh-file-tag" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerTextEditorCommand('cqh-file-tag.list', async (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		await cqh_file_tag_list(textEditor, edit);
		// vscode.window.showInformationMessage('Hello World from cqh_file_tag!');
	});
	context.subscriptions.push(disposable);

	let fileDisposable = vscode.commands.registerTextEditorCommand("cqh-file-tag.from_file_name", async (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		await cqh_file_tag_from_file_name(textEditor, edit);
		// vscode.window.showInformationMessage('Hello World from cqh_file_tag!');
	})

	context.subscriptions.push(fileDisposable);


	let fileDisposableSingle = vscode.commands.registerTextEditorCommand("cqh-file-tag.from_file_name_history", async (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		await cqh_file_tag_from_file_name_history(textEditor, edit);
		// vscode.window.showInformationMessage('Hello World from cqh_file_tag!');
	})

	context.subscriptions.push(fileDisposableSingle);


	let fileDisposableInsert = vscode.commands.registerTextEditorCommand("cqh-file-tag.from_file_name_insert", async (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		await cqh_file_tag_from_file_name_insert(textEditor, edit);
		// vscode.window.showInformationMessage('Hello World from cqh_file_tag!');
	})

	context.subscriptions.push(fileDisposableInsert);
}

// this method is called when your extension is deactivated
export function deactivate() { }
