interface TimerPayload {
  serviceName: string;
  environment: string;
  label: string;
  duration: number;
}

interface MessagePayload {
  serviceName: string;
  environment: string;
  timestamp: string;
  severity: string;
  functionName: string;
  exception: string;
  message: string;
  correlationId?: string;
}

interface CounterPayload {
  serviceName: string;
  environment: string;
  label: string;
  metadata?: object;
}

interface ILoggingTransport {
  logMessageAsync(payload: MessagePayload): any;
  logCounterAsync(payload: CounterPayload): any;
  logTimerAsync(payload: TimerPayload): any;
}

interface MonitoringOptions {
  apiKey: string;
  loggerUrl: string;
  logsEndpoint: string;
  countersEndpoint: string;
  timersEndpoint: string;
}
