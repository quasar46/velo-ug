'use strict'
document.addEventListener('DOMContentLoaded', function () {
	const swiper = new Swiper('.swiper-popular', {
		slidesPerView: 4,
		spaceBetween: 10,
		breakpoints: {
			1920: {
				spaceBetween: 62,
			},
			1280: {
				slidesPerView: 4,
			},
			1000: {
				spaceBetween: 40,
				slidesPerView: 3,
			},
			768: {
				spaceBetween: 50,
			},
			0: {
				spaceBetween: 10,
				slidesPerView: 2,
			}

		}
	});

	const swiper2 = new Swiper('.swiper-recomendation', {
		slidesPerView: 2,
		spaceBetween: 30,
		breakpoints: {
			1920: {
				slidesPerView: 6,
			},
			1280: {
				slidesPerView: 4,
			},
			1000: {
				slidesPerView: 3,
			},
			768: {
				spaceBetween: 30,
			},
			0: {
				spaceBetween: 10,
				slidesPerView: 2,
			}

		}
	});

	const swiper3 = new Swiper('.swiper-other', {
		slidesPerView: 2,
		spaceBetween: 30,
		breakpoints: {
			1920: {
				slidesPerView: 6,
			},
			1280: {
				slidesPerView: 4,
			},
			1000: {
				slidesPerView: 3,
			},
			768: {
				spaceBetween: 30,
			},
			0: {
				spaceBetween: 10,
				slidesPerView: 2,
			}

		}
	});

	const swiper4 = new Swiper('.swiper-buy', {
		slidesPerView: 2,
		spaceBetween: 30,
		breakpoints: {
			1920: {
				slidesPerView: 6,
			},
			1280: {
				slidesPerView: 4,
			},
			1000: {
				slidesPerView: 3,
			},
			768: {
				spaceBetween: 30,
			},
			0: {
				spaceBetween: 10,
				slidesPerView: 2,
			}

		}
	});

	var galleryThumbs = new Swiper(".gallery-thumbs", {
		centeredSlides: true,
		centeredSlidesBounds: true,
		slidesPerView: 3,
		watchOverflow: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		direction: 'vertical',
		spaceBetween: 10,
	});

	var galleryMain = new Swiper(".gallery-main", {
		watchOverflow: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		preventInteractionOnTransition: true,
		pagination: {
			el: '.swiper-pagination',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		thumbs: {
			swiper: galleryThumbs
		}
	});

	const wrapSwiper = document.querySelectorAll('.swiper-goods')
	wrapSwiper.forEach((wrap, index) => {
		const counter = wrap.querySelector('.swiper-counter')
		const slidesCount = wrap.querySelectorAll('.swiper-slide')
		counter.querySelector('.counter__length').innerHTML = slidesCount.length
		const swiper5 = new Swiper('.swiper-goods', {
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			observer: true,
			observeParents: true,
			runCallbacksOnInit: true,
			on: {
				slideChange: function () {
					let offer = wrap.querySelector('.swiper-counter');
					offer.innerHTML = '<span class="counter__start">' + (this.activeIndex + 1) + '</span>' + ' ... ' + slidesCount.length;
				}
			}
		})
	})

	galleryMain.on('slideChangeTransitionStart', function () {
		galleryThumbs.slideTo(galleryMain.activeIndex);
	});

	galleryThumbs.on('transitionStart', function () {
		galleryMain.slideTo(galleryThumbs.activeIndex);
	});

	function getHeaderHeight() {
		const headerHeight = document.querySelector('.header').offsetHeight
		return headerHeight
	}

	getHeaderHeight()

	function bodyHidden() {
		document.querySelector('body').classList.toggle('hidden')
	}

	function setMargin() {
		const navMenu = document.querySelector('.nav-menu')
		navMenu.style.marginTop = `${getHeaderHeight()}px`
	}

	function openSubmenu() {
		const items = document.querySelectorAll('.nav-menu__item')
		items.forEach(item => {
			item.addEventListener('click', function () {
				if (item.querySelector('.submenu')) {
					item.querySelector('.submenu').classList.toggle('active')
				}
			})
		})
	}

	if (window.innerWidth < 1000) {
		openSubmenu()
	}

	function filterOpen() {
		const btns = document.querySelectorAll('.filter__block')
		btns.forEach(btn => {
			const filterContent = btn.querySelectorAll('.filter__content')
			filterContent.forEach(item => {
				item.addEventListener('click', (ev) => {
					ev.stopPropagation()
				})
			})
			// оставновил click на filter__content
			btn.addEventListener('click', function (ev) {
				ev.stopPropagation()
				if (btn.querySelector('.filter__content')) {
					btn.querySelector('.filter__content').classList.toggle('active')
					btn.querySelector('.filter__checks').classList.toggle('active')
				}
			})
		})
	}


	function openCheckFilter() {
		const btns = document.querySelectorAll('.filter__btn')
		btns.forEach(btn => {
			btn.addEventListener('click', () => {
				if (btn.nextElementSibling.classList.contains('filter__checks')) {
					btn.nextElementSibling.classList.toggle('active')
				}
			})
		})
	}

	if (document.querySelector('.filter')) {
		filterOpen()
		openCheckFilter()
		openSettings()
	}

	function openSettings() {
		const btn = document.querySelector('#openFilter')
		const filter = document.querySelector('.filter')
		btn.addEventListener('click', function (e) {
			e.preventDefault()
			const btnClose = document.querySelector('.burger')
			btnClose.classList.add('active')
			document.querySelector('body').classList.add('hidden')
			filter.classList.add('active')
			filter.style.top = `${getHeaderHeight()}px`
		})
	}

	function openMobileMenu() {
		const burger = document.querySelector('.burger')
		const menu = document.querySelector('.nav-menu')
		const actions = document.querySelector('.header__actions')
		const header = document.querySelector('header')
		const filter = document.querySelectorAll('.filter')
		burger.addEventListener('click', function () {
			const heightDocument = document.documentElement.clientHeight
			if (filter.length > 0 && filter[0].classList.contains('active')) {
				filter[0].classList.remove('active')
				this.classList.remove('active')
				document.querySelector('body').classList.remove('hidden')
			}
			else {
				this.classList.toggle('active')
				menu.classList.toggle('active')
				menu.style.height = `${heightDocument - getHeaderHeight() - 34}px`
				bodyHidden()
				actions.classList.toggle('active')
				header.classList.toggle('show-nav-menu')
			}
			setMargin()
		})
	}


	openMobileMenu()

	function selectFavorite() {
		const fav = document.querySelectorAll('.favorite')
		fav.forEach(fav => {
			fav.addEventListener('click', function () {
				this.classList.toggle('active')
			})
		})
	}

	selectFavorite()

	const showTab = (elTabBtn) => {
		const elTab = elTabBtn.closest('.tab');
		if (elTabBtn.classList.contains('tab-btn-active')) {
			return;
		}
		const targetId = elTabBtn.dataset.targetId;
		const elTabPane = elTab.querySelector(`.tab-pane[data-id="${targetId}"]`);
		if (elTabPane) {
			const elTabBtnActive = elTab.querySelector('.tab-btn-active');
			elTabBtnActive.classList.remove('tab-btn-active');
			const elTabPaneShow = elTab.querySelector('.tab-pane-show');
			elTabPaneShow.classList.remove('tab-pane-show');
			elTabBtn.classList.add('tab-btn-active');
			elTabPane.classList.add('tab-pane-show');
		}
	}

	document.addEventListener('click', (e) => {
		if (e.target && !e.target.closest('.tab-btn')) {
			return;
		}
		const counters = document.querySelectorAll('.swiper-counter')
		counters.forEach(counter => {
			console.log(counter)
			if (counter.querySelector('.counter__start')) {
				counter.querySelector('.counter__start').innerHTML = '1'
			}
		})
		const elTabBtn = e.target.closest('.tab-btn');
		showTab(elTabBtn);
	});


	function openModelCharacter() {
		const wrap = document.querySelector('.model-charact')
		wrap.addEventListener('click', function (e) {
			const items = document.querySelectorAll('.model-charact__content')
			const target = e.target
			console.log(target)
			items.forEach(item => {
				item.classList.remove('active')
				item.closest('.model-charact__item').querySelector('.model-charact__head').classList.remove('active')
			})
			if (target.classList.contains('model-charact__text')) {
				target.closest('.model-charact__item').querySelector('.model-charact__head').classList.toggle('active')
			}
			if (target.classList.contains('model-charact__text')) {
				target.closest('.model-charact__item').querySelector('.model-charact__head').classList.toggle('active')
			}
			target.closest('.model-charact__item').querySelector('.model-charact__head').classList.toggle('active')
		})
	}
	if (document.querySelector('.model-charact')) {
		openModelCharacter()
	}

	tippy(document.querySelectorAll('.tooltip'), {});

	function formValidate() {
		const form = document.querySelector('form')
		const fields = form.querySelectorAll('.form__input')

		form.addEventListener('submit', function (event) {
			event.preventDefault()
			const errors = form.querySelectorAll('.error')
			for (let i = 0; i < errors.length; i++) {
				errors[i].classList.remove('error')
			}
			const valids = form.querySelectorAll('.valid')
			for (let i = 0; i < valids.length; i++) {
				valids[i].classList.remove('valid')
			}

			for (let i = 0; i < fields.length; i++) {
				if (!fields[i].value) {
					if (fields[i].closest('.form__item')) {
						fields[i].closest('.form__item').classList.add('error')
					}
				} else {
					fields[i].closest('.form__item').classList.add('valid')
				}
			}
		})
	}



	if (document.querySelector('form')) {
		formValidate()
	}

	function removeOrders() {
		const closeOrder = document.querySelectorAll('.close-order')
		closeOrder.forEach(btn => {
			btn.addEventListener('click', function () {
				btn.closest('tr').remove()
			})
		})
	}

	if (document.querySelector('.table-history')) {
		removeOrders()
	}

	new AirDatepicker('#datepicker');

	function calcProducts() {
		let countValue = 0
		const count = document.querySelector('.counter-number')
		count.innerHTML = countValue
		document.querySelector('.counter-minus').addEventListener('click', function () {
			if (countValue < 1) {
				return
			}
			countValue = countValue - 1
			count.innerHTML = countValue

		})

		document.querySelector('.counter-plus').addEventListener('click', function () {
			countValue = countValue + 1
			count.innerHTML = countValue
		})
	}

	if (document.querySelector('.counter')) {
		calcProducts();
	}

	function openSearch() {
		const btn = document.querySelector('#search')
		const element = document.querySelector('.search')
		btn.addEventListener('click', function (e) {
			e.preventDefault()
			element.classList.add('active')
		})
	}

	openSearch()

	function showCodeAuth() {
		const form = document.querySelector('.authorization__form')
		form.addEventListener('submit', function () {
			console.log(form)
			form.querySelector('.form__code').removeAttribute('hidden')
			form.querySelector('.authorization__submit').value = "Войти"
		})
	}
	if (document.querySelectorAll('.authorization__form').length > 0) {
		showCodeAuth()
	}
	
	if (window.innerWidth < 768) {
		const priceFilter = document.querySelector('.filter__block-price')
		priceFilter.querySelector('.filter__content').classList.add('active')

		const categoryFilter = document.querySelector('.filter__block-category')
		categoryFilter.querySelector('.filter__content').classList.remove('active')
	}

})