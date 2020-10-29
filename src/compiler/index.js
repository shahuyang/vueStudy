// ast 语法树 使用 对象 来描述语法    虚拟dom 使用 对象 描述 dom 节点
export function compileToFunction(template){
    console.log(template)
    return function render(){

    }
}



<div id='app'>
    <p>hello</p>
</div>

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