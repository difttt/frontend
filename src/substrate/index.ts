import { ApiPromise, WsProvider } from '@polkadot/api'
import { Keyring } from '@polkadot/keyring'
import dayjs from 'dayjs'

// 如没有运行 node-template，也可试连到波卡主网上： `wss://rpc.polkadot.io`.
const provider = new WsProvider('ws://127.0.0.1:9944')
// const provider = new WsProvider('wss://difttt.dmb.top/ws')
// const provider = new WsProvider('ws://39.108.194.248:9944')
const api = await ApiPromise.create({ provider })

// 获取用户
function getUser(userName: string) {
  const keyring = new Keyring({ type: 'sr25519' })
  const user = keyring.addFromUri(`//${userName}`)
  return user
}
const Alice = getUser('Alice')

async function getChainInfo() {
  // 1. 查看本条链的信息
  const [chain, nodeName, nodeVersion, metadata] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
    api.rpc.state.getMetadata(),
  ])

  return {
    metadata,
    chain,
    nodeName,
    nodeVersion,
  }
}

// 转账
async function transfer(to: string, from: any, amount: number) {
  const tx = api.tx.balances.transfer(to, amount)
  const hash = tx.signAndSend(from)
  return hash
}

async function createTrigger(data) {
  const trigger = await api.tx.templateModule.createTriger(data)
  const hash = await trigger.signAndSend(Alice)
  return hash
}

async function getTriggers() {
  const exposures = await api.query.templateModule.trigerOwner.entries(Alice.address)

  const triggers = []

  for (const [key] of exposures) {
    const id = +key.args[1]
    const t = await api.query.templateModule.mapTriger(id)
    const trigger = t.toHuman()
    const { Timer, Schedule, PriceGT, PriceLT } = trigger

    const res = {}
    if (Timer) {
      res.type = 'Timer'
      res.data = Timer
    }
    else if (Schedule) {
      res.type = 'Schedule'
      res.data = Schedule
    }
    else if (PriceGT) {
      res.type = 'PriceGT'
      res.data = PriceGT
    }
    else if (PriceLT) {
      res.type = 'PriceLT'
      res.data = PriceLT
    }

    const time = +res.data[0].split(',').join('')
    res.createdTime = dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    res.condition = res.data[1]

    triggers.push({
      ...res,
      key: id,
      id,
    })
  }

  return triggers
}

async function createAction(data) {
  const action = await api.tx.templateModule.createAction(data)
  const hash = await action.signAndSend(Alice)
  return hash
}

async function getActions() {
  const exposures = await api.query.templateModule.actionOwner.entries(Alice.address)

  const actions = []

  for (const [key] of exposures) {
    const id = +key.args[1]
    const t = await api.query.templateModule.mapAction(id)
    const action = t.toHuman()
    const { MailWithToken, Oracle } = action

    if (MailWithToken) {
      action.type = 'MailWithToken'
      action.url = MailWithToken[0]
      action.token = MailWithToken[1]
      action.receiver = MailWithToken[2]
      action.title = MailWithToken[3]
      action.body = MailWithToken[4]
    }
    else if (Oracle) {
      action.type = 'Oracle'
      action.url = Oracle[0]
      action.token_name = Oracle[1]
    }

    actions.push({
      ...action,
      key: id,
      id,
    })
  }

  return actions
}

async function createRecipe(actionId, triggerId) {
  const recipe = await api.tx.templateModule.createRecipe(actionId, triggerId)
  const hash = await recipe.signAndSend(Alice)
  return hash
}

async function getRecipes() {
  const exposures = await api.query.templateModule.recipeOwner.entries(Alice.address)

  const recipes = []

  for (const [key] of exposures) {
    const id = +key.args[1]
    const t = await api.query.templateModule.mapRecipe(id)
    const recipe = t.toHuman()
    recipes.push({
      ...recipe,
      key: id,
      id,
    })
  }

  return recipes
}

async function recipeTurnOn(id) {
  // const ret = await api.tx.templateModule.turnOnRecipe(0)
  await api.tx.templateModule.turnOnRecipe(id).signAndSend(Alice, ({ events = [], status }) => {
    if (status.isFinalized)
      console.log('Success', status.asFinalized.toHex())

    else
      console.log(`Status of transfer: ${status.type}`)

    events.forEach(({ phase, event: { data, method, section } }) => {
      console.log(`${phase.toString()} : ${section}.${method} ${data.toString()}`)
    })
  })
}

async function recipeTurnOff(id) {
  // const ret = await api.tx.templateModule.turnOnRecipe(0)
  await api.tx.templateModule.turnOffRecipe(id).signAndSend(Alice, ({ events = [], status }) => {
    if (status.isFinalized)
      console.log('Success', status.asFinalized.toHex())

    else
      console.log(`Status of transfer: ${status.type}`)

    events.forEach(({ phase, event: { data, method, section } }) => {
      console.log(`${phase.toString()} : ${section}.${method} ${data.toString()}`)
    })
  })
}

export {
  getChainInfo,
  transfer,
  createTrigger,
  getTriggers,
  createAction,
  getActions,
  createRecipe,
  getRecipes,
  recipeTurnOn,
  recipeTurnOff,
}
