
const alphabet62 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'//-._$~`
function computeMaxMin(nLength, alphabet = alphabet62) {
  const oMinMax = Array(nLength + 1).fill().map((meh, i)=>(i))
    .reverse()
    .map((n)=>{
      return Math.pow(alphabet.length, n)
    })
    .reduce((o, n, i)=>{
      if (i > 0){
        o.min += n
      }
      o.max += n
      return o
    }, {min: 0, max: 0})
  oMinMax.max -= 1
  return oMinMax
}

function n2arr(n, alphabet = alphabet62) {
  let ans = []
  const l = alphabet.length
  while (n > 0){
    const y = Math.pow(l, ans.length)
    let tmp = Math.ceil( (n/y) % l )
    if (tmp === 0) {tmp = l}
    n = n - tmp * y
    ans.unshift(tmp)
  }
  return ans
}

function arr2n(arr, alphabet = alphabet62){
  const l = alphabet.length
  return arr.reverse().reduce(function(ans, n, i){
    ans += n*Math.pow(l,i)
    return ans
  }, 0)
}

function encodeArr(arrNumbers, alphabet = alphabet62){
  return arrNumbers.reduce(function(str, n){
    return str + alphabet[n-1]
  }, '')
}

function decodeString(str, alphabet = alphabet62){
  let fail = []
  let arr = str.split('').map(function(char){
    let i = alphabet.indexOf(char)
    if (i === -1) { fail.push(char) }
    return i+1
  })
  if (fail.length !== 0) {
    throw fail
  }
  return arr
}

function getRandomInt(min, max) {
  // min is inclusive
  // max is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function decode (str, alphabet = alphabet62) {
  try {
    const arr = decodeString(str, alphabet)
    return arr2n(arr, alphabet)
  } catch (arrFail) {
    throw Error('Invalid string uses a character not part of alphabet', arrFail)
  }
}

function encode(n, alphabet = alphabet62) {
  const arr = n2arr(n, alphabet)
  return encodeArr(arr, alphabet)
}

function random (nLength, alphabet = alphabet62) {
  let str = ''
  // divide nLength by 5 given max integer value in javascirpt
  const remainder = nLength % 5
  const answer = (nLength - remainder) / 5
  if (answer > 0) {
    const o = computeMaxMin(5, alphabet)
    Array(answer).fill().forEach(()=>{
      str += encode(getRandomInt(o.min, o.max), alphabet)
    })
  }
  if (remainder > 0) {
    const {min, max} = computeMaxMin(remainder, alphabet)
    str += encode(getRandomInt(min, max), alphabet)
  }
  return str
}

module.exports = {
  n2arr,
  getRandomInt,
  computeMaxMin,
  encode,
  decode,
  random
}