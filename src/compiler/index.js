
import {parseHTML} from './parse-html'
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

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
        str  += `${attr.name}: ${JSON.stringify(attr.value)},`
    }
    

    return  `{ ${str.slice(0,-1)}}`
}

function genChildren (children) {
    if(children.length > 0){
        return `${ children.map(c =>  gen(c)).join(',')   }`
    } else {
        return false
    }
}

//  _c  创建元素   _v 创建文本节点    _s 解析 

function gen(node){
    if(node.type == 1){
        // 元素标签
        return generate(node)
    } else {
        let text = node.text 
        //  a {{name}}  b {{age}}  c
        // _v("a" + _s(name) + "b" + _s(age) + "c")
        // 正则的 lastIndex 问题 exec() 
        
        let tokens = [];
        let match, index;
        let lastIndex = defaultTagRE.lastIndex = 0
        while (match = defaultTagRE.exec(text)){
            index = match.index
            if(index > lastIndex){
                tokens.push( JSON.stringify(text.slice(lastIndex,index)) )
            }
            tokens.push( `s(${match[1].trim() })`)
            lastIndex = index + match[0].length
        }

        if(lastIndex < text.length) {
            tokens.push( JSON.stringify(text.slice(lastIndex, index)))
        }

        return `_v(${tokens.join('+')})`
    }
}




function generate(el) {
    let code = `_c("${el.tag}",${ 
        el.attrs.length ? genProps(el.attrs) : 'undefined'
    }${
        el.children ? `,${genChildren(el.children)}` : ''
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
    // console.log(code)

    // <div id="app"><p>hello {{name}}</p> hello </div>
    // _c("div", {id:app}, _c("p", undefined, _v('hello' + _s('name'))). _v(hello))

    // 所有的模板引擎实现，都要  new  Function with
    // let renderFn = new Function()
    let renderFn = new Function(`with(this){ return ${code} }`) 
    console.log(renderFn)

    // vue 的 renderFn 返回的是一个虚拟 dom
    return renderFn
}

    // function() {
    //     with(this){
    //         return   _c("div", {id:app}, _c("p", undefined, _v('hello' + _s('name'))). _v(hello))
    //       }
    // }

