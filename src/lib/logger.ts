import {
  BASE_URL,
  COUNTERS_ENDPOINT,
  LOGS_ENDPOINT,
  TIMERS_ENDPOINT,
} from "./constants";
import { ConsoleTransport, MonitoringAPITransport } from "./transports";
import { Guid } from "guid-typescript";

/**
 * DEPRECATED: will be removed once versioning is handled
 */
class Logger {
  transports: ILoggingTransport[];
  private sessionId: Guid;

  constructor(
    apiKey: string,
    sessionId: Guid = Guid.create(),
    useConsoleTransport: boolean = false
  ) {
    this.sessionId = sessionId;
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
    if (payload.metadata) {
      if (payload.metadata["address"]) {
        payload.metadata["address"] = this.redactAddress(
          payload.metadata["address"]
        );
      }
      payload.metadata["sessionId"] = this.sessionId;
    } else {
      payload.metadata = {
        sessionId: this.sessionId,
      };
    }

    this.transports.forEach((transport) => {
      transport.logCounterAsync(payload);
    });
  };

  logTimer = (payload: TimerPayload) => {
    this.transports.forEach((transport) => {
      transport.logTimerAsync(payload);
    });
  };

  //Returns a formatted address where first and last 4 chars are preserved
  //Centre of address is redacted
  private redactAddress = (address: string): string => {
    return address.replace("(w{6})(w{32})(w{6})", "$1******$3");
  };
}

export default Logger;
