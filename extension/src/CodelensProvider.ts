import * as vscode from 'vscode';
import { url } from 'inspector';

const fetch = require("node-fetch");
const uri = 'http://localhost:3000/metrics';


/**
 * CodelensProvider
 */
export class CodelensProvider implements vscode.CodeLensProvider {

    private codeLenses: vscode.CodeLens[] = [];
    private regex: RegExp;
    private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
    public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

    constructor() {
        this.regex = /(.+)/g;

        vscode.workspace.onDidChangeConfiguration((_) => {
            this._onDidChangeCodeLenses.fire();
        });
    }

    public provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {

        if (vscode.workspace.getConfiguration("cognide").get("enableCodeLens", true)) {
            this.codeLenses = [];
            const regex = new RegExp(this.regex);
            const text = document.getText();
            let matches;
            while ((matches = regex.exec(text)) !== null) {
                let line = document.lineAt(document.positionAt(matches.index).line);
                let indexOf = line.text.indexOf(matches[0]);
                let position = new vscode.Position(line.lineNumber, indexOf);
                let range = document.getWordRangeAtPosition(position, new RegExp(this.regex));
                if (range) {
                    this.codeLenses.push(new vscode.CodeLens(range));
                }
            }
            return this.codeLenses;
        }
        return [];
    }

    public async resolveCodeLens(codeLens: vscode.CodeLens, token: vscode.CancellationToken) {
        if (vscode.workspace.getConfiguration("cognide").get("enableCodeLens", true)) {


            var response = await fetch(uri);
            var metrics = await response.json()

            //console.log('Creating command...' + data(uri));
            codeLens.command = {
                title: `Attention: ${metrics.attention} Meditation: ${metrics.meditation}` ,
                tooltip: "More informations",
                command: "cognide.codelensAction",
                arguments: ["Argument 1", false]
            };
            
            console.log('Returning CodeLens...');
            return codeLens;
        }
        return null;
    }
}

