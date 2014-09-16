Goto
====

A super fast terminal based directory switcher, allows user to change working directory quickly.
Currently only Bash is supported.

## Quick Start

1. Save `sample/goto.sh` to your local drive.
2. Make it executable, `chmod 0755 goto.sh`.
3. Add an entry to your .bashrc: `alias [key to bind]='. [path_to_goto.sh]'`
   For example, if you want to bind the menu to letter 'g', you would need
   to add the following entry to `~/.bashrc`:
  * `alias g='. $HOME/bin/goto.sh'` (Notice the **dot**)
4. Restart or re-login. If you are lazy, you can do `source ~/.bashrc`.
5. In the terminal window, type the key which was binded to the script, and then press Enter.
5. Enjoy.


## Build Instruction

Since this is a standard Bash script, you may edit it anyway you wish.
However, if you need to modify the menu, the recommended way is to build it yourself using grunt.

To do that, Clone the Git repository or download the source files directly, and then do the following:

1. `npm install --save-dev`
2. Copy `src/gotoConfig.js` to the root directly `/`.
3. Modify the menu template as desired.
4. Run `grunt`.

### Release

There's a release task which update the script in the `/sample` folder.

`grunt build:release`


