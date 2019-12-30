export default function WithConsole(WrappedComponent) {
  return {
    mounted() {
      console.log('I have already mounted')
    },
    render(h) {
      // 将 this.$slots 格式化为数组，因为 h 函数第三个参数是子节点，是一个数组
      const slots = Object.keys(this.$slots).reduce(
        (arr, key) => arr.concat(this.$slots[key]), []
      )// 手动更正 context
        .map(vnode => {
          vnode.context = this._self
          return vnode
        })

      return h(WrappedComponent, {
        on: this.$listeners,
        attrs: this.$attrs,
        props: this.$props
      }, slots)
    }
  }
}