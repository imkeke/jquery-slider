/*!
 * jQuery Slider Plugin v0.0.1
 * https://github.com/imkeke/jquery-slider
 *
 * Copyright 2014 keke
 * Released under the MIT license
 */

;(function($) {
    $.fn.slider = function(opt) {
        
        var st = {
            px: '668' || opt.px,
            ll: '4' || opt.ll
        }
        
        function Slider(el, px, ll) {
            this.el = el
            this.px = px
            this.ll = ll
        }

        Slider.prototype = {
            init: function() {
                var _this = this
                  , $lf = _this.el.find('.lf').find('a')
                  , $rt = _this.el.find('.rt').find('a')
                  , s = _this.el.find('.ct').find('li').size()
                  , total = Math.floor(s/_this.ll) === s/this.ll ? s/this.ll : Math.floor(s/this.ll) + 1

                _this.i = 1

                if (total <= 1) return _this.disabled() // 屏数只有一个

                _this.el.find('.lf').find('a').addClass('disabled')

                this.el.on('click', '.arrow', function() {
                    if ($(this).hasClass('disabled')) return

                    if ($(this).parent().hasClass('lf')) {
                        $rt.removeClass('disabled')

                        _this.go('+=' + _this.px)

                        _this.i--

                        if (_this.i === 1) {
                            $(this).addClass('disabled')
                        }
                    } else {
                        $lf.removeClass('disabled')

                        _this.go('-=' + _this.px)

                        _this.i++

                        if (_this.i === total) {
                            $(this).addClass('disabled')
                        }
                    }
                })
            },
            disabled: function() {
                this.el.find('.arrow').addClass('disabled')
                return false
            },
            go: function(px) {
                this.el.find('ul').animate({
                    marginLeft: px
                })
            }
        }

        return this.each(function() {
            var e = $(this)
            new Slider(e, st.px, st.ll).init()
        })
    }
})(jQuery)
