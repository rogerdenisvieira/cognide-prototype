# CognIDE
Biometric data integrator extension and server developed for Visual Studio Code


## Building 

To work properly, both projects must be compiled before they are run. Note that the root folder has two subfolders: `extension` and `server`, each of which represents a project and must be compiled individually. To do this, you need to be positioned **inside** the folder of the project you want to compile and run the following command:

```bash
npm build
```

Once compiled, each project will produce its artifacts in each of its directory.

## Running CognIDE Server

There are two distinc ways to run the CognIDE Server: in debug context and production-like context. For both, the current working directory must be in the `server` folder.

### Running in debug mode

In this approach , there is no needing to transpile the code before run it. In pratice, the command is just an alias for **nodemon** calling **node** and **ts-node** for every TypeScript changes. This approach has two variances:

```bash
npm run dev:start
```

and 

```bash
npm run dev:debug
```

The first command, just starts the application and restarts it once changes were detected in TypeScript files. So the second command is used in order to attach the debugger. By default, the debugging port is **9229**.

### Running in production-like mode

In other hand, the running second approach uses the standard **node** as runtime, demanding it to be transpilated before, using the **tsc** tool:

```bash
npm run build
```

After that, it is possible to finally run the application:

```bash
npm run start
```


## Running CognIDE Extension

The CognIDE Extensions works under the *extension.ts* file. Open it and type `F5` to open a new **Extension Development Host** instance.

Next, you have to enable the extension using Command Pallete (`Ctrl+Shift+P`), so type the following command:

```javascript
cognide.enableCodeLens
```