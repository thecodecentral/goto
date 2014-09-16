module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    grunt.file.defaultEncoding = 'utf8';
    grunt.loadNpmTasks('grunt-template');

    var Util = require('util');
    var Type = require('type-of-is');
    var Fs = require('fs');

    var self = {
        generateMenu: function (gotoMenu) {
            var configFile = '';

            gotoMenu.forEach(function (task) {

                if (self._hasAsterisk(task.shortcut)) {
                    return;
                }
                configFile += Util.format('menu["%s"]="%s"\n', self._join(task.shortcut), task.description);
            });

            return configFile;
        },
        generateSortOrder: function (gotoMenu) {
            var sortOrder = [];

            gotoMenu.forEach(function (task) {
                if (self._hasAsterisk(task.shortcut)) {
                    return;
                }

                sortOrder.push(Util.format('"%s"', task.shortcut));
            });

            return Util.format('menuOrder=(%s)', sortOrder.join(' '));
        },
        generateCommand: function (gotoMenu) {
            var switchString = '';

            gotoMenu.forEach(function (task) {
                var command = self._join(task.command, '\n        ');
                var caseString =
                    Util.format('    %s)\n', task.shortcut) +
                        Util.format('        %s\n', command) +
                        Util.format('    ;;\n');

                switchString += caseString;
            });

            return switchString;
        },
        _hasAsterisk: function (testObject) {
            if (!testObject || !Type.is(testObject, 'String') || testObject.length === 0) {
                return false;
            }

            return testObject.indexOf('*') !== -1;
        },
        _join: function (object, delimeter) {
            if (Util.isArray(object)) {
                return object.join(delimeter);
            } else {
                return object;
            }
        }
    };

    grunt.registerTask('build', '', function (type) {
        var scriptBuildPath = './build/goto.sh';

        if (type && type.toLowerCase() == 'release') {
            scriptBuildPath = './sample/goto.sh';
        }

        grunt.log.writeln(scriptBuildPath);
        var configFilePath = './gotoConfig.js';

        if (!grunt.file.exists(configFilePath)) {
            configFilePath = './src/gotoConfig.js';
        }

        var gotoMenu = (require(configFilePath)).gotoMenu;

        var scriptTemplate = grunt.file.read('./src/goto.tpl.sh');

        var script = grunt.template.process(scriptTemplate, {
            data: {
                menu: self.generateMenu(gotoMenu),
                menuOrder: self.generateSortOrder(gotoMenu),
                commandCases: self.generateCommand(gotoMenu)
            }
        });

        grunt.file.write(scriptBuildPath, script);
        Fs.chmod(scriptBuildPath, '0755');
    });

    grunt.registerTask('default', 'build');
}
;