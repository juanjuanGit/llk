// 封装，先清在开，o1 取代 o2, o2 为空
function clearOther(_this){

	// 先清空所有 active 状态
	_this.o1.active = false;
	_this.o2.active = false;

	_this.o1 = _this.o2;
	_this.o2 = '';

	// 赋值 新的o1 的状态
	_this.o1.active = true;
};

// 相同，消除
function sameHide(_this){

	_this.o2.active = true;

		var a1 = _this.o1;
		var a2 = _this.o2;

		_this.o1 = '';
		_this.o2 = '';

		setTimeout(()=>{

			arrData[a1.y][a1.x].isRemove = true;
			arrData[a2.y][a2.x].isRemove = true;

			_this.line = [];

		},300);
};

// 画线
function drawLine(_this,arr)
{
	for(var i=0; i<arr.length; i++)
	{
		console.log(arr[i]);
		if(i < (arr.length - 1))
		{
			if(Math.abs(arr[i].x - arr[i+1].x) == 1)
			{
				if(arr[i].x < arr[i+1].x)
				{
					_this.line.push({
						left:arr[i].x * 70 + 35,
						top:(arr[i].y) * 70 + 35,
						width:'70px',
						height:'2px'
					});
				}else{
					_this.line.push({
						left:(arr[i].x-1) * 70 + 35,
						top:arr[i].y * 70 + 35,
						width:'70px',
						height:'2px'
					});
				}				
			}

			if(Math.abs(arr[i].y - arr[i+1].y) == 1)
			{
				if(arr[i].y < arr[i+1].y )
				{
					_this.line.push({
						left:arr[i].x * 70 + 35,
						top:(arr[i].y+1) * 70 - 35,
						width: '2px',
						height: '70px'
					});
				}else{
					_this.line.push({
						left:arr[i].x * 70 + 35,
						top:(arr[i].y) * 70 - 35,
						width: '2px',
						height: '70px'
					});
				}
			}
		}
	}
};
