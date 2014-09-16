exports.gotoMenu = [
    {
        shortcut: 1,
        description: 'Home',
        command: 'cd $HOME'
    },
    {
        shortcut: 2,
        description: 'Downloads',
        command: 'cd $HOME/Downloads'
    },
    {
        shortcut: 3,
        description: 'Documents',
        command: 'cd $HOME/Documents'
    },
    {
        shortcut: 4,
        description: 'Music',
        command: 'cd $HOME/Music'
    },
    {
        shortcut: 5,
        description: 'Pictures',
        command: 'cd $HOME/Pictures'
    },
    {
        shortcut: 't',
        description: 'Open current dir in file manager',
        command: 'nautilus . &' //or 'thunar .' if you prefer
    },
    {
        shortcut: 'q|0',
        description: 'Quit',
        command: 'break;'
    },
    {
        //handle unknown options
        shortcut: '*',
        description: 'Unknown option',
        command: [
            'echo "Unknown option"',
            'run'
        ]
    }
];