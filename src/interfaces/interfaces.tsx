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
    user_id: number
  }

export interface iLeg {

}

export interface iTrade {
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