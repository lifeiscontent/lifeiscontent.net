---
title: Developing Web Apps in Fedora Silverblue
date: 2021-01-28
tags:
  - Linux
  - Fedora Silverblue
  - Node.js
---

### Setting up Node.js

First we'll create a toolbox called `node`.

Toolboxes are a feature in fedora silverblue to run software in isolation, you can setup an entire dev environment in a toolbox and not have any of the software be a part of your main OS.

```sh
toolbox create -c node
```

Next, we'll install a Node Version Mananger.

I like [n](https://github.com/tj/n) because it keeps things simple, no subshells, profile setup, or convoluted APIs.

```sh
curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n
bash n lts
rm n
```

We've just installed the LTS version of Node.js using n, but before we're finished, we'll need to add `node` to our path.

open up your `.bashrc` and add this line.

```sh
# if $HOME/.n/bin is not in our path, set it
if ! [[ "$PATH" =~ "$HOME/.n/bin" ]]; then
    PATH="$PATH:$HOME/.n/bin"
fi
```

if you type `node -v` now you should see a version number print out.

we'll install `n` as a npm package now, so we can update it periodically from npm.

```sh
npm install -g n
```

For Node.js to do file watching we need to bump up `fs.inotify.max_user_watches`. Without it, we might see errors like

```
Error: ENOSPC: System limit for number of file watchers reached
```

```sh
sudo sysctl fs.inotify.max_user_watches=524288
sudo sysctl -p --system
```

### VSCode Related settings

To fix the terminal in VSCode I had to set these settings.

First, in my `.bashrc`:

```sh
# if we're inside of VSCode flatpak, fix the terminal
if [ "$FLATPAK_ID" == "com.visualstudio.code" ]; then
	export PS1="[\u@\h \W]\\$ "
fi

# a helper function to launch VSCode from a toolbox or main OS.
code() {
  if [[ ! -f /run/.toolboxenv ]]; then
    flatpak run com.visualstudio.code $@
  elif [[ -f /run/.toolboxenv ]]; then
    flatpak-spawn --host flatpak run com.visualstudio.code $@
  else
    echo "unknown environment"
  fi
}
```

now you can type `code /path/to/your/project` if you're inside of a toolbox or your main OS.

in VSCode, we have to set these settings to get the terminal to work through our toolbox.

```json
{
  "terminal.integrated.shell.linux": "flatpak-spawn",
  "terminal.integrated.shellArgs.linux": ["--host", "toolbox", "enter", "node"]
}
```
