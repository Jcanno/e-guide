export function wait(num) {
  return new Promise(r => {
    setTimeout(() => {
      r()
    }, num);
  })
}

export function insertAfter(newElement,targetElement){
  const parent = targetElement.parentNode;

  if(parent.lastChild == targetElement){
    parent.appendChild(newElement);
  }else{
    parent.insertBefore(newElement,targetElement.nextSibling)
  }
}

export function generatorEle(tag, text, clickFn, dom, append) {
  const ele = document.createElement(tag)
  ele.textContent = text
  ele.addEventListener('click', clickFn)
  if(append) {
    dom.appendChild(ele)
    return
  }
  if(dom) {
    insertAfter(ele, dom)
  }else {
    document.body.appendChild(ele)
  }
}
