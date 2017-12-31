"use strict";
var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require('del');
var tsProject = ts.createProject("tsconfig.json");

// task to clean all files in lib (which is out folder for containing all javascripts)
gulp.task("clean:lib", function() {
    return del(['lib/**/*']);
});

// task to build(transpile) all typescripts into javascripts in lib folder
gulp.task("tsc", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("lib"));
});

// adding default tasks as clean and build
gulp.task('default', ['clean:lib','tsc'], function () {
});