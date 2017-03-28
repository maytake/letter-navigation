(function(){
	var listNavs = document.querySelectorAll('[data-indexlist]');
	for(var i = 0; i < listNavs.length; i++){
		ListIndex(listNavs[i]);
	}
	function ListIndex(indexNav){
		var listId = indexNav.dataset.indexlist;
		var list = document.querySelector(listId);
		var option = list.querySelectorAll("dt");  
		var navs = indexNav.children;
		indexNav.addEventListener('touchstart', function(e) {
			e.preventDefault();
		});
		for(var i = 0; i < option.length; i++){
			option[i].dataset.id = option[i].innerHTML;
		}
		for(var i = 0; i < navs.length; i++){
			if(navs[i].children.length < 1){
				navs[i].dataset.index = navs[i].innerHTML;
			}
		}
		indexNav.addEventListener('touchstart', function(e) {
			setScroll(e);
		});
		indexNav.addEventListener('touchmove', function(e) {
			setScroll(e);
		});
		indexNav.addEventListener('touchend', function(e) {
			for(var i = 1; i < navs.length; i++){
				navs[i].className = "";
 			}
		});
		function setScroll(e){
			var nav = getNavs(e);
			if(!nav){
				return;
			}
			for(var i = 1; i < navs.length; i++){
				navs[i].className = "";
 			}
 			nav.className = "focus";
 			var li = getLi(nav);
 			if(!li){
 				return;
 			}
 			var top = getPageTop(li);
 			window.scrollTo(0,top);
		}
		function getNavs(e){
			var pointTop = e.changedTouches[0].clientY;
			for(var i = 0; i < navs.length; i++){
				if(navs[i].dataset.index){
					var navsRect = navs[i].getBoundingClientRect();
					if(navsRect.top <= pointTop && (navsRect.top + navsRect.height) >= pointTop) {
						return navs[i];
					}
				}
			}
			return null;
		}
		function getLi(nav){
			var li = list.querySelector('[data-id='+nav.dataset.index+']');
			if(!li){
				var next = nav.nextElementSibling;
				if(next){
					li = getLi(next);
				}
			}
			return li;
		}
		function getPageTop(el){
			return el.getBoundingClientRect().top + window.scrollY;
		}
	}
})();