import {
  BASE_URL,
  COUNTERS_ENDPOINT,
  LOGS_ENDPOINT,
  LOG_SEVERITY,
  SUBSCRIPTION_HEADER_KEY,
  TIMERS_ENDPOINT,
  TRACE_KEY,
} from './constants'

class Logger {
  constructor(apiKey: string) {
    this.key = apiKey
    this.headers = new Headers()
    this.headers.set(SUBSCRIPTION_HEADER_KEY, this.key)
    this.headers.set(TRACE_KEY, true.toString())
    this.headers.set('Content-Type', 'application/json')
  }

  key: string
  headers: HeadersInit

  logMessage = async (payload: MessagePayload) => {
    const loggerUrl = BASE_URL + LOGS_ENDPOINT
    return await fetch(loggerUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        ServiceName: payload.serviceName,
        Environment: payload.environment,
        TimeStamp: payload.timestamp,
        Severity: payload.severity,
        FunctionName: payload.functionName,
        Exception: payload.exception,
        Message: payload.message,
        CorrelationID: payload.correlationId,
      }),
    }).catch((err) => {
      console.log(err)
      this.logMessage({
        serviceName: payload.serviceName,
        environment: payload.environment,
        timestamp: new Date().toISOString(),
        severity: LOG_SEVERITY.ERROR,
        functionName: 'logMessage',
        exception: err.stack,
        message: err.message,
        correlationId: payload.correlationId,
      })
    })
  }

  logCounter = async (payload: CounterPayload) => {
    const loggerUrl = BASE_URL + COUNTERS_ENDPOINT
    return await fetch(loggerUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        ServiceName: payload.serviceName,
        Environment: payload.environment,
        Label: payload.label,
        Metadata: payload.metadata,
      }),
    }).catch((err) => {
      console.log(err)
      this.logMessage({
        serviceName: payload.serviceName,
        environment: payload.environment,
        timestamp: new Date().toISOString(),
        severity: LOG_SEVERITY.ERROR,
        functionName: 'logCounter',
        exception: err.stack,
        message: err.message,
        correlationId: undefined,
      })
    })
  }

  logTimer = async (payload: TimerPayload) => {
    const loggerUrl = BASE_URL + TIMERS_ENDPOINT
    return await fetch(loggerUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        ServiceName: payload.serviceName,
        Environment: payload.environment,
        Label: payload.label,
        Duration: payload.duration,
      }),
    }).catch((err) => {
      console.log(err)
      this.logMessage({
        serviceName: payload.serviceName,
        environment: payload.environment,
        timestamp: new Date().toISOString(),
        severity: LOG_SEVERITY.ERROR,
        functionName: 'logTimer',
        exception: err.stack,
        message: err.message,
        correlationId: undefined,
      })
    })
  }
}

export default Logger
