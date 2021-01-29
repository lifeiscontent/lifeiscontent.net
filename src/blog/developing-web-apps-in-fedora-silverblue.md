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

We've just installed the LTS version of Node.js using n, but before we're finished, we'll need to add `node` to our path and have n install newer node versions locally.

open up your `.bashrc` and add this line.

```sh
# if $HOME/.n/bin is not in our path, set it
if ! [[ "$PATH" =~ "$HOME/.n/bin" ]]; then
    PATH="$PATH:$HOME/.n/bin"
fi

# if N_PREFIX is not defined, set it
if [[ ! -v N_PREFIX ]]; then
  N_PREFIX="$HOME/.n"

  export N_PREFIX
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

### VSCode Related setup

first, create a new file called `vscode-podman` and paste the contents below.

```sh
#!/usr/bin/env sh
exec flatpak-spawn --host podman "$@"
```

move it to `~/.local/bin`

Next, Go to VSCode settings, to the Remote-Containers section, and update the remote.containers.dockerPath with the absolute path to our script.

> **IMPORTANT** It must be the absolute path, e.g. `/var/home/<user>/.local/bin/vscode-podman`

The next steps will setup VSCode Container settings.

You can either run the script below to setup a toolbox called "node" if your container is named something else, go ahead and put it where "node" is in this command.

```sh
wget -O - -o /dev/null "https://gist.githubusercontent.com/lifeiscontent/6a3d156b070cfdc505616fb49090b089/raw/9aecd3475996de0a603430441074a7c5d2af6b8e/vscode-toolbox-setup.sh" | bash -s node
```

if you're uncomfortable with running scripts from the internet, that's fine, and I'll now explain everything that happens here.

```bash
#!/usr/bin/env bash

# we check to see that "node" was sent in to the script
# otherwise we print a helpful message to tell you how to use it
if [ -n "$1" ]; then
  # we create a toolbox, if its already created this is a no-op

  toolbox create "$1" >/dev/null 2>&1
  # we then add a JSON file to let the flatpak version of VSCode
  # know about the toolbox we've created.
  wget -O - -o /dev/null "https://gist.githubusercontent.com/lifeiscontent/f977025b47763ff74393350ea97039ea/raw/b1b68577aea85846c021957de33e19606612dd1a/nameConfig.json >> ~/.var/app/com.visualstudio.code/config/Code/User/globalStorage/ms-vscode-remote.remote-containers/nameConfigs/$1.json"

  # in order to allow VSCode to install runtime dependencies we need to
  # change permissions to the toolbox folders
  toolbox run -c "$1" sudo chmod 755 /root && sudo mkdir -p -m0777 /root/.vscode-server >/dev/null 2>&1

  # we're done!
  echo "All done, now run Remote-Containers: Attach to Running Container... from VSCode"
else
  echo "Usage: $0 [TOOLBOX_NAME]"
fi
```