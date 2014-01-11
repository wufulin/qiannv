
(function () {
	$(function () {
		$('#area-select').jqDropDown({
			afterToggle: function () {
				var _this = $(this);
				_this.parents('.ddContainer').css('zIndex', '100000000');
				_this.next().width('auto')
			},
			optionChanged: function () {
				$('#query-all').submit();
				/*var _this = $(this);
				$.ajax({
					'url': this.form.action,
					'data': '',
					'dataType': 'json',
					'type': 'GET',
					'success': function (data) {
						// 根据所选大区，更新页面
					}
				});
				*/
			}
		});

		$('#group-select, #server-select').jqDropDown({
			afterToggle: function () {
				var _this = $(this);
				_this.next().width('auto')
			},
			optionChanged: function () {
				$(this.form).submit();
			}
		});

		$(".nano").nanoScroller({alwaysVisible: true});

		$('.goto').submit(function (e) {
			e.preventDefault();
			$.post('', {
				page: $('.goto .page').val()
			}, function () {

			});
		});

		$('.vote-btn').click(function () {
			var external = window.external;
			external.ICC_VOTE(1);
		});
	})
})();

function vote_callback(result) {
	if (result == 0) {
		alert('投票失败');
	} else if (result == 1) {
		alert('投票成功');
	}
}

function Placeholder(input, text) {
	if (!(this instanceof Placeholder)) {
		return new Placeholder(input, text);
	}

	input = $(input);

	if (!input.length) {
		return;
	}

	var ph = $('<span class="placeholder">' + text + '</span>');
	input.after(ph);
	if (!/^\s*$/.test(input.val())) {
		ph.hide();
	}
	ph.click(function () {
		input.focus();
	});
	// focus再hide掉placeholder，可防止某些情况下没有click而直接focus了input
	// 例如：tab键focus
	input.focus(function () {
		ph.hide();
	});
	input.blur(function () {
		if (!input.val()) {
			ph.show();
		}
	});

	setStyle();

	/**
	 * 修改提示文案
	 */
	this.value = function (value) {
		if (!value) {
			return ph.text();
		}
		ph.text(value);
	};

	/**
	 * 由于容器`display:none`时无法正确定位，因此提供此方法
	 * 在`display != 'none'`时调用可重置位置
	 */
	this.reset = function () {
		setStyle();
	};

	this.css = function (styles) {
		ph.css(styles);
	};

	function setStyle() {
		var pos = input.position();

		$.each('paddingTop paddingRight paddingBottom paddingLeft'.split(' '), function (index, item) {
			ph.css(item, input.css(item));
		});

		ph.css({
			position: 'absolute',
			top: pos.top + getCssNum('borderTopWidth') + getCssNum('marginTop') + 'px',
			left: pos.left + getCssNum('borderLeftWidth') + getCssNum('marginLeft') + 'px',
			//width: '100px', //input.width(),
			//fontSize: input.css('fontSize'),
			fontSize: '14px',
			fontFamily: input.css('fontFamily'),
			height: input.css('height'),
			lineHeight: input.css('lineHeight'),
			color: '#AAA',
			cursor: 'text'
		});
	}

	function getCssNum(attr) {
		var num = input.css(attr).match(/^\d+/);
		return num ? +num : 0;
	}
}

