
import {parseHTML} from './parse-html'

function genProps(attrs){
    let str = ''
    for(let i = 0; i < attrs.length; i += 1){
        let attr = attrs[i]
        if(attr.name === 'style'){
            // style = "color: red"  =>  {style: { color: 'red })
            let obj = {}
            attr.value.split(';').forEach(item => {
                let [key, value] = item.split(':')
                obj[key] = value
            });
            attr.value = obj
        }
        str  += `${attr.name}: ${attr.value},`
    }
    

    return str
}

function generate(el) {
    let code = `_c("${el.tag}",${ 
        el.attrs.length ? genProps(el.attrs) : 'undefined'
    })`

    return code
}



// ast 语法树 使用 对象 来描述原生语法    虚拟dom 使用 对象 描述 dom 节点
export function compileToFunction(template){
    console.log(template)
    // 解析为  ast 树
    let root = parseHTML (template)

    // 需要把 ast 语法树生成 render 函数 , 字符串拼接 （模板引擎）
    // 将 ast 树，再次转换成 js 语法
    console.log(root)
    let code = generate(root)

    // <div id="app"><p>hello {{name}}</p> hello </div>
    // _c("div", {id:app}, _c("p", undefined, _v('hello' + _s('name'))). _v(hello))

    console.log(code)
    // console.log(root)
    return function render(){

    }
}

