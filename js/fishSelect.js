$.extend(
		$.fn,{ 

			fishSelect : function(fish){
			var fish = $.extend({
					iniText:'请选择',//初始文本
					bg :"#fff",//背景
					fcolor :"#707070",//字体颜色
					wd:'100px',//宽度
					hg:'22px',//高度
					bd:'1px solid #ececec',//边框
					bBg:'url(image/selectBg.png) center right no-repeat',//小三角背景
					ulBg:'#fff',//ul背景
					ulHeight:'500',//超出部分自动加滚动条
					liBg:"#fff",//li背景
					liColor:"#707070",//li颜色
					liBgHv:"#4a8aec",//li经过背景颜色
					liColorHv:'#fff',//li经过文字颜色
					spanMvBd:'1px solid #ccc',//鼠标移上去边框颜色
					ulMvBd:'1px solid #ccc'
				},fish); 

			//函数体 
				return this.each(function(){
                    var zIndex = 10000;
 					
 					if($(this).find('span').text()==''){
						$(this).find('span').text(fish.iniText);
					}

					var ulH = $(this).find('ul').height();
					if(ulH>fish.ulHeight){
						$(this).find('ul').css({
							height:fish.ulHeight,
							overflowY:'scroll'
						});
					}

					$(this).append("<b></b>");
					$(this).find('span').css({
						padding:'0 5px',
						display:'block',
						color:fish.fcolor,
						background:fish.bg,
						width:fish.wd,
						height:fish.hg,
						border:fish.bd,
						lineHeight:fish.hg,
                        cursor: 'pointer'
					});

					$(this).find('b').css({
						position:'absolute',
						left:parseInt(fish.wd)-5,
						width:'10px',
						display:'block',
						height:'10px',
						top:'10px',
						background:fish.bBg,
                        cursor: 'pointer'
					}); 

					$(this).find('ul').css({
						display:'none',
						color:fish.fcolor,
						width:parseInt(fish.wd)+10,
						position:'absolute',
						zIndex:'9999999',
						background:fish.ulBg,
						left:'0',
						border:fish.bd,
						top:fish.hg

					});

					$(this).find('li').css({

						height:fish.hg,
						lineHeight:fish.hg,
						padding:'0 5px'

					});

					$(this).find('li').mouseenter(function(){

						$(this).css({
							background:fish.liBgHv,
							color:fish.liColorHv,
							cursor:'default'
						});

					});

					$(this).find('li').mouseleave(function(){

						$(this).css({
							background:fish.liBg,
							color:fish.liColor

						});

					});

					$(this).css({
						position:'relative'
					});

					var du = 0;
					$(this).find('span').on('click',function(){
                        var list = $(this).parents('.fishSelect');
                        toggleList(list);
						return false;
					});

                    function toggleList(list) {
						du==0?du=180:du=0;
                        if (!list.hasClass('expand') && $('.fishSelect.expand').length) {
                            toggleList($('.fishSelect.expand'));
                        }
                        list.toggleClass('expand');
						list.find("ul").slideToggle(300).css('zIndex', zIndex++);
						list.find("b").css('-webkit-transform','rotate('+du+'deg)');
						list.find("b").css('-webkit-transition','all 0.2s ease-in-out 0s');
                    }
					
					$(this).find('b').on('click',function(){
                        var list = $(this).parents('.fishSelect');
                        toggleList(list);
						return false;
					});

					$(this).find('li').on('click',function(){
						du==180?du=0:du=180;
						$(this).parents("ul").hide();

						$(this).parents('.fishSelect').removeClass('expand');
						$(this).parents('.fishSelect').find('b').css('-webkit-transform','rotate('+du+'deg)');
						$(this).parents('.fishSelect').find('b').css('-webkit-transition','all 0.1s ease-in-out 0s');

						fsLiVal = $(this).attr('data-value');
						fsLiText = $(this).text();
						
						$(this).parents('.fishSelect').find('span').text(fsLiText);
						$(this).parents('.fishSelect').find('span').attr('data-value',fsLiVal);
						return false;

					});

					
					
					//鼠标移入span颜色
					$(this).mouseenter(function(){
						$(this).find('span').css('border',fish.spanMvBd);
						$(this).find('ul').css('border',fish.ulMvBd);
					});

					$(this).mouseleave(function(){
						$(this).find('span').css('border',fish.spanMvBd);
						$(this).find('ul').css('border',fish.ulMvBd);
					});

					//点击窗体下拉关闭
					$(document).click(function(){
						du = 0;
						$(".fishSelect ul").slideUp(300);
						$(".fishSelect b").css('-webkit-transform','rotate(0deg)');
						$(".fishSelect b").css('-webkit-transition','all 0.1s ease-in-out 0s');
					})

			}); 
		}
	}) 
