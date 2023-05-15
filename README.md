# ts-projector

CLI for setting variables per directory - so you can set `env` for current directory to `dev` and to directory next to it to `prod`.
And when you go between them you will just call `$(ts-projector env)` instead of thinking or forgetting if this should be `dev` or `prod`.


*Made along with ThePrimeagen while watching polyglot programmer on Fronend Masters.*

## Building

To install run:

```sh
pnpm install
```

To test run:

```sh
pnpm test
```

To get a binary you need to have `pkg` installed and run it in root directory:

```
pkg .
```

Then, as an ouput you will get:
 - `ts-linux`
 - `ts-win.exe`
 - `ts-macos`

You may copy them to your desired bin directory with any name you wish - for rest of `README` I will refer to it as `ts-projector`

## Use

To show all variables just run:

```sh
ts-projector
```

To set a variable run:

```sh
ts-projector add foo baz
```

To remove a variable run:

```sh
ts-projector rm foo
```

To show all variables recursively go with it:

```sh
ts-projector
```

Then you will get all variables from your directory, then will get all variables from directory above and until you reach you `$HOME` directory.
