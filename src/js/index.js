'use strict';

var informal = require('informal'),
	manifest = require('./manifest'),
	data = require('./data');

informal.registerField('taglist', require('./fields/taglist'));

var form = new informal.Form(manifest, data),
	button = document.createElement('button');

button.innerHTML = 'Save';
button.addEventListener('click', function(e){
	var values = form.getValues();
	console.log(values);
});

document.body.appendChild(form.wrap);
document.body.appendChild(button);
