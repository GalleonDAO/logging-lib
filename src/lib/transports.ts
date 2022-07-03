import { LOG_SEVERITY } from "./constants";

class ConsoleTransport implements ILoggingTransport {
  logMessageAsync(payload: MessagePayload) {
    console.log(`LOGGING MESSAGE: ${JSON.stringify(payload)}`);
  }
  logCounterAsync(payload: CounterPayload) {
    console.log(`LOGGING COUNTER: ${JSON.stringify(payload)}`);
  }
  logTimerAsync(payload: TimerPayload) {
    console.log(`LOGGING TIMER: ${JSON.stringify(payload)}`);
  }
}

class MonitoringAPITransport implements ILoggingTransport {
  options: MonitoringOptions;

  constructor(options: MonitoringOptions) {
    this.options = options;
  }

  async logMessageAsync(payload: MessagePayload) {
    const loggerUrl = this.options.loggerUrl + this.options.logsEndpoint;
    return await fetch(loggerUrl, {
      method: "POST",
      headers: this.options.headers,
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
      console.log(err, {
        serviceName: payload.serviceName,
        environment: payload.environment,
        timestamp: new Date().toISOString(),
        severity: LOG_SEVERITY.ERROR,
        functionName: "logMessage",
        exception: err.stack,
        message: err.message,
        correlationId: payload.correlationId,
      });
    });
  }
  async logCounterAsync(payload: CounterPayload) {
    const loggerUrl = this.options.loggerUrl + this.options.countersEndpoint;
    return await fetch(loggerUrl, {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
        ServiceName: payload.serviceName,
        Environment: payload.environment,
        Label: payload.label,
        Metadata: payload.metadata,
      }),
    }).catch((err) => {
      console.log(err);
      this.logMessageAsync({
        serviceName: payload.serviceName,
        environment: payload.environment,
        timestamp: new Date().toISOString(),
        severity: LOG_SEVERITY.ERROR,
        functionName: "logCounter",
        exception: err.stack,
        message: err.message,
        correlationId: undefined,
      });
    });
  }
  async logTimerAsync(payload: TimerPayload) {
    const loggerUrl = this.options.loggerUrl + this.options.timersEndpoint;
    return await fetch(loggerUrl, {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
        ServiceName: payload.serviceName,
        Environment: payload.environment,
        Label: payload.label,
        Duration: payload.duration,
      }),
    }).catch((err) => {
      console.log(err);
      this.logMessageAsync({
        serviceName: payload.serviceName,
        environment: payload.environment,
        timestamp: new Date().toISOString(),
        severity: LOG_SEVERITY.ERROR,
        functionName: "logTimer",
        exception: err.stack,
        message: err.message,
        correlationId: undefined,
      });
    });
  }
}
export { MonitoringAPITransport, ConsoleTransport };
