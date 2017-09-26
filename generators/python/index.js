'use strict';
var path = require('path');
var slugify = require('slugify');
var mkdirp = require('mkdirp');
var dateFormat = require('dateformat');

var Generator = require('yeoman-generator');

module.exports = Generator.extend({
  constructor: function () {
    Generator.apply(this, arguments);

    this.argument('function-name', {
      desc: 'Name of the function to generate',
      type: String,
      required: true
    });

    this.option('skip-install-message', {
      desc: 'Skips the message after the installation of dependencies',
      type: Boolean
    });

    this.option('skip-install', {
      desc: 'Skips installing dependencies',
      type: Boolean
    });
  },

  initializing: function () {
    this.pkg = require('../../package.json');
    this.composeWith(require.resolve('../app'));
  },

  prompting: {
    meta: function() {
      var done = this.async();
      this.prompt([{
        type    : 'input',
        name    : 'description',
        message : 'Function Description:',
        default : this.options['function-name']      // Default to current folder name
      }]).then(function(answers, err) {
        this.meta = {};
        this.meta.functionName = this.options['function-name'];
        this.meta.description = answers.description;
        done(err);
      }.bind(this));
    }
  },


  configuring: function() {
    // Copy all the normal files.
    this.fs.copy(
      this.templatePath("**/*"),
      this.destinationRoot()
    );
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('functions/lambda_tmpl/**'),
      this.destinationPath(path.join('functions', this.options['function-name'])),
      { meta: this.meta }
    );

    this.fs.delete(
      this.destinationPath(path.join('functions','lambda_tmpl'))
    );
  },
  install: function () {
    var currSubFolder = 'functions/' + this.options['function-name'];
    var currRequirements = currSubFolder + '/requirements.txt';
    this.spawnCommand('cd',[currSubFolder])
    this.spawnCommand('pip3', ['install', '-r', currRequirements, '-t', currSubFolder])
  },

  end: function() {
    this.log("Success! You may edit your new function in the 'functions/' folder\n")
  }
});
