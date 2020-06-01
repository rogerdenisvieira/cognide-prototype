// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, languages, commands, Disposable, workspace, window, ConfigurationTarget } from 'vscode';
import { CodelensProvider } from './CodelensProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

var disposables: Disposable[] = [];

export function activate(context: ExtensionContext) {
    let codelensProvider = new CodelensProvider();

    languages.registerCodeLensProvider({ scheme: 'file', language: 'csharp' }, codelensProvider);

    commands.registerCommand("cognide.enableCodeLens", () => {
        workspace.getConfiguration("cognide").update("enableCodeLens", true, true);
    });

    commands.registerCommand("cognide.disableCodeLens", () => {
        workspace.getConfiguration("cognide").update("enableCodeLens", false, true);
    });

    commands.registerCommand("cognide.codelensAction", (line, metrics) => {


        window.showInformationMessage(`Line: ${line} 
        \nAttention: ${metrics.eSense.attention} 
        \nMeditation: ${metrics.eSense.meditation}
        \nPoorSignalLevel: ${metrics.poorSignalLevel}
        \nStatus: ${metrics.status}` );
        
        console.log(line, metrics);
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
    if (disposables) {
        disposables.forEach(item => item.dispose());
    }
    disposables = [];
}
