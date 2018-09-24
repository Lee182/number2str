const number2str = require('./number2str.js')

describe('number2str', ()=>{
  test('.encode(3907)', ()=>{
    const out = number2str.encode(3907)
    expect(out).toEqual('aaa')
  })

  test('.encode() less than or equal 0 will return an empty string', ()=>{
    expect(number2str.encode(0)).toEqual('')
    expect(number2str.encode(-99)).toEqual('')
  })

  test('.decode("aaa")', ()=>{
    const out = number2str.decode('aaa')
    expect(out).toEqual(3907)
  })

  test('.encode and .decode are the functional inverse operation of eachother', ()=>{
    const input = [
      1,
      63,
      3907,
      242235,
      15018571,
      931151403,
      Number.MAX_SAFE_INTEGER
    ]
    const result = input.map(n=>{
      const out = number2str.encode(n)
      const outReverse = number2str.decode(out)
      return {
        in: n,
        out,
        outReverse
      }
    })
    result.forEach((o)=>{
      expect(o.in).toEqual(o.outReverse)
    })
  })

  it('.computeMaxMin(n) input output returns correct min max values', ()=>{
    const arr = Array(9).fill().map((meh, i)=>(i)).map((n)=>{
      return number2str.computeMaxMin(n)
    })
    expect(arr).toEqual([
      {
        "min": 0,
        "max": 0
      },
      {
        "min": 1,
        "max": 62
      },
      {
        "min": 63,
        "max": 3906
      },
      {
        "min": 3907,
        "max": 242234
      },
      {
        "min": 242235,
        "max": 15018570
      },
      {
        "min": 15018571,
        "max": 931151402
      },
      {
        "min": 931151403,
        "max": 57731386986
      },
      {
        "min": 57731386987,
        "max": 3579345993194
      },
      {
        "min": 3579345993195,
        "max": 221919451578090
      }
    ])
  })

  it('.encode(n) of the max values and min values match given length', ()=>{
    const arr = Array(9).fill().map((meh, i)=>(i)).map((n)=>{
      return number2str.computeMaxMin(n)
    })
    expect(arr.map(o=>{
      return {
        ...o,
        minLength: number2str.encode(o.min).length,
        maxLength: number2str.encode(o.max).length
      }
    })).toEqual(arr.map((o, i)=>{
      return {
        ...o,
        minLength: i,
        maxLength: i
      }
    }))
  })

  it('.random(n) returns a string with length n', ()=>{
    Array(21).fill().map((meh, i)=>(i)).forEach((n)=>{
      const str = number2str.random(n)
      expect(str.length).toEqual(n)
    })
  })

  it('.decode throws error with invalid letter', ()=>{
    try {
      number2str.decode('#epicfail')
    } catch (err) {
      expect(err.message).toEqual('Invalid string uses a character not part of alphabet')
    }
  })

  it('works with a custom alphabet', ()=>{
    expect(number2str.encode(25, 'cba')).toEqual('bbc')
    expect(number2str.decode('bbc', 'cba')).toEqual(25)
  })

})

