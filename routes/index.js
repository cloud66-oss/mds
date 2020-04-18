var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

var baseDir = process.env.BASE_DIR || "/etc/podinfo"

var getInfo = function (file) {
    console.log("Reading from " + baseDir);
    var keys = [];
    var fullPath = path.join(baseDir, file);
    var contents = fs.readFileSync(fullPath, 'utf8');
    var lines = contents.split("\n")
    for (idx in lines) {
        line = lines[idx];
        parts = line.split("=")
        key = parts[0]
        if (key == "") {
            continue
        }
        value = String(parts[1])
        keys.push({
            name: key,
            value: value.replace (/(^")|("$)/g, '')
        });
    }
    return keys;
}

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Cloud 66 Metadata Service',
        labels: getInfo("labels"),
        annotations: getInfo("annotations")
    });
});

module.exports = router;
