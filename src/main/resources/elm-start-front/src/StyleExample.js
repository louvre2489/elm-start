'use strict';

const {Elm} = require('./elm/Example/StyleExample.elm');
const mountNode = document.getElementById('elm');
const app = Elm.Example.StyleExample.init({node: mountNode});

