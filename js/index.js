$(function(){
	$(window).scroll(function(){
		var x=$(this).scrollTop()
		if(x>0){
			$(".lenovo_heard").css({
				display:"none"
			})
			$(".lenovo_box").css({
				position:"fixed",top:0,left:0,
			})
		}else {
			$(".lenovo_heard").css({
				display:"block",
				position:"fixed",top:0,left:0,
				display:"flex"
			})
			$(".lenovo_box").css({
				position:"fixed",
				top:80,
				left:0,
				display:"flex"
			})
		}
		
	})
})
//轮播
$(function(){
	$.ajax({
		url:"date/index.json",
		type:"get",
		success:function(d){
			console.log(d)
			$.each(d.banner,function(i,obj){
				var dian=$("<div class='dian'></div>")
				var oUl=$("<ul class='banner-list'></ul>")
				$.each(obj.album,function(index,item){
					console.log(item)
					var oli=$(`<li><img src="${item}" alt=""></li>`)
					var span=$(`<span></span>`)
					oUl.append(oli)
					dian.append(span)
				})
				$(".banner").append(dian,oUl)
			})
			var li1=$(".banner-list li").first().clone()
			var li2=$(".banner-list li").last().clone()
			$(".banner-list").append(li1)
			$(".banner-list").prepend(li2)
			var index=1;
			var start;
			var w
			var time
			var falg=true
			var len=$(".banner-list li").length
			$(".banner").on("touchstart",function(e){
				start=e.touches[0].pageX
				w=parseFloat($(".banner").css("width"))
			})
			$(".banner").on("touchend",function(e){
				var end=e.changedTouches[0].pageX
				if(start-end>w/3){
					index++
					if(index>len-2){
						index=1
						$(".banner-list").css({
							transform:"translateX(0)"
						})
					}
				}else if(start-end<-w/3){
					index--;
					if(index<1){
						index=len-2
						$(".banner-list").css({
						transform:"translateX("+(-6.4*(len-1))+"rem)"
						})
					}
				}
				add()
			})
			add()
			time=setInterval(function(){
				index++
				if(index>len-2){
					index=1
					$(".banner-list").css({
						transform:"translateX(0)"
					})
				}
				add()
			},1000)
			$(".banner").on("touchmove",function(){
				clearInterval(time)
			})
			$(".banner").on("touchend",function(){
				time=setInterval(function(){
					index++
					if(index>len-2){
						index=1
						$(".banner-list").css({
							transform:"translateX(0)"
						})
					}
					add()
				},2000)
			})
			function add(){
				$(".banner-list").animate({
					transform:"translateX("+-index*6.4+"rem)"
				})
				$(".dian span").eq(index-1).addClass("active").siblings().removeClass("active")
			}
		}
	})
	
})
//倒计时
$(function(){
	time()
	function time(){
		var m=new Date()
		var my=new Date("2020-12-31 00:00:00")
		var cha=parseInt(my-m)/1000
		var s=parseInt(cha%86400/3600)
		var f=parseInt(cha%3600/60)
		var m=parseInt(cha%60)
		if(s<10){s="0"+s}
		if(f<10){f="0"+f}
		if(m<10){m="0"+m}
		$(".s").text(s)	
		$(".f").text(f)
		$(".m").text(m)
	}
	setInterval(function(){
		time()
	},1000)
})
// 列
$(function(){
	$.ajax({
		url:"date/index.json",
		type:"get",
		success:function(d){
			$.each(d.list.li,function(i,obj){
				console.log(obj)
				$(".wrap-list").append(`<li>
								<img src="${obj.img}" alt="">
								<h4>${obj.nei}</h4>
								<div><span>￥1</span><span></span></div>
								<s>￥${obj.money}</s>
							</li>`)
			})
		}
	})
})

//为你推荐
$(function(){
	$.ajax({
		url:"date/index.json",
		type:"get",
		success:function(d){
			$.each(d.wrap.title,function(i,obj){
				$(".footer-viewbox").append(`<li>
						<a  href="detail.html?pid=${obj.pid}">
						<img src="${obj.imgSrc}" alt="">
						<p>${obj.title}</p>
						<div>
							<span>￥</span>
							<span>${obj.jia}</span>
							</div>
							</a>
					</li>`)
			})
		}
	})
})