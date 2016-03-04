"use strict";
var page = require('webpage').create(),
  system = require('system'),
  fs = require('fs'),
  width = system.args[ 1 ],
  height = system.args[ 2 ],
  viewportWidth = system.args[ 3 ],
  viewportHeight = system.args[ 4 ],
  marginTop = system.args[ 5 ],
  marginRight = system.args[ 6 ],
  marginBottom = system.args[ 7 ],
  marginLeft = system.args[ 8 ],
  headerHeight = system.args[ 9 ],
  footerHeight = system.args[ 10 ],
  sourcePath = system.args[ 11 ],
  targetPath = system.args[ 12 ],
  log = system.stdout.writeLine,
  err = system.stderr.writeLine;

page.viewportSize = { width: viewportWidth, height: viewportHeight };

var paperSize = {
  width: width,
  height: height,
  margin: {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  }

  //header: {
  //  height: headerHeight
  //},
  //
  //footer: {
  //  height: footerHeight
  //}
};

page.paperSize = paperSize;

try {
  log('reading source file: ' + sourcePath);
  page.content = fs.read(sourcePath);
} catch (error) {
  err('failed to read source file: ' + error);
  phantom.exit(1);
}

try {
  log('setting zoom on html to 0.75');
  page.evaluate(function () {
    document.body.style.zoom = 0.75;
  });
} catch (error) {
  err('failed to set zoom on html file: ' + error);
  phantom.exit(2);
}

try {
  log('rendering to target path: ' + targetPath);
  page.render(targetPath);
} catch (error) {
  err('failed to render pdf: ' + error);
  phantom.exit(3);
}

phantom.exit(0);