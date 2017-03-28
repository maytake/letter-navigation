window.onload=function(){
	var Dax = new Da();
	Dax.init({
		name : 'cooli',
		ago : '12',
		boy : '#222'
	})
}



	
	function Da(){
		this.options = {
			name : 'cooli',
			ago : '12',
			bg : '#222'
		}
		

	}
	Da.prototype.init = function(ops){
		extend(this.options, ops);
		this.cleate();
	}
	Da.prototype.cleate = function(){
		console.log(this.options.boy)
	}

	function extend(a, b){
		for(var attr in b){
			a[attr] = b[attr];
		}
	}



(function() {

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
		var arr2 = [4, 6, 4, 2, 7, 9, 0, 1];
		arr2.sort(function(a, b) {
			return a - b
		});

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

})()



;
(function() {
	var listNav = document.querySelectorAll('[data-indexlist]');
	for (var i = 0; i < listNav.length; i++) {
		ListIndex(listNav[i]);
	};

	function ListIndex(indexNav) {
		var id = indexNav.dataset.indexlist;
		var list = document.querySelector(id);
		var navs = indexNav.children;
		var options = list.querySelectorAll('dt');
		for (var i = 0; i < options.length; i++) {
			options[i].dataset.id = options[i].innerHTML;
		}

		indexNav.addEventListener('touchend', function(e) {
			e.preventDefault();
		});
		indexNav.addEventListener('touchstart', function(e) {
			toScroll(e)
		});
		indexNav.addEventListener('touchmove', function(e) {
			toScroll(e)
		});
		indexNav.addEventListener('touchend', function(e) {
			for (var i = 0; i < navs.length; i++) {
				navs[i].className = ''
			}
		});
		for (var i = 0; i < navs.length; i++) {
			navs[i].addEventListener('touchend', function(e) {
				var option = list.querySelector('[data-id=' + this.innerHTML + ']')
			});

		}

		function toScroll(e) {
			var index = getIndex(e);
			if (!index) return;

			for (var i = 0; i < navs.length; i++) {
				navs[i].className = ''
			}
			index.className = 'focus';

			var dt = getDt(index);
			//获取dt在整个页面上位置
			var scrollY = getPageY(dt);
			window.scrollTo(0, scrollY);

		}

		function getIndex(e) {
			var y = e.changedTouches[0].clientY;
			for (var i = 0; i < navs.length; i++) {
				var rect = navs[i].getBoundingClientRect();
				if (rect.top <= y && rect.bottom >= y) {
					return navs[i];
				}
			}
			return null;
		}

		function getDt(index) {
			var id = index.innerHTML;
			var dt = list.querySelector('[data-id=' + id + ']');
			if (!dt) {
				var next = index.nextElementSibling;
				if (next) {
					return getDt(next);
				} else {
					return null;
				}

			}
			return dt;
		}

		function getPageY(el) {
			return el.getBoundingClientRect().top + window.scrollY;
		}

	}

})();