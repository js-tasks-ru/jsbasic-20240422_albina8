function checkSpam(str) {
  let checkedStr = str.toLowerCase();
  if (checkedStr.includes('1xbet') || checkedStr.includes('xxx')) {
    return true;
  }
  else {
    return false;
  }
}
