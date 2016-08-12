var fs = require('fs');
var path = require('path');

function createFolders(mainName, type) {
    var simpleFolders = [
        mainName,
        mainName + "/controllers",
        mainName + "/controllers/home",
        mainName + "/public",
        mainName + "/public/js",
        mainName + "/public/css",
        mainName + "/views",
        mainName + "/views/home"
    ];

    var complexFolders = [
        mainName + "/commons",
        mainName + "/middlewares",
        mainName + "/tests",
    ]

    simpleFolders.forEach(function(folder) {
        fs.mkdirSync(folder);
    });

    if (type == 'complex') {
        complexFolders.forEach(function(folder) {
            fs.mkdirSync(folder);
        });
    };
};

function createFiles(mainName) {
    /* Read files from bin */

    var filesPath = [
        '/app.js',
        '/controllers/home.js',
        '/controllers/home/index.js',
        '/views/home/index.ejs',
        '/views/error.ejs',
    ];

    filesPath.forEach(function(file) {
        var fileString = fs.readFileSync(__dirname + '/bin' + file, "utf-8");
        fs.writeFileSync(mainName + file, fileString, {flag:'w'});
    })
}

function createPackage(mainName) {
    var packageJson = fs.readFileSync(__dirname + '/bin/package.json', "utf-8");
    var packageJson = packageJson.replace(/{{mainName}}/, mainName);

    fs.writeFileSync(mainName + '/package.json', packageJson, {flag:'w'});
}

function init() {
    var _mainName = process.argv[2];
    var _type = process.argv[3];

    if (!_type || _type != 'complex' & _type != 'simple') {
        console.log("Invalid type, you should use 'simple' or 'complex'");
        process.exit();
    };

    if (_mainName){
        Promise.resolve(createFolders(_mainName, _type))
            .then(function() {
                createFiles(_mainName);
                createPackage(_mainName);
                console.log('Project created in ', __dirname + '/' + _mainName);
            })
    } else {
        console.log('You have to choice a name to your new project');
        process.exit()
    };
};

init();
