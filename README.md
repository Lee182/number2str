# number2str
A simple libary which takes a number and optional alphabet and returns a string. This string can be inversed to get back the original number put in.


## Usage
### install
```bash
# install from github
npm install Lee182/number2str
```

### .encode(n, ?alphabet: string)
```js
const number2str = require('Lee182/number2str')

// encode
const str1 = number2str.encode(1) // => a
const str2 = number2str.encode(123) // => a8
const str3 = number2str.encode(12345) // => cmf
const str4 = number2str.encode(9007199254740991)  // => OoPWm6BNg

// custom alphabet
const str5 = number2str.encode(25, 'cba') // => bbc
```



### .decode(str, ?alphabet: string)
```js
const n1 = number2str.decode('a') // => 1
const n2 = number2str.encode('OoPWm6BNg') // => 9007199254740991

// custom alphabet
const n3 = number2str.decode('bbc', 'cba') // => 25

// error if given character not in alphabet
try {
  number2str.decode('%pencil', 'abc...')
} catch (err) {
  // this will fail
}

```

### .random(n)
```js
// will return an random string will length of n
number2str.random(5) // => 'abg3C'
```