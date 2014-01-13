
(function () {
	$(function () {
		$('#area-select, #group-select').jqDropDown({
			afterToggle: function () {
				var _this = $(this);
				_this.parents('.ddContainer').css('zIndex', '100000000');
				_this.next().width('auto')
			},
			optionChanged: function () {
				$('#query1').submit();
			}
		});

        $('#server-select').jqDropDown({
			afterToggle: function () {
				var _this = $(this);
				_this.parents('.ddContainer').css('zIndex', '100000000');
				_this.next().width('auto')
			},
			optionChanged: function () {
				$('#query2').submit();
			}
		});

		$(".nano").nanoScroller({alwaysVisible: true});

        // �����ֶβ�ѯҳ�� ./search=xxx
        $('#search-form').submit();

        // ��ת��ָ��ҳ�� ./area=xx&group=xx&server=xx&page=xx
		$('.goto').submit(function (e) {
			e.preventDefault();
			$.get('./', {
				page: $('.goto .page').val(),
                area: $('#area-select').val(),
                group: $('#group-select').val(),
                server: $('#server-select').val()
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
		alert('ͶƱʧ��');
	} else if (result == 1) {
		alert('ͶƱ�ɹ�');
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
	// focus��hide��placeholder���ɷ�ֹĳЩ�����û��click��ֱ��focus��input
	// ���磺tab��focus
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
	 * �޸���ʾ�İ�
	 */
	this.value = function (value) {
		if (!value) {
			return ph.text();
		}
		ph.text(value);
	};

	/**
	 * ��������`display:none`ʱ�޷���ȷ��λ������ṩ�˷���
	 * ��`display != 'none'`ʱ���ÿ�����λ��
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

