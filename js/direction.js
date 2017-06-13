// 判断方向 
function direction(o1,o2)
{
	var h = 0;
	var v = 0;

	if(o1.x > o2.x)
	{
		h = -1;

	}else if(o1.x == o2.x)
	{
		h = 0;

	}else{
		h = 1;
	}

	if(o1.y > o2.y)
	{
		v = 1;

	}else if(o1.y == o2.y)
	{
		v = 0;

	}else{
		v = -1;
	}
	return {horizontal:h,vertical:v};
}

// 优先路线排序
function direction2(o1,o2)
{
	var arr = [];
	if(o1.x > o2.x)
	{
		if(o1.y > o2.y)
		{
			arr = ['左','上','下','右'];
		}

		if(o1.y == o2.y)
		{
			arr = ['左','上','下'];
		}

		if(o1.y < o2.y)
		{
			arr = ['左','下','上','右'];
		}

	}else if(o1.x == o2.x)
	{
		if(o1.y > o2.y)
		{
			arr = ['上','右','左'];
		}

		if(o1.y < o2.y)
		{
			arr = ['下','右','左'];
		}

	}else{

		if(o1.y > o2.y)
		{
			arr = ['右','上','下','左'];
		}

		if(o1.y == o2.y)
		{
			arr = ['右','上','下'];

		}

		if(o1.y < o2.y)
		{
			arr = ['右','下','上','左'];

		}
	}
	return arr;
}


// 界面展示 为 x,y轴
// 数据为 行里 列


// 路线左
function routeLeft(_this,x,y)
{	
	var switchBtn = false;

	var mainLine = [];
	var childLine = [];
	var subBranch = [];
	var sum = [];

	mainLine.push({x:_this.o1.x,y:_this.o1.y});

	if(y == 0)
	{
		// 1-1 y相同，都在 x 轴上
		for(var i=_this.o1.x-1; i>_this.o2.x; i--)
		{
			
			mainLine.push({x:i,y:_this.o1.y});

			if(arrData[_this.o1.y][i].isRemove == false)
			{
				mainLine.length = 0;
				break;
			}
			if(i == (_this.o2.x + 1))
			{
				switchBtn = true;
				sum = mainLine;
			}
		}

		if(switchBtn)
		{
			sum.push({x:_this.o2.x,y:_this.o2.y});
			drawLine(_this,sum);
			sameHide(_this);
			refresh(_this);
			return switchBtn;
		}else{
			return false;
		}

	}else{
		// 1-2 不在同一个 x 轴上
		for(var i=_this.o1.x-1; i>-1; i--)
		{
			mainLine.push({x:i,y:_this.o1.y});

			if(arrData[_this.o1.y][i].isRemove == false)
			{
				mainLine.length = 0;
				break;
			}
			
			// 2-1、左上
			if(y > 0)
			{
				// 左上直达
				if(i == _this.o2.x)
				{
					if(Math.abs(_this.o2.y - _this.o1.y) == 1)
					{
						switchBtn = true;
						sum = mainLine.concat(childLine);
					}
					for(var j=_this.o1.y-1; j>_this.o2.y; j--)
					{
						childLine.push({x:i,y:j});
						if(arrData[j][i].isRemove == false)
						{
							childLine.length = 0;
							break;
						}
						if(j == (_this.o2.y + 1))
						{
							switchBtn = true;
							sum = mainLine.concat(childLine);
						}					
					}
					if(switchBtn)
					{
						sum.push({x:_this.o2.x,y:_this.o2.y});
						drawLine(_this,sum);
						sameHide(_this);
						refresh(_this);
						return switchBtn;
					}

				}else{

					for(var j=_this.o1.y-1; j>_this.o2.y-1; j--)
					{
						childLine.push({x:i,y:j});
						if(arrData[j][i].isRemove == false)
						{
							childLine.length = 0;
							break;
						}

						// 向上走到最后一步，拐弯
						// 小于 o2.x 往右走;  大于 o2.x 往左走;
						if(j == _this.o2.y)
						{
							// 左||右走第一个
							if(Math.abs(_this.o2.x - i) == 1)
							{
								switchBtn = true;
								sum = mainLine.concat(childLine);
							}

							// 3-1、右走
							if(i < _this.o2.x)
							{
								for(var i2=i+1; i2<_this.o2.x; i2++)
								{
									subBranch.push({x:i2,y:j});

									if(arrData[j][i2].isRemove == false)
									{
										subBranch.length = 0;
										break;										
									}
									if(i2 == (_this.o2.x-1))
									{
										switchBtn = true;
										sum = mainLine.concat(childLine,subBranch);
									}
								}
							}else{
							// 3-2、左走
								for(var i2=i-1; i2>_this.o2.x; i2--)
								{
									subBranch.push({x:i2,y:j});

									if(arrData[j][i2].isRemove == false)
									{
										subBranch.length = 0;
										break;
									}
									if(i2 == (_this.o2.x+1))
									{
										switchBtn = true;
										sum = mainLine.concat(childLine,subBranch);
									}
								}
							}

							if(switchBtn)
							{
								sum.push({x:_this.o2.x,y:_this.o2.y});
								drawLine(_this,sum);
								sameHide(_this);
								refresh(_this);
								return switchBtn;
							}
						}
					}

				}				
			}

			// 2-2、左下
			if(y < 0)
			{
				// 左下直达
				if(i == _this.o2.x)
				{

					if(Math.abs(_this.o2.y - _this.o1.y) == 1)
					{
						switchBtn = true;
						sum = mainLine.concat(childLine);

					}
					
					for(var j=_this.o1.y+1; j<_this.o2.y; j++)
					{
						childLine.push({x:i,y:j});

						if(arrData[j][i].isRemove == false)
						{
							childLine.length = 0;
							break;							
						}
						if(j == (_this.o2.y - 1))
						{
							switchBtn = true;
							sum = mainLine.concat(childLine);
						}
					}

					if(switchBtn)
					{
						sum.push({x:_this.o2.x,y:_this.o2.y});
						drawLine(_this,sum);
						sameHide(_this);
						refresh(_this);
						return switchBtn;
					}

				}else{

					for(var j=_this.o1.y+1; j<_this.o2.y+1; j++)
					{
						
						childLine.push({x:i,y:j});
						if(arrData[j][i].isRemove == false)
						{			
							childLine.length = 0;
							break;
						}

						// 向下走到最后一步，拐弯
						// 小于 o2.x 往右走;  大于 o2.x 往左走;
						if(j == _this.o2.y)
						{
							// 左||右走第一个
							if(Math.abs(_this.o2.x - i) == 1)
							{
								switchBtn = true;
								sum = mainLine.concat(childLine);
							}

							// 3-1、右走
							if(i < _this.o2.x)
							{
								for(var i2=i+1; i2<_this.o2.x; i2++)
								{
									subBranch.push({x:i2,y:j});

									if(arrData[j][i2].isRemove == false)
									{
										subBranch.length = 0;
										break;
									}

									if(i2 == (_this.o2.x-1))
									{
										switchBtn = true;
										sum = mainLine.concat(childLine,subBranch);
									}
								}
							}else{

								// 3-2、左走

								for(var i2=i-1; i2>_this.o2.x; i2--)
								{
									subBranch.push({x:i2,y:j});

									if(arrData[j][i2].isRemove == false)
									{
										subBranch.length = 0;
										break;
									}

									if(i2 == (_this.o2.x+1))
									{
										switchBtn = true;
										sum = mainLine.concat(childLine,subBranch);
									}
								}
								
							}

							if(switchBtn)
							{
								sum.push({x:_this.o2.x,y:_this.o2.y});
								drawLine(_this,sum);
								sameHide(_this);
								refresh(_this);
								return switchBtn;
							}
						}
					}
				}
			}
		}
	}

	if(switchBtn)
	{
		sum.push({x:_this.o2.x,y:_this.o2.y});
		drawLine(_this,sum);
		sameHide(_this);
		refresh(_this);
		return switchBtn;
	}else{
		return false;
	}
}

// 路线右
function routeRight(_this,x,y)
{

	var switchBtn = false;

	var mainLine = [];
	var childLine = [];
	var subBranch = [];
	var sum = [];

	mainLine.push({x:_this.o1.x,y:_this.o1.y});

	// y相同，都在 x 轴上
	if(y == 0)
	{

		for(var i=_this.o1.x+1; i<_this.o2.x; i++)
		{
			mainLine.push({x:i,y:_this.o1.y});
			
			if(arrData[_this.o1.y][i].isRemove == false)
			{
				mainLine.length = 0;
				break;
			}

			if(i == (_this.o2.x - 1))
			{
				sum = mainLine;
				switchBtn = true;
			}
		}

		if(switchBtn)
		{
			sum.push({x:_this.o2.x,y:_this.o2.y});
			drawLine(_this,sum);
			sameHide(_this);
			refresh(_this);
			return switchBtn;

		}else{

			return false;
		}

	}else{
	// 不在同一个 x 轴上		

		for(var i=_this.o1.x+1; i<pGroup[_this.level].col+2; i++)
		{
			mainLine.push({x:i,y:_this.o1.y});

			if(arrData[_this.o1.y][i].isRemove == false)
			{
				mainLine.length = 0;
				break;
			}

			// 2-1、右上
			if(y > 0)
			{
				if(i == _this.o2.x)
				{

					if(Math.abs(_this.o2.y-_this.o1.y) == 1)
					{
						switchBtn = true;
						sum = mainLine.concat(childLine);
					}

					// 右上直达
					for(var j=_this.o1.y-1; j>_this.o2.y; j--)
					{

						childLine.push({x:i,y:j});

						if(arrData[j][i].isRemove == false)
						{
							childLine.length = 0;
							break;
						}

						if(j == (_this.o2.y + 1))
						{
							switchBtn = true;
							sum = mainLine.concat(childLine);
						}

					}

					if(switchBtn)
					{

						sum.push({x:_this.o2.x,y:_this.o2.y});
						drawLine(_this,sum);
						sameHide(_this);
						refresh(_this);
						return switchBtn;
					}
				}else{

					for(var j=_this.o1.y-1; j>_this.o2.y-1; j--)
					{
						
						childLine.push({x:i,y:j});
						if(arrData[j][i].isRemove == false)
						{
							childLine.length = 0;
							break;
						}

						// 向上走到最后一步，拐弯
						// 小于 o2.x 往右走;  大于 o2.x 往左走;
						if(j == _this.o2.y)
						{
							// 左||右挨着的
							if(Math.abs(_this.o2.x - i) == 1)
							{
								switchBtn = true;
								sum = mainLine.concat(childLine);
							}

							// 3-1、右走
							if(i < _this.o2.x)
							{
								for(var i2=i+1; i2<_this.o2.x; i2++)
								{
									subBranch.push({x:i2,y:j});

									if(arrData[j][i2].isRemove == false)
									{
										subBranch.length = 0;
										break;
									}

									if(i2 == _this.o2.x - 1)
									{
										switchBtn = true;
										sum = mainLine.concat(childLine,subBranch);
									}
								}


							}else{

							// 3-2、左走
								for(var i2=i-1; i2>_this.o2.x; i2--)
								{
									subBranch.push({x:i2,y:j});

									if(arrData[j][i2].isRemove == false)
									{
										subBranch.length = 0;
										break;
									}

									if(i2 == _this.o2.x + 1)
									{
										switchBtn = true;
										sum = mainLine.concat(childLine,subBranch);
									}

								}
							}

							if(switchBtn)
							{
								sum.push({x:_this.o2.x,y:_this.o2.y});
								drawLine(_this,sum);
								sameHide(_this);
								refresh(_this);
								return switchBtn;
							}
						}
					}


				}

				
			}

			// 2-2、右下
			if(y < 0)
			{
				if(i == _this.o2.x)
				{
					if(Math.abs(_this.o2.y - _this.o1.y ) == 1)
					{
						switchBtn = true;
						sum = mainLine.concat(childLine);
					}

					// 下后直达
					for(var j=_this.o1.y+1; j<_this.o2.y; j++)
					{

						childLine.push({x:i,y:j});

						if(arrData[j][i].isRemove == false)
						{
							childLine.length = 0;
							break;
						}

						if(j == (_this.o2.y - 1))
						{
							switchBtn = true;
							sum = mainLine.concat(childLine);
						}
					}

					if(switchBtn)
					{
						sum.push({x:_this.o2.x,y:_this.o2.y});
						drawLine(_this,sum);
						sameHide(_this);
						refresh(_this);
						return switchBtn;
					}
					

				}else{

					for(var j=_this.o1.y+1; j<_this.o2.y+1; j++)
					{
						
						childLine.push({x:i,y:j});
						if(arrData[j][i].isRemove == false)
						{
							childLine.length = 0;
							break;
						}

						// 向下走到最后一步，拐弯
						// 小于 o2.x 往右走;  大于 o2.x 往左走;

						if(j == _this.o2.y)
						{
							// 左||右挨着的
							if(Math.abs(_this.o2.x - i) == 1){
								switchBtn = true;
								sum = mainLine.concat(childLine);
							}

							// 3-1、右走
							if(i < _this.o2.x)
							{
								for(var i2=i+1; i2<_this.o2.x; i2++)
								{
									subBranch.push({x:i2,y:j});

									if(arrData[j][i2].isRemove == false)
									{
										subBranch.length = 0;
										break;
									}
									if(i2 == (_this.o2.x - 1))
									{
										switchBtn = true;
										sum = mainLine.concat(childLine,subBranch);
									}
								}
								
							}else{

							// 3-2、左走
								for(var i2=i-1; i2>_this.o2.x; i2--)
								{
									subBranch.push({x:i2,y:j});

									if(arrData[j][i2].isRemove == false)
									{
										subBranch.length = 0;
										break;
									}
									if(i2 == (_this.o2.x + 1))
									{
										switchBtn = true;
										sum = mainLine.concat(childLine,subBranch);
									}
								}
							}

							if(switchBtn)
							{
								
								sum.push({x:_this.o2.x,y:_this.o2.y});
								drawLine(_this,sum);
								sameHide(_this);
								refresh(_this);
								return switchBtn;
							}
						}
					}
				}

				
			}	
			
		}

	}	
	if(switchBtn)
	{
		sum.push({x:_this.o2.x,y:_this.o2.y});
		drawLine(_this,sum);
		sameHide(_this);
		refresh(_this);
		return switchBtn;
	}else{
		return false;
	}
}

// 路线上
function routeTop(_this,x,y)
{
	var switchBtn = false;

	var mainLine = [];
	var childLine = [];
	var subBranch = [];
	var sum = [];

	mainLine.push({x:_this.o1.x,y:_this.o1.y});
	
	if(x == 0)
	{
		// 1-1 x相同，都在 y 轴上

		for(var j=_this.o1.y-1; j>_this.o2.y; j--)
		{
			mainLine.push({x:_this.o1.x,y:j});

			if(arrData[j][_this.o1.x].isRemove == false)
			{
				mainLine.length = 0;
				break;
			}
			if(j == (_this.o2.y + 1))
			{
				switchBtn = true;
				sum = mainLine;
			}
		}

		if(switchBtn)
		{
			sum.push({x:_this.o2.x,y:_this.o2.y});
			drawLine(_this,sum);
			sameHide(_this);
			refresh(_this);
			return switchBtn;

		}else{

			return false;
		}
		

	}else{

		// 1-2 不在同一个 y 轴上

		for(var j=_this.o1.y-1; j>-1; j--)
		{

			mainLine.push({x:_this.o1.x,y:j});

			if(arrData[j][_this.o1.x].isRemove == false)
			{
				mainLine.length = 0;
				break;
			}

			// 2-1、上右
			if(x > 0)
			{
				if(j == _this.o2.y)
				{

					if(Math.abs(_this.o2.x - _this.o1.x) == 1)
					{
						switchBtn = true;
						sum = mainLine;
					}


					// 上右直达
					for(var i=_this.o1.x+1; i<_this.o2.x; i++)
					{
						
						childLine.push({x:i,y:j});

						if(arrData[j][i].isRemove == false)
						{
							childLine.length = 0;
							break;
						}

						if(i == (_this.o2.x - 1))
						{
							switchBtn = true;
							sum = mainLine.concat(childLine);
						}
					}

					if(switchBtn)
					{
						sum.push({x:_this.o2.x,y:_this.o2.y});
						drawLine(_this,sum);
						sameHide(_this);
						refresh(_this);
						return switchBtn;
					}

				}else{

					for(var i=_this.o1.x+1; i<_this.o2.x+1; i++)
					{

						childLine.push({x:i,y:j});

						if(arrData[j][i].isRemove == false)
						{
							childLine.length = 0;
							break;
						}
												

						if(i == _this.o2.x)
						{

							// 上下挨着
							if(Math.abs(_this.o2.y - j) == 1)
							{
								switchBtn = true;
								sum = mainLine.concat(childLine);
							}

							// 3-1、往下走
							if(j<_this.o2.y)
							{
								for(var y2=j+1; y2<_this.o2.y; y2++)
								{
									subBranch.push({x:i,y:y2});

									if(arrData[y2][i].isRemove == false)
									{
										subBranch.length = 0;
										break;
									}
									if(y2 == (_this.o2.y - 1))
									{
										switchBtn = true;
										sum = mainLine.concat(childLine,subBranch);
									}
								}
								

							}else{
							// 3-2、往上走
								for(var y2=j-1; y2>_this.o2.y; y2--)
								{
									subBranch.push({x:i,y:y2});

									if(arrData[y2][i].isRemove == false)
									{
										subBranch.length = 0;
										break;
									}
									if(y2 == (_this.o2.y + 1))
									{
										switchBtn = true;
										sum = mainLine.concat(childLine,subBranch);
									}
								}
								
							}

							if(switchBtn)
							{
								sum.push({x:_this.o2.x,y:_this.o2.y});
								drawLine(_this,sum);
								sameHide(_this);
								refresh(_this);
								return switchBtn;
							}
						}
					}

				}
			}

			// 2-2、上左
			if(x < 0)
			{

				if(j == _this.o2.y)
				{
					if(Math.abs(_this.o2.x - _this.o1.x) == 1)
					{
						switchBtn = true;
						sum = mainLine;
					}

					// 上左直达
					for(var i=_this.o1.x-1; i>_this.o2.x; i--)
					{
						childLine.push({x:i,y:j});

						if(arrData[j][i].isRemove == false)
						{
							childLine.length = 0;
							break;
						}

						if(i == (_this.o2.x + 1))
						{
							switchBtn = true;
							sum = mainLine.concat(childLine);
						}

					}

					if(switchBtn)
					{
						sum.push({x:_this.o2.x,y:_this.o2.y});
						drawLine(_this,sum);
						sameHide(_this);
						refresh(_this);
						return switchBtn;
					}

				}else{
					for(var i=_this.o1.x-1; i>_this.o2.x-1; i--)
					{
						childLine.push({x:i,y:j});

						if(arrData[j][i].isRemove == false)
						{
							childLine.length = 0;
							break;
						}
						

						if(i == _this.o2.x)
						{

							if(Math.abs(_this.o2.y - j) == 1)
							{
								switchBtn = true;
								sum = mainLine.concat(childLine);
							}

							// 3-1、往下走
							if(j<_this.o2.y)
							{
								
								for(var y2=j+1; y2<_this.o2.y; y2++)
								{
									subBranch.push({x:i,y:y2});

									if(arrData[y2][i].isRemove == false)
									{
										subBranch.length = 0;
										break;
									}
									if(y2 == (_this.o2.y - 1))
									{
										switchBtn = true;
										sum = mainLine.concat(childLine,subBranch);
									}
								}
								

							}else{
							// 3-2、往上走
								for(var y2=j-1; y2>_this.o2.y; y2--)
								{
									subBranch.push({x:i,y:y2});

									if(arrData[y2][i].isRemove == false)
									{
										subBranch.length = 0;
										break;
									}
									if(y2 == (_this.o2.y + 1))
									{
										switchBtn = true;
										sum = mainLine.concat(childLine,subBranch);
									}
								}
								
							}

							if(switchBtn)
							{
								sum.push({x:_this.o2.x,y:_this.o2.y});
								drawLine(_this,sum);
								sameHide(_this);
								refresh(_this);
								return switchBtn;
							}
						}
					}
				}	
			}

		}

	}

	if(switchBtn)
	{
		sum.push({x:_this.o2.x,y:_this.o2.y});
		drawLine(_this,sum);
		sameHide(_this);
		refresh(_this);
		return switchBtn;

	}else{

		return false;
	}
}

// 路线下
function routeBottom(_this,x,y)
{
	
	var switchBtn = false;

	var mainLine = [];
	var childLine = [];
	var subBranch = [];
	var sum = [];

	mainLine.push({x:_this.o1.x,y:_this.o1.y});

	// 1-1、x相同，都在 y 轴上
	if(x == 0)
	{
		for(var j=_this.o1.y+1; j<_this.o2.y; j++)
		{
			mainLine.push({x:_this.o1.x,y:j});

			if(arrData[j][_this.o1.x].isRemove == false)
			{
				mainLine.length = 0;
				break;
			}
			if(j == (_this.o2.y - 1))
			{
				switchBtn = true;
				sum = mainLine;
			}
		}

		if(switchBtn)
		{
			sum.push({x:_this.o2.x,y:_this.o2.y});
			drawLine(_this,sum);
			sameHide(_this);
			refresh(_this);
			return switchBtn;

		}else{

			return false;
		}

			
	}else{
	// 1-2 不在同一个 y 轴上

		for(var j=_this.o1.y+1; j<pGroup[_this.level].row+2; j++)
		{
			mainLine.push({x:_this.o1.x,y:j});

			if(arrData[j][_this.o1.x].isRemove == false)
			{
				mainLine.length = 0;
				break;
			}

			// 2-1、下右
			if(x > 0)
			{
				if(j == _this.o2.y)
				{
					if(Math.abs(_this.o2.x - _this.o1.x) == 1)
					{
						switchBtn = true;
						sum = mainLine;
					}

					// 下右直达
					for(var i=_this.o1.x+1; i<_this.o2.x; i++)
					{
						childLine.push({x:i,y:j});

						if(arrData[j][i].isRemove == false)
						{
							childLine.length = 0;
							break;
						}
						if(i == (_this.o2.x - 1))
						{
							switchBtn = true;
							sum = mainLine.concat(childLine);
						}
					}

					if(switchBtn)
					{
						sum.push({x:_this.o2.x,y:_this.o2.y});
						drawLine(_this,sum);
						sameHide(_this);
						refresh(_this);
						return switchBtn;
					}
					
				}else{

					for(var i=_this.o1.x+1; i<_this.o2.x+1; i++)
					{

						childLine.push({x:i,y:j});

						if(arrData[j][i].isRemove == false)
						{
							childLine.length = 0;
							break;
						}


						if(i == _this.o2.x)
						{

							if(Math.abs(_this.o2.y - j) == 1)
							{
								switchBtn = true;
								sum = mainLine.concat(childLine);
							}

							// 3-1、往下走
							if(j<_this.o2.y)
							{
								for(var y2=j+1; y2<_this.o2.y; y2++)
								{
									subBranch.push({x:i,y:y2});
									if(arrData[y2][i].isRemove == false)
									{
										subBranch.length = 0;
										break;
									}
									if(y2 == (_this.o2.y - 1))
									{
										switchBtn = true;
										sum = mainLine.concat(childLine,subBranch);
									}
								}
								

							}else{
							// 3-2、往上走
								for(var y2=j-1; y2>_this.o2.y; y2--)
								{
									subBranch.push({x:i,y:y2});

									if(arrData[y2][i].isRemove == false)
									{
										subBranch.length = 0;
										break;
									}
									if(y2 == (_this.o2.y + 1))
									{
										switchBtn = true;
										sum = mainLine.concat(childLine,subBranch);
									}
								}
								
							}

							if(switchBtn)
							{
								sum.push({x:_this.o2.x,y:_this.o2.y});
								drawLine(_this,sum);
								sameHide(_this);
								refresh(_this);
								return switchBtn;
							}
						}
					}
				}
			}

			// 2-2、下左
			if(x < 0)
			{
				if(j == _this.o2.y)
				{

					if(Math.abs(_this.o2.x - _this.o1.x) == 1)
					{
						switchBtn = true;
						sum = mainLine;
					}

					// 下左直达
					for(var i=_this.o1.x-1; i>_this.o2.x; i--)
					{
						childLine.push({x:i,y:j});

						if(arrData[j][i].isRemove == false)
						{
							childLine.length = 0;
							break;
						}
						if(i == (_this.o2.x + 1))
						{
							switchBtn = true;
							sum = mainLine.concat(childLine);
						}
					}

					if(switchBtn)
					{
						sum.push({x:_this.o2.x,y:_this.o2.y});
						drawLine(_this,sum);
						sameHide(_this);
						refresh(_this);
						return switchBtn;
					}
					

				}else{
					for(var i=_this.o1.x-1; i>_this.o2.x-1; i--)
					{

						childLine.push({x:i,y:j});

						if(arrData[j][i].isRemove == false)
						{
							childLine.length = 0;
							break;
						}
			

						if(i == _this.o2.x)
						{

							if(Math.abs(_this.o2.y - j) == 1)
							{
								switchBtn = true;
								sum = mainLine.concat(childLine);
							}

							// 3-1、往下走
							if(j<_this.o2.y)
							{
								
								for(var y2=j+1; y2<_this.o2.y; y2++)
								{
									subBranch.push({x:i,y:y2});

									if(arrData[y2][i].isRemove == false)
									{
										subBranch.length = 0;
										break;
									}
									if(y2 == (_this.o2.y - 1))
									{
										switchBtn = true;
										sum = mainLine.concat(childLine,subBranch);
									}

								}
								
							}else{
							// 3-2、往上走
								for(var y2=j-1; y2>_this.o2.y; y2--)
								{
									subBranch.push({x:i,y:y2});

									if(arrData[y2][i].isRemove == false)
									{
										subBranch.length = 0;
										break;
									}
									if(y2 == (_this.o2.y + 1))
									{
										switchBtn = true;
										sum = mainLine.concat(childLine,subBranch);
									}
								}
								
							}

							if(switchBtn)
							{
								sum.push({x:_this.o2.x,y:_this.o2.y});
								drawLine(_this,sum);
								sameHide(_this);
								refresh(_this);
								return switchBtn;
							}
						}				
					}
				}

			}

		}
	}

	if(switchBtn)
	{
		sum.push({x:_this.o2.x,y:_this.o2.y});
		drawLine(_this,sum);
		sameHide(_this);
		refresh(_this);
		return switchBtn;

	}else{

		return false;
	}
}

// 计算路线
function route(_this){

	var json = direction(_this.o1,_this.o2);
	var arr = direction2(_this.o1,_this.o2);
	var a = [];

	var x = json.horizontal;
	var y = json.vertical;
	
	for(var i=0; i<arr.length; i++)
	{
		if(arr[i] == '左')
		{
			var b = routeLeft(_this,x,y);
			a.push(b);
			if(b)break;
		}
		if(arr[i] == '右')
		{
			var c = routeRight(_this,x,y);
			a.push(c);
			if(c)break;
		}
		if(arr[i] == '上')
		{
			var d = routeTop(_this,x,y);
			a.push(d);
			if(d)break;
		}
		if(arr[i] == '下')
		{
			var e = routeBottom(_this,x,y);
			a.push(e);
			if(e)break;
		}
	}
	return a;
}