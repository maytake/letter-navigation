/*
	1.找到右侧所有的索引
	2.找到左侧所有的索引(dt)
	3.添加左右两侧的关联
	4.在右侧滑动或者点击，手指触碰某个索引，
	滚动条就滚动至左侧对应的dt所在的位置
*/

function Scr() {
	this.setting = {

	};
};
Scr.prototype.init = function(opt) {
	var This = this;
	this.createList();

	var listNav = document.querySelectorAll('[data-indexlist]');

	for (var i = 0; i < listNav.length; i++) {
		This.listIndex(listNav[i]);
	};
};
Scr.prototype.createList = function() {

	var createLists = document.querySelectorAll('[data-creatIndexList]');
	for (var i = 0; i < createLists.length; i++) {
		createIndexList(createLists[i]);
	}

	function createIndexList(el) {

		var list = document.createElement('dl');
		list.className = 'list';
		list.id = 'list';
		el.appendChild(list);


		var nav = document.createElement('nav');
		nav.id = 'nav';
		nav.innerHTML = ['<ul class="navList" data-indexList="#list">',
			'		<li>',
			'			<span class="ico"></span>',
			'		</li>',
			'		<li>A</li>',
			'		<li>B</li>',
			'		<li>C</li>',
			'		<li>D</li>',
			'		<li>E</li>',
			'		<li>F</li>',
			'		<li>G</li>',
			'		<li>H</li>',
			'		<li>I</li>',
			'		<li>J</li>',
			'		<li>K</li>',
			'		<li>L</li>',
			'		<li>M</li>',
			'		<li>N</li>',
			'		<li>O</li>',
			'		<li>P</li>',
			'		<li>Q</li>',
			'		<li>R</li>',
			'		<li>S</li>',
			'		<li>T</li>',
			'		<li>U</li>',
			'		<li>V</li>',
			'		<li>W</li>',
			'		<li>X</li>',
			'		<li>Y</li>',
			'		<li>Z</li>',
			'	</ul>'
		].join("");
		el.appendChild(nav);
		createList();
	}



	function createList() {
		var name = {};
		for (var i = 0; i < data.length; i++) {
			var firstLetter = pinyin.getCamelChars(data[i])[0];
			if (!(firstLetter in name)) {
				name[firstLetter] = [];
			}
			name[firstLetter].push(data[i]);
		}

		var keys = Object.keys(name);
		keys.sort();

		var miaovList = document.querySelector('#list');


		for (var i = 0; i < keys.length; i++) {
			var dt = document.createElement('dt');
			dt.innerHTML = keys[i];
			miaovList.appendChild(dt);

			name[keys[i]].sort(function(name1, name2) {
				return pinyin.getFullChars(name1) > pinyin.getFullChars(name2);
			})
			for (var j = 0; j < name[keys[i]].length; j++) {
				var dd = document.createElement('dd');
				dd.innerHTML = '<span class="avatar"><span class="img">' + name[keys[i]][j] + '</span></span>' + name[keys[i]][j];
				miaovList.appendChild(dd);

			}

		}

	}
}

Scr.prototype.listIndex = function(indexNav) {
	var This = this;
	var id = indexNav.dataset.indexlist;
	var list = document.querySelector(id);
	 this.navs = indexNav.children;
	var options = list.querySelectorAll('dt');
	for (var i = 0; i < options.length; i++) {
		options[i].dataset.id = options[i].innerHTML;
	}

	indexNav.addEventListener('touchend', function(e) {
		e.preventDefault();
	});
	indexNav.addEventListener('touchstart', function(e) {
		This.toScroll(e)
	});
	indexNav.addEventListener('touchmove', function(e) {
		This.toScroll(e)
	});
	indexNav.addEventListener('touchend', function(e) {
		for (var i = 0; i < This.navs.length; i++) {
			This.navs[i].className = ''
		}
	});
}

Scr.prototype.toScroll = function(e) {
	var index = this.getIndex(e);
	if (!index) return;

	for (var i = 0; i < this.navs.length; i++) {
		this.navs[i].className = ''
	}
	index.className = 'focus';

	var dt = this.getDt(index);
	//获取dt在整个页面上位置
	var scrollY = this.getPageY(dt);
	window.scrollTo(0, scrollY);
}
Scr.prototype.getIndex = function(e) {
	var y = e.changedTouches[0].clientY;
	for (var i = 0; i < this.navs.length; i++) {
		if(this.navs[i].children.length<1){
			var rect = this.navs[i].getBoundingClientRect();
			if (rect.top <= y && rect.bottom >= y) {
				return this.navs[i];
			}
		}


	}
	return null;
}
Scr.prototype.getDt = function(index) {
	var id = index.innerHTML;
	var dt = list.querySelector('[data-id=' + id + ']');
	if (!dt) {
		var next = index.nextElementSibling;
		if (next) {
			return this.getDt(next);
		} else {
			return null;
		}

	}
	return dt;
}
Scr.prototype.getPageY = function(el) {
	return el.getBoundingClientRect().top + window.scrollY;
}