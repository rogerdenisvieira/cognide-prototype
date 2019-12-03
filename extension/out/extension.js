"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode_1 = require("vscode");
const CodelensProvider_1 = require("./CodelensProvider");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
var disposables = [];
function activate(context) {
    let codelensProvider = new CodelensProvider_1.CodelensProvider();
    vscode_1.languages.registerCodeLensProvider("*", codelensProvider);
    vscode_1.commands.registerCommand("cognide.enableCodeLens", () => {
        vscode_1.workspace.getConfiguration("cognide").update("enableCodeLens", true, true);
    });
    vscode_1.commands.registerCommand("cognide.disableCodeLens", () => {
        vscode_1.workspace.getConfiguration("cognide").update("enableCodeLens", false, true);
    });
    vscode_1.commands.registerCommand("cognide.codelensAction", (args) => {
        vscode_1.window.showInformationMessage(`CodeLens action clicked with args=${args}`);
        console.log("I've clicked in a action");
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    if (disposables) {
        disposables.forEach(item => item.dispose());
    }
    disposables = [];
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map