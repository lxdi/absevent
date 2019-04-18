import {registerObject, registerEvent, registerReaction, chkSt, fireEvent} from '../src/index.js'

describe('Simple tests', ()=>{
  test('Test with a gun', ()=>{
    registerObject('gun')
    registerEvent('gun', 'fire', (stStr, shotStrength)=>shotStrength)

    registerReaction('aim', 'gun', 'fire', (stStr, shotStrength)=>{
      stStr('hit', true)
      stStr('hit strength', shotStrength)
    })

    registerReaction('a man nearby', 'gun', 'fire', (stStr)=>stStr('heard a shot', true))

    expect(chkSt('aim', 'hit')).toBe(undefined)
    expect(chkSt('aim', 'hit strength')).toBe(undefined)
    expect(chkSt('a man nearby', 'heard a shot')).toBe(undefined)

    fireEvent('gun', 'fire', [450])

    expect(chkSt('aim', 'hit')).toBe(true)
    expect(chkSt('aim', 'hit strength')).toBe(450)
    expect(chkSt('a man nearby', 'heard a shot')).toBe(true)

  })
})
