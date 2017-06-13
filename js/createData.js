
//后面用来存储界面展示需要用到的数据
var arrData;

//稍后定义定时器
var timer;      	

//页面绘制 和 设置游戏难易程度数据	 例：{type:29, row:8, col:12}
var pGroup = [
	{type:12, row:6, col:8},
	{type:15, row:6, col:6},
	{type:10, row:3, col:6},
	{type:17, row:5, col:10},
	{type:14, row:8, col:6},
	{type:16, row:6, col:10},
	{type:18, row:6, col:8},
	{type:20, row:8, col:8},
	{type:22, row:8, col:6},
	{type:24, row:8, col:10},
	{type:26, row:6, col:9},
	{type:28, row:7, col:10},
	{type:29, row:8, col:12}    
];

//图片路径信息数据 例：'img/29.jpg'
var imgData = [
	'img/0.jpg',
	'img/1.jpg',
	'img/2.jpg',
	'img/3.jpg',
	'img/4.jpg',
	'img/5.jpg',
	'img/6.jpg',
	'img/7.jpg',
	'img/8.jpg',
	'img/9.jpg',
	'img/10.jpg',
	'img/11.jpg',
	'img/12.jpg',
	'img/13.jpg',
	'img/14.jpg',
	'img/15.jpg',
	'img/16.jpg',
	'img/17.jpg',
	'img/18.jpg',
	'img/19.jpg',
	'img/20.jpg',
	'img/21.jpg',
	'img/22.jpg',
	'img/23.jpg',
	'img/24.jpg',
	'img/25.jpg',
	'img/26.jpg',
	'img/27.jpg',
	'img/28.jpg',
	'img/29.jpg'   
];


function createData(parameter)
{
	var count = parameter.row * parameter.col;
	var arr = [];


	for(var i=0; i<count; i++)
	{
		// 1、因为连连看是成对的，所以 % 一半，使数据 两两 相对应
		var group = i % (count / 2);

		// 2、得到多个成对数据后，去 % 传参进来的类型，使整个组的数据就类型的数量来进行分配
		arr.push(group % parameter.type);
	}


	// 将数据打乱，打开时每次都不一样
	arr.sort(function(n1,n2){
		return Math.random()-0.5;
	});


	// 包含所有数据的二维数组
	arrData = [];
	var n = 0;
	for(var i=0; i<parameter.row+2; i++)
	{
		// arr[i] -》 行
		var arr2 = [];

		for(var j=0; j<parameter.col+2; j++)
		{
			// 列 - json = {x:'',y:'',type:''}
			var json = {};

			if(i==0 || (i==parameter.row+1) || (j==0) || (j==parameter.col+1))
			{
				json.x = j;
				json.y = i;
				json.isRemove = true;

			}else{

				json.x = j;
				json.y = i;
				json.type = arr[n];
				json.ID = n;
				json.imgSrc = imgData[json.type];
				json.isRemove = false;
				json.active = false;
				n++;
			}

			arr2.push(json);	
		}
		arrData.push(arr2);
	};
};
createData(pGroup[0]);


// 数据全部消除后，难度升级，重新绘制
function refresh(_this)
{
	timer = setTimeout(function()
	{
		for(var i=1; i<pGroup[_this.level].row+1; i++)
		{
			for(var j=1; j<pGroup[_this.level].col+1; j++)
			{
				if(arrData[i][j].isRemove == false)
				{
					return;
				}
			}
		}

		// 如果当前关卡为最后一关，更改 btn 提示内容
		if(_this.level == pGroup.length-1)
		{
			$('.popup p').html('已经是最后一关了哦 ^_^');
			$('.popup .btn_group .continue').html('重新开始');
		}

		$('.bg').show(500);
		$('.popup').show(500);

		// 删除绑定事件，只执行一次
		$('.popup .btn_group').off();
		$('.popup .btn_group').on('click', '.cancel', function(event) {

			var r=confirm("确定要退出吗？");

			if (r==true)
			{
				window.close();
			}
		});


		$('.popup .btn_group .continue').one('click', function(event) {

			$('.bg').hide();
			$('.popup').hide();


			// 点击进入下一关，如果当前关卡为最后一关，将btn 提示改为初始内容
			if(_this.level == pGroup.length-1)
			{
				_this.level = -1;
				$('.popup p').html('恭喜您通过本关 ^_^');
				$('.popup .btn_group .continue').html('进入下一关');
			}

			
			// 新数据重绘
			_this.level+=1;
			createData(pGroup[_this.level]);
			for(var i=1; i<pGroup[_this.level].row+1; i++)
			{
				for(var j=1; j<pGroup[_this.level].col+1; j++)
				{
					arrData[i][j].isRemove == false;

				}
			}

			// 同步数据到DOM
			_this.msg = arrData;

		});

		clearTimeout(timer);

	},500);
}





