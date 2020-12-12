/* author    2020年11月27日 */

// 获取非行间样式
function getStyle(ele, attr) {
    // ele: 元素
    // attr: 属性

    // 加判断  判断当前是什么浏览器
    if (ele.currentStyle) { // 真的
        // ie
        return ele.currentStyle[attr];
    } else {
        // 标准
        return getComputedStyle(ele)[attr];
    }
}


// 运动函数--匀速
function move(ele, attr, step, target) {
    // ele: 运动的元素
    // attr: 改变的属性
    // step: 每一次走的步数
    // target: 目标结果
    // 速度的判断   当前值(获取) < 目标值(target)  正数  当前值 > 目标值  负数
    var cur = parseInt(getStyle(ele, attr));
    step = (cur < target ? step : -step);
    clearInterval(ele.t);
    ele.t = setInterval(function () {
        var cur = parseInt(getStyle(ele, attr));
        var end = cur + step;
        if (end >= target && step > 0 || end <= target && step < 0) {
            // 清除定时器  唯一标识
            clearInterval(ele.t);
            // 将end赋值成target
            end = target;
        }
        // 赋值给ele的attr
        ele.style[attr] = end + 'px';
    }, 20);
}

// 求随机数的函数
function getCode(n) {
    // n: 获取的随机数的位数
    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // 存储随机数
    var s = '';
    for (var i = 0; i < n; i++) {
        var num = Math.floor(Math.random() * str.length);
        s = s + str[num];
    }
    // 设置返回值
    return s;
}

// 补0函数
function add0(n) {
    if (n < 10) {
        return '0' + n;
    } else {
        return n;
    }
}

// 函数---创建元素
function createE(ele, con) {
    var td3 = document.createElement(ele);
    td3.innerHTML = con;
    // 设置返回值
    return td3;
}

// 事件绑定
function addEvent(ele, type, fn) {
    // ele: 元素
    // type: 事件类型
    // fn: 绑定的事件处理函数
    if (ele.addEventListener) {
        // 标准
        ele.addEventListener(type, fn, false);
    } else {
        // ie8
        ele.attachEvent('on' + type, fn);
    }
}

// 事件取消函数
function removeEvent(ele, type, fn) {
    // ele: 元素
    // type: 事件类型
    // fn: 事件处理函数
    // 判断
    if (ele.detachEvent) {
        // ie8
        ele.detachEvent('on' + type, fn);
    } else {
        // 标准
        ele.removeEventListener(type, fn, false);
    }
}

// 拖拽元素函数
function drag(ele) {
    // ele: 元素
    // 按下div
    ele.onmousedown = function (evs) {
        // 按下的时候 求鼠标距离元素左侧的距离  鼠标当前距离页面左侧 - 元素到页面左侧的距
        var ev = window.event || evs;
        var ml = ev.clientX - ele.offsetLeft;
        console.log(ml);
        // 鼠标距离元素上方的距离
        var mt = ev.clientY - ele.offsetTop;
        // 鼠标在全页面中移动  ele都要跟随移动
        document.onmousemove = function (evs) {
            // 求当前鼠标的位置
            var ev = window.event || evs;
            console.log(ev.clientX);
            var L = ev.clientX - ml;
            var T = ev.clientY - mt;
            // 判断边界值
            if (T <= 0) {
                T = 0;
            }
            if (L <= 0) {
                L = 0;
            }
            if (L >= document.documentElement.clientWidth - ele.offsetWidth) {
                L = document.documentElement.clientWidth - ele.offsetWidth;
            }
            if (T >= document.documentElement.clientHeight - ele.offsetHeight) {
                T = document.documentElement.clientHeight - ele.offsetHeight;
            }
            // 赋值给元素的left   l1 - l2   l1: 鼠标到屏幕左侧的距离  l2: 鼠标到元素左侧的距离
            ele.style.left = L + 'px';
            ele.style.top = T + 'px';

        }
        // 如果是ie8  所有的事件都优先给ele
        if (ele.setCapture) {
            ele.setCapture();
        }
        // 阻止默认事件
        return false;
    }
    // 鼠标在任何位置抬起 清除事件
    document.onmouseup = function () {
        document.onmousemove = null;
        // 鼠标抬起之后 需要释放全局捕获
        if (ele.releaseCapture) {
            ele.releaseCapture();
        }
    }
}

function buffMove(ele, json, fn) {
    // ele: 元素
    // json: 属性和值
    // fn: 回调函数  这个动作执行完成以后在调用的函数
    // 判断每一个属性是不是透明度
    for (var key in json) {
        if (key == 'opacity') {
            json[key] = json[key] * 100;
        }
    }
    clearInterval(ele.timer);
    // 每隔一段时间  每一个属性都要发生一次变化
    ele.timer = setInterval(function () {
        // 不知道当前所有的属性是否都到达了目标值
        var tag = 1; // 1---当前已经到达目标值   2---当前有属性没有到达目标值
        // 每一个属性都要发生一次变化  每一个  所有  for
        for (var key in json) {
            // 如果 结束值 和 目标值不相等表示没有到目标值
            // key ---- 属性名   width  height  opacity
            // json[key] --- 属性值  500 0.1 1
            if (key == 'opacity') {
                var cur = getStyle(ele, key) * 100;
            } else {
                var cur = parseInt(getStyle(ele, key));
            }
            // console.log(cur, target);
            // 速度 = (目标值 - 当前值 )/ 时间
            var speed = (json[key] - cur) / 20;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            var end = cur + speed;
            if (end != json[key]) {
                // 结束值 != 目标值
                tag = 2;
            }
            if (key == 'opacity') {
                ele.style[key] = end / 100;
            } else {
                ele.style[key] = end + 'px';
            }
        }
        // 执行结束之后 tag还是1  表示假设成立 所有的属性都到了目标值
        if (tag == 1) {
            clearInterval(ele.timer);
            // 动作已经执行结束
            // && 如果一个函数存在 就调用这个函数
            fn && fn();
        }
    }, 20);
}

// 选项卡效果  面向对象的选项卡
function Tab(id) {
    console.log(this);
    // 构造函数  var  xingcan--->属性
    this.id = id;
    this.box = null;
    this.btns = null;
    this.divs = null;

    // 方法: 动态的行为 行为 函数  创建  函数  操作 添加 修改
    this.box = document.getElementById(this.id);
    this.btns = this.box.getElementsByTagName('button');
    this.divs = this.box.getElementsByTagName('div');

    var that = this; // 构造函数创建出来的对象

    // 每一个按钮
    for (var i = 0; i < this.btns.length; i++) {
        this.btns[i].index = i;
        // 事件
        this.btns[i].onclick = function () {
            that.iclick(this.index);
        }
    }
}

// 公共的方法加给原型
Tab.prototype.iclick = function (index) {
    // 把每一个都清楚类名
    for (var j = 0; j < this.divs.length; j++) {
        this.divs[j].className = '';
    }
    // 指定的内容显示出来
    this.divs[index].className = 'active';
}

// AJAX 请求函数
function ajax(type, url, data, fn) {
    // type: 请求方式  
    // url: 请求地址
    // data: 请求数据
    // fn: 请求成功以后的回调函数

    // 1. 创建ajax对象
    var ajax = new XMLHttpRequest();
    if (type == 'post') {
        // 2. 建立连接: open('请求方式', 请求地址, 是否异步)
        ajax.open(type, url, true);

        // 3. 设置请求头
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=utf-8;');

        // 4. 发送请求 send(请求参数);
        ajax.send(data);
    } else {
        ajax.open(type, url+ '?' + data, true);
        // 3. 发送请求
        ajax.send();
    }

    // 5. 监听请求的状态改变
    ajax.onreadystatechange = function () {
        // 6. 监听请求状态
        if (ajax.readyState == 4 && ajax.status == 200) {
            // console.log(ajax.response);
            // 设置返回值  拿不到结果
            // return ajax.response;

            // 等待后台返回数据之后 才能输出结果 回调函数
            // 把请求返回的数据作为实参传递给回调函数
            fn(ajax.response);
        }
    }
}