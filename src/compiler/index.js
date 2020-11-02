const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;    // abc-aaa
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;  // <aaa:b>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

function parseHTML(html){
    while(html){
        let textEnd = html.indexOf('<');
        if(textEnd === 0){
            // 如果当前索引为 0 ，肯定是一个标签 开始标签 或 结束标签
            let startTagMatch = parseStartTag() // 通过这个方法 获取匹配的结果  tagName   attrs
            console.log(startTagMatch)
            break
        }
    }

    function advance(n){
        html = html.substring(n)
    }
    function parseStartTag(){
        let start = html.match(startTagOpen)
        const match = {
            tagName: start[1],
            attrs: []
        }
        if(start){
            advance( start[0].length)  // 将标签删除
        }
        let end, attr
        // while 循环秒用  
        while((!(end = html.match(startTagClose))) && (attr = html.match(attribute))){
            console.log(attr)
            match.attrs.push({
                name: attr[1],
                value: attr[3] || attr[4] || attr[5]
            })
            advance(attr[0].length)  // 将属性删除
        }
        if(end){
            (advance(end[0].length))
            return match
        }
    }
}


// ast 语法树 使用 对象 来描述原生语法    虚拟dom 使用 对象 描述 dom 节点
export function compileToFunction(template){
    console.log(template)
    let root = parseHTML (template)
    return function render(){

    }
}


/*{ <div id='app'>
    <p>hello</p>
</div> }*/

// ast 语法树
// let root = {
//     tag: 'div',
//     attrs: [{
//         name: 'id',
//         value: 'app'
//     }],
//     parent: null,
//     type: 1,
//     children: {
//         tag: 'p',
//         attrs: [],
//         parent: root,
//         type: 1,
//         children: [{
//             text: 'hello',
//             type: 3
//         }]
//     }
// }

