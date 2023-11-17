import fs from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Deob } from '@deob/utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class MyDeOb extends Deob {
  // 编写自定义 traverse
}

; (async function () {
  const fileName = 'code'

  const rawCode = await fs.readFile(`${__dirname}/${fileName}.js`, {
    encoding: 'utf-8',
  })

  const deob = new MyDeOb(rawCode, {
    dir: __dirname,
    isWriteFile: true,
  })

  await deob.prettierCode()

  deob.findDecryptFnByCallCount(100, true)

  await deob.record(fileName, 1)

  deob.saveAllObject()
  deob.objectMemberReplace()
  deob.reParse()
  await deob.record(fileName, 2)

  deob.switchFlat()
  deob.switchFlat()
  deob.reParse()
  await deob.record(fileName, 3)

  // 最后通用处理
  deob.calcBinary()
  deob.calcBoolean()
  deob.replaceConstant()
  deob.reParse()
  await deob.record(fileName, 4)

  deob.removeUnusedBlock()
  deob.removeUnusedVariables()
  deob.selfCallFnReplace()

  // 优化
  // deob.changeObjectAccessMode()
  deob.deleteExtra()
  deob.addComments()

  const code = deob.getCode()
  fs.writeFile(`${__dirname}/output.js`, code)
})()
