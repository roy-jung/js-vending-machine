import Actions from './store/actions.js'
import Store from './store/index.js'

export const ErrorMsgs = {
  inventory_spaceBetween: '공백 불가',
  inventory_PriceMinimum: '최소금액은 100원',
  inventory_PriceLimit: '10원 이하 입력 불가',
  inventory_AmountMinimum: '수량은 1개 이상',
  charge_calculateError: '동전교환 후에도 잔액이 남은건 뭔가 문제가 있다는 뜻',
  store_initError: 'unable to initialize store',
}

export const enum Route {
  machineCharge = 'machineCharge',
  productInventory = 'productInventory',
  userPurchase = 'userPurchase',
}

export type InventoryItem = {
  name: string
  price: number
  amount: number
}

export type CoinKey = 'total' | 'q500' | 'q100' | 'q50' | 'q10'
export type Coins = { [key in CoinKey]: number }
export const CoinKeys: CoinKey[] = ['total', 'q500', 'q100', 'q50', 'q10']
export const CoinValues = Object.freeze([500, 100, 50, 10])

export type StateKey = 'route' | 'inventory' | 'coins' | 'charge'
export type State = {
  route: Route
  inventory: InventoryItem[]
  coins: Coins
  charge: number
}
export const StateKeys: StateKey[] = ['route', 'inventory', 'coins', 'charge']
export const InitialState: State = {
  route: Route.productInventory,
  inventory: [],
  coins: {
    total: 0,
    q500: 0,
    q100: 0,
    q50: 0,
    q10: 0,
  },
  charge: 0,
}

export type AnyObj = { [key: string]: any }
export type StrObj = { [key: string]: string }
export type Elem = HTMLElement | string

export type PartialState = Partial<State>

type Dispatch = {
  actionType: Actions
  data: AnyObj
}

export type DispatchEvent = CustomEvent & {
  detail: Dispatch
}

export type Dispatcher = (store: Store, data: AnyObj) => void
export type Worker = (actionType: keyof typeof Actions) => Dispatcher
export type ActionType = keyof typeof Actions