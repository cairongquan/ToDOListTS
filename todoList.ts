// 获取dom元素
const inputDom:element = document.querySelector('.inputValue');
const todolistDom:element = document.querySelector('#todolist');
const donelitsDom: element = document.getElementById('donelist')
const todoCount: element = document.getElementById('todocount');
const doneCount: element = document.getElementById('donecount');
const mainBox: element = document.querySelector('.mainBox');



// 数组元素接口
interface items { 
    text: string,
    status:boolean
}

// 声明元素类型 (元素类,空类,任意类)
type element = Element | null | any;


let toDoListArray: items[] = []; //未完成事件数组
let doneListArray: items[] = []; //完成事件数组

// 从localStorage中读取代码 并赋值
window.onload = function () { 
    let key: string =String(window.localStorage.getItem('local'));
    let obj: {
        todoArr: items[],
        doneArr: items[]
    } = JSON.parse(key);
    toDoListArray = obj.todoArr;
    doneListArray = obj.doneArr;
    render(); //渲染页面
}

// 搜索框点击回车事件
inputDom?.addEventListener('keydown', function (e: { keyCode: any; }) { 
    let code: number | any = e.keyCode;
    if (code == 13) { 
        toDoListArray.push({
            text: inputDom.value,
            status:false
        })
        render(); //渲染页面
        inputDom.value = ''
    }
})

// 页面渲染函数
function render():void { 
    let toDoStr: string = '';
    let doneStr: string = '';
        toDoListArray.forEach((item, index) => {
            toDoStr += `
            <li draggable="true"><input type="checkbox" data-index=${index}><p id="p-0">${item.text}</p><a href="javascript:;" class="removeItem" data-type="todo" data-index="${index}">
                <i class="iconfont icon-shanchu"></i>
            </a></li>
            `
        })
        
    doneListArray.forEach((item,index) => { 
        doneStr += `
        <li draggable="true"><input type="checkbox" checked data-index=${index}><p id="p-0">${item.text}</p><a href="javascript:;" class="removeItem" data-type="done" data-index="${index}">
        <i class="iconfont icon-shanchu"></i>
    </a></li>
        `
    })
    
    donelitsDom.innerHTML = doneStr;
    todolistDom.innerHTML = toDoStr;
    
    // 改变数值
    todoCount.innerHTML = toDoListArray.length;
    doneCount.innerHTML = doneListArray.length;

    // 存储本地方法
    save();
}

// 本地存储方法
function save():void { 
    let obj: {
        todoArr: items[],
        doneArr: items[]
    } = {
        todoArr: toDoListArray,
        doneArr: doneListArray
    }
    window.localStorage.setItem('local', JSON.stringify(obj));
}


// 正在
todolistDom.addEventListener('click', function(e: { target: Element; }){ 
    let $this: Element = e.target;
    if ($this.tagName == 'INPUT') { 
        let index: number = Number($this.getAttribute('data-index'));
        let item: items = toDoListArray[index];
        item.status = true;
        doneListArray.push(item);
        toDoListArray.splice(index, 1);
        render();
    }
})

// 做完
donelitsDom.addEventListener('click', function (e: {target:Element}) { 
    let $this:Element = e.target;
    if ($this.tagName == 'INPUT') { 
        let index: number = Number($this.getAttribute('data-index'));
        let item: items = doneListArray[index];
        item.status = false;
        toDoListArray.push(item);
        doneListArray.splice(index, 1);
        render();
    }  
})

// 删除事件
mainBox.addEventListener('click', function (e: { target: Element; }) {
    let $this:Element = e.target;
    if ($this.className == 'removeItem') { 
        let type: string | null = $this.getAttribute('data-type');
        let index: number = Number($this.getAttribute('data-index'));
        if (type == 'todo') {
            toDoListArray.splice(index, 1);
        }
        else { 
            doneListArray.splice(index, 1);
        }
        render();
    }
 })


