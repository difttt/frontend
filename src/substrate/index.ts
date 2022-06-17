import { ApiPromise, WsProvider } from '@polkadot/api'
import { Keyring } from '@polkadot/keyring'

// 如没有运行 node-template，也可试连到波卡主网上： `wss://rpc.polkadot.io`.
// const provider = new WsProvider('ws://127.0.0.1:9944')
// const provider = new WsProvider('wss://difttt.dmb.top/ws')
const provider = new WsProvider('ws://39.108.194.248:9944')
const api = await ApiPromise.create({ provider })

// 获取Alice用户地址
function getUserAddress(user: string) {
  const keyring = new Keyring({ type: 'sr25519' })
  const alice = keyring.addFromUri(`//${user}`)
  return alice.address
}
const AliceAddress = getUserAddress('Alice')

async function getChainInfo() {
  // 1. 查看本条链的信息
  const [chain, nodeName, nodeVersion, metadata] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
    api.rpc.state.getMetadata(),
  ])

  console.log(
    `You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`,
  )

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

async function createTrigger() {
  const Timer = [1655285553867, 2000]
  const trigger = await api.tx.templateModule.createTriger({
    Timer,
  })
  const hash = await trigger.signAndSend(AliceAddress)
  return hash
}

async function getTrigger() {
  const trigger = await api.query.templateModule.trigers(AliceAddress)

  return trigger
}

async function createAction() {
  const action = await api.tx.templateModule.createAction({
    Timer: [1655285553867, 2000],
  })
  const hash = await action.signAndSend(AliceAddress)
  return hash
}

async function getAction() {
  const action = await api.query.templateModule.actions(AliceAddress)
  return action
}

async function createRecipe() {
  const recipe = await api.tx.templateModule.createRecipe({
    Timer: [1655285553867, 2000],
  })
  const hash = await recipe.signAndSend(AliceAddress)
  return hash
}

export {
  getChainInfo,
  transfer,
  createTrigger,
  getTrigger,
  createAction,
  getAction,
  createRecipe,
}
