export interface iStrategy {
    id: number,
    target: string,
    condition: string,
    value: number,
    action: string,
    max_exposure: number,
    max_trade_notional: number,
    time_delay: number
    synth_asset_name: string,
    strategy_name: string,
    synthetic_asset_id: number,
    user_id: number,
    active?: boolean
  }

export interface iLeg {

}

export interface iTrade {
    trade_time: number,
    trade_time_display: string,
    strategy_name: string,
    asset_name: string,
    trade_action: string,
    exec_price: number,
    exec_qty: number,
    target_bid: number,
    target_ask: number
}

export interface properties {
  refresh_on: boolean
}

export interface exAsset {
  id: number
  symbol: string,
  descr: string,
  exchange_name: string
}

export interface synthAsset {
  id: number,
  descr: string
  legs?: synthLeg[]
}

export interface synthLeg {
  descr: string,
  weight: number,
  symbol: string,
  exchange_name: string
}
