export default class EventEmitter {
  static eventObject: any

  public events: any

  constructor() {
    this.init()
  }

  init() {
    if (!EventEmitter.eventObject) {
      EventEmitter.eventObject = Object.create(null)
      this.events = EventEmitter.eventObject
    }
  }

  on(target: string, handle: (value: any) => void) {
    this.events[target] = this.events[target] || []
    this.events[target].push(handle)
    return this
  }

  off(target: string, handle: (value: any) => void) {
    this.events[target] = this.events[target].filter((func: () => void) => func !== handle)
    return this
  }

  emit(target: string, ...args: any) {
    console.log(args)
    this.events[target].forEach((handle: () => void) => {
      handle.apply(this, args)
    })
    return this
  }

  once(target: string, handle: (value: any) => void) {
    const wrapper = (...args: any) => {
      this.off(target, wrapper)
      handle.apply(this, args)
    }
    this.on(target, wrapper)
    return this
  }
}

