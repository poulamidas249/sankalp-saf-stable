document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll('#navbar .scrollto');

  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {

      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY;
      if (navbarlink.hash != '#header') position += 200;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  /**
   * Function to scroll to an element with top ofset
   */
  function scrollto(el) {
    const selectHeader = document.querySelector('#header');
    let offset = 0;

    if (selectHeader.classList.contains('sticked')) {
      offset = document.querySelector('#header.sticked').offsetHeight;
    } else if (selectHeader.hasAttribute('data-scrollto-offset')) {
      offset = selectHeader.offsetHeight - parseInt(selectHeader.getAttribute('data-scrollto-offset'));
    }
    window.scrollTo({
      top: document.querySelector(el).offsetTop - offset,
      behavior: 'smooth'
    });
  }

  /**
   * Fires the scrollto function on click to links .scrollto
   */
  let selectScrollto = document.querySelectorAll('.scrollto');
  selectScrollto.forEach(el => el.addEventListener('click', function(event) {
    if (document.querySelector(this.hash)) {
      event.preventDefault();

      let mobileNavActive = document.querySelector('.mobile-nav-active');
      if (mobileNavActive) {
        mobileNavActive.classList.remove('mobile-nav-active');

        let navbarToggle = document.querySelector('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollto(this.hash);
    }
  }));

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Mobile nav toggle
   */
  const mobileNavToogle = document.querySelector('.mobile-nav-toggle');
  if (mobileNavToogle) {
    mobileNavToogle.addEventListener('click', function(event) {
      event.preventDefault();

      document.querySelector('body').classList.toggle('mobile-nav-active');

      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  }

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Auto generate the hero carousel indicators
   */
  let heroCarouselIndicators = document.querySelector('#hero .carousel-indicators');
  if (heroCarouselIndicators) {
    let heroCarouselItems = document.querySelectorAll('#hero .carousel-item')

    heroCarouselItems.forEach((item, index) => {
      if (index === 0) {
        heroCarouselIndicators.innerHTML += `<li data-bs-target="#hero" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        heroCarouselIndicators.innerHTML += `<li data-bs-target="#hero" data-bs-slide-to="${index}"></li>`;
      }
    });
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Testimonials Slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials Slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});

$(function(){
 
    $('#marquee-vertical').marquee();
     
  });
 
  document.addEventListener("DOMContentLoaded", function(){

                document.querySelectorAll('.sidebar .nav-link').forEach(function(element){

                        element.addEventListener('click', function (e) {

                                let nextEl = element.nextElementSibling;
                                let parentEl  = element.parentElement;        

                                if(nextEl) {
                                        e.preventDefault();        
                                        let mycollapse = new bootstrap.Collapse(nextEl);

                                          if(nextEl.classList.contains('show')){
                                                  mycollapse.hide();
                                          } else {
                                                  mycollapse.show();
                                                  // find other submenus with class=show
                                                  var opened_submenu = parentEl.parentElement.querySelector('.submenu.show');
                                                  // if it exists, then close all of them
                                                if(opened_submenu){
                                                        new bootstrap.Collapse(opened_submenu);
                                                }

                                          }
                                  }

                        });
                })

        });
       

// Init AOS
function aos_init() {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out-back",
    once: true
  });
}
 
 
//  marque start
 
  ;(function($, window, document, undefined){

    // Create the defaults once
    var pluginName = "marquee",

    defaults = {
       enable : true,  //plug-in is enabled
       direction: 'vertical',
       itemSelecter : 'li',
       delay: 3000,  
       speed: 1,  
       timing: 1,
       mouse: true

    };
       

    function Widget(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.version = 'v1.0.0';

       
        this.$element = $(this.element);
        this.$wrapper = this.$element.parent();
        this.$items = this.$element.children(this.settings.itemSelecter);


        this.next = 0;
        this.timeoutHandle;
        this.intervalHandle

        if(!this.settings.enable)return;
        this.init();
    }


    Widget.prototype = {

       init:function(){

            var that = this;

           
            var totalSize = 0;

            $.each(this.$items, function(index, element){

                totalSize += that.isHorizontal()
                            ? parseInt($(element).outerWidth())
                            : parseInt($(element).outerHeight());

            });
           
           
            var elmentTotalSize = this.isHorizontal()
               ? this.$element.outerWidth
               : this.$element.outerHeight;

           
            if(totalSize < elmentTotalSize)return;

           
            this.$wrapper.css({
                 
                position : 'relative',
                overflow : 'hidden'

            });

            this.$element.css({

                 position : 'absolute',
                 top : 0,
                 left: 0

            });

            this.$element.css(this.isHorizontal() ? 'width' : 'height', '1000%');


           
            this.cloneAllItems();

           
            if(this.settings.mouse)
                     this.addHoverEvent(this);

            this.timer(this);

           
       },

       /**
         
         */
        timer : function(that){

            this.timeoutHandle = setTimeout(function(){that.play(that)}, this.settings.delay);

        },


        /**
         
         */
        play : function(that){


           this.clearTimeout();

            var target = 0;

            for(var i = 0; i <= this.next; i++){
                 
                 target -= this.isHorizontal()
                    ? parseInt($(this.$items.get(this.next)).outerWidth())
                    : parseInt($(this.$items.get(this.next)).outerHeight());
                   

            }

            this.intervalHandle = setInterval(function(){that.animate(target)},this.settings.timing);
        },


        /**
         
         */
        animate : function(target){

            var mark = this.isHorizontal() ? 'left' : 'top';

            var present =  parseInt(this.$element.css(mark));

 
            if(present > target)
            {
                if(present - this.settings.speed <= target)
                {
                     this.$element.css(mark, target);
               
                }else

                     this.$element.css(mark, present - this.settings.speed);

            }else{


                this.clearInterval();

                if(this.next + 1 < this.$items.length){
                     
                     this.next++;
                   
                }else{

                    this.next = 0;
                    this.$element.css(mark,0);
                   
                }
                this.timer(this);
            }

        },


        isHorizontal : function(){

            return this.settings.direction == 'horizontal';
        },

        /**
         
         */
        cloneAllItems: function(){

            this.$element.append(this.$items.clone());
        },



        /**
         
         */
        clearTimeout : function(){
           
            clearTimeout(this.timeoutHandle);
        },

        /**
       
         */
        clearInterval : function(){
           
            clearInterval(this.intervalHandle);
        },
       
        /**
         
         * @return {[type]} [description]
         */
        addHoverEvent : function(that){

            this.$wrapper
              .mouseenter(function(){
                   
                   that.clearInterval()
                   that.clearTimeout();

              })
              .mouseleave(function(){

                   that.play(that);

              });
        }



    }//prototype
   

    $.fn[pluginName] = function(options) {

        // chain jQuery functions
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Widget(this, options));
            }
        });

    };

})(jQuery, window, document);

// Marquee End