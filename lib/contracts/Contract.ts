import { Input } from "../types";


export class Contract {
  methodStrategies: { [key: string]: Function };
  constructor() {
    this.methodStrategies = {}
  }

  start(input: Input) {
    const { accountInfo, contractInput } = input
    return this.executeMethod(accountInfo, contractInput)
  }

  executeMethod(accountInfo: any, contractInput: { contractFn: string }) {
    const { contractFn } = contractInput
    const strategy = this.methodStrategies[contractFn]

    if (strategy) {
      return strategy(accountInfo, contractInput)
    }

    throw new Error(`Unknown method: ${contractFn}`)
  }

  addOrExtendMethodStrategy(methodName: string, newStrategyFn: Function, extend: boolean = false) {
    if (extend && this.methodStrategies[methodName]) {
      const originalStrategy = this.methodStrategies[methodName]
      this.methodStrategies[methodName] = (accountInfo: Input['accountInfo'], contractInput: Input['contractInput']) => {
        const originalResult = originalStrategy(accountInfo, contractInput)
        return newStrategyFn(accountInfo, contractInput, originalResult)
      }
    } else {
      this.methodStrategies[methodName] = newStrategyFn
    }
  }
}