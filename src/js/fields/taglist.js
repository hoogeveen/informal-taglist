'use strict';

var Base = require('informal').fields.base;

var TagList = function(spec, values){
	if (!(this instanceof TagList)) return new TagList(spec, values);

	this.values = [];
	this.itemIndex = 0;
	Base.call(this, spec, values);
}

require('inherits')(TagList, Base);

TagList.prototype.build = function(){
	Base.prototype.build.call(this);

	this.wrap = document.createElement('div');
	this.wrap.classList.add('informal--field');
	this.wrap.classList.add('informal--taglist');
	this.wrap.innerHTML = '<ul class="taglist--tags"></ul>'
		+ '<input type="text" placeholder="Add tag">';
	this.input = this.wrap.querySelector('input');
	this.taglist = this.wrap.querySelector('.taglist--tags');

	var addButton = this.wrap.querySelector('.btn-add'),
		self = this, i;

	this.input.addEventListener('keyup', function(e){
		e.preventDefault();
		if (e.keyCode == 13){
			if (!self.input.value) return;
			self.addValue(self.input.value);
		} else if (e.keyCode == 8){
			if (self.input.value) return;
			self.values.pop();
			console.log(self.taglist.children[0]);
			self.taglist.removeChild(self.taglist.childNodes[self.taglist.children.length - 1]);
		}
	});

	for (i = 0; i < this.value.length; i++){
		this.addValue(this.value[i]);
	}

};

TagList.prototype.addValue = function(value){
	if (this.isUnique(value)) return;
	var li = document.createElement('li');

	li.innerHTML = '<span>&times;</span>' + value;
	li.dataset.tag = value;
	li.dataset.itemIndex = this.itemIndex++;

	var span = li.querySelector('span'),
		self = this;
	span.addEventListener('click', function(e){
		var index = self.values.indexOf(li.dataset.tag);
		self.values.splice(index, 1);
		self.taglist.removeChild(li);
	});

	this.values.push(value);
	this.taglist.appendChild(li);
	this.input.value = '';
};

TagList.prototype.isUnique = function(value){
	console.log(this.values.indexOf(value));
	if (this.values.indexOf(value) == -1){
		return false;
	}
	return true
	;
}

TagList.prototype.getValue = function(){
	return this.values;
}

module.exports = TagList;
