"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fetch = require("node-fetch");
const uri = 'http://localhost:3000/metrics';
/**
 * CodelensProvider
 */
class CodelensProvider {
    constructor() {
        this.codeLenses = [];
        this._onDidChangeCodeLenses = new vscode.EventEmitter();
        this.onDidChangeCodeLenses = this._onDidChangeCodeLenses.event;
        this.regex = /(.+)/g;
        vscode.workspace.onDidChangeConfiguration((_) => {
            this._onDidChangeCodeLenses.fire();
        });
    }
    provideCodeLenses(document, token) {
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
    resolveCodeLens(codeLens, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (vscode.workspace.getConfiguration("cognide").get("enableCodeLens", true)) {
                var response = yield fetch(uri);
                var metrics = yield response.json();
                //console.log('Creating command...' + data(uri));
                codeLens.command = {
                    title: `Attention: ${metrics.attention} Meditation: ${metrics.meditation}`,
                    tooltip: "More informations",
                    command: "cognide.codelensAction",
                    arguments: ["Argument 1", false]
                };
                console.log('Returning CodeLens...');
                return codeLens;
            }
            return null;
        });
    }
}
exports.CodelensProvider = CodelensProvider;
//# sourceMappingURL=CodelensProvider.js.map