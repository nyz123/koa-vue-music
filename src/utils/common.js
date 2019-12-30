import {Toast} from 'vant'

export function copyValue(value) {
    if (document.execCommand("copy")) {
      let inputNode = document.createElement("input");
      inputNode.setAttribute("id", "market_copy_input");
      inputNode.value = value;
      document.body.appendChild(inputNode);
      document.getElementById("market_copy_input").select();
      document.execCommand("copy");
      document.body.removeChild(
        document.getElementById("market_copy_input")
      );
      // console.log('复制成功')
      Toast('复制成功')
    } else {
        Toast('您的系统不支持该功能，请使用ctrl + c 复制')
        // console.log('您的系统不支持该功能，请使用ctrl + c 复制')
    }
  }