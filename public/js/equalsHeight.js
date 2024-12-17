window.onload = function() {
    const block1 = document.querySelector('#general_text');
    const block2 = document.querySelector('#images');
  
    const maxHeight = Math.max(block1.offsetHeight, block2.offsetHeight);
  
    block1.style.height = maxHeight + 'px';
    block2.style.height = maxHeight + 'px';
  };