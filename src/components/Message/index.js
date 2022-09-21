import { createVNode, render } from 'vue'

import _Message from './index.vue'
function Message ({ type, text }) {
  // 生成一个vnode
  const messageVNdoe = createVNode(_Message,
    {
      type, text // props参数
    }
  )

  // 新增一个可以挂载的位置，在body末尾新增一个div
  const div = document.createElement('div')
  document.body.append(div)

  // render实现渲染
  // render: 把上一步生成的虚拟dom渲染为真实的dom
  // render(VNode, 挂载的节点)
  render(messageVNdoe, div)

  // 1.5s之后隐藏
  setTimeout(() => {
    render(null, div)
  }, 1500)
}

export default Message
