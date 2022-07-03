import {
  BASE_URL,
  COUNTERS_ENDPOINT,
  LOGS_ENDPOINT,
  TIMERS_ENDPOINT,
} from "./constants";
import { ConsoleTransport, MonitoringAPITransport } from "./transports";

/**
 * DEPRECATED: will be removed once versioning is handled
 */
class Logger {
  transports: ILoggingTransport[];

  constructor(apiKey: string, useConsoleTransport: boolean = false) {
    this.transports = [];

    this.transports.push(
      new MonitoringAPITransport({
        apiKey: apiKey,
        loggerUrl: BASE_URL,
        logsEndpoint: LOGS_ENDPOINT,
        countersEndpoint: COUNTERS_ENDPOINT,
        timersEndpoint: TIMERS_ENDPOINT,
      })
    );

    if (useConsoleTransport) this.transports.push(new ConsoleTransport());
  }

  logMessage = (payload: MessagePayload) => {
    this.transports.forEach((transport) => {
      transport.logMessageAsync(payload);
    });
  };

  logCounter = (payload: CounterPayload) => {
    this.transports.forEach((transport) => {
      transport.logCounterAsync(payload);
    });
  };

  logTimer = (payload: TimerPayload) => {
    this.transports.forEach((transport) => {
      transport.logTimerAsync(payload);
    });
  };
}

export default Logger;
