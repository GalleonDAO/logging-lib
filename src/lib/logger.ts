import {
  BASE_URL,
  COUNTERS_ENDPOINT,
  LOGS_ENDPOINT,
  SUBSCRIPTION_HEADER_KEY,
  TIMERS_ENDPOINT,
  TRACE_KEY,
} from './constants'
import { ConsoleTransport, MonitoringAPITransport } from './transports'

class Logger {
  constructor(apiKey: string, useConsoleTransport: boolean = false) {
    this.key = apiKey
    this.headers = new Headers()
    this.headers.set(SUBSCRIPTION_HEADER_KEY, this.key)
    this.headers.set(TRACE_KEY, true.toString())
    this.headers.set('Content-Type', 'application/json')

    this.transports.push(new MonitoringAPITransport({
      loggerUrl: BASE_URL,
      logsEndpoint: LOGS_ENDPOINT,
      countersEndpoint: COUNTERS_ENDPOINT,
      timersEndpoint: TIMERS_ENDPOINT,
      headers: this.headers
    }));

    if(useConsoleTransport)
      this.transports.push(new ConsoleTransport());
  }

  key: string
  headers: HeadersInit
  transports: ILoggingTransport[]

  logMessage = (payload: MessagePayload) => {    
    this.transports.forEach(transport => {
      transport.logMessageAsync(payload);
    });
  }

  logCounter = (payload: CounterPayload) => {
    this.transports.forEach(transport => {
      transport.logCounterAsync(payload);
    });
  }

  logTimer = (payload: TimerPayload) => {
    this.transports.forEach(transport => {
      transport.logTimerAsync(payload);
    });
  }
}

export default Logger
