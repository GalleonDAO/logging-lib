import {
  BASE_URL,
  COUNTERS_ENDPOINT,
  LOGS_ENDPOINT,
  LOG_SEVERITY,
  TIMERS_ENDPOINT,
} from "./constants";
import { ConsoleTransport, MonitoringAPITransport } from "./transports";

class LoggerV2 {
  //Added for now to check for duplicate init
  azureLoggingEnabled: boolean = false;
  consoleLoggingEnabled: boolean = false;

  constructor() {
    this.transports = [];
  }

  addAzureLogging = (options: {
    apiKey: string;
    loggerUrl?: string;
    logsEndpoint?: string;
    countersEndpoint?: string;
    timersEndpoint?: string;
  }) => {
    if (this.azureLoggingEnabled) {
      this.logMessage({
        serviceName: "LOGGING_LIB",
        environment: process.env.NODE_ENV ?? "N/A",
        timestamp: new Date().toISOString(),
        severity: LOG_SEVERITY.WARN,
        functionName: this.addAzureLogging.name,
        exception: "none",
        message:
          "azureLogger is already enabled, ensure multiple azure loggers are desired",
      });
    }
    this.transports.push(
      new MonitoringAPITransport({
        apiKey: options.apiKey,
        loggerUrl: options.loggerUrl ?? BASE_URL,
        logsEndpoint: options.logsEndpoint ?? LOGS_ENDPOINT,
        countersEndpoint: options.countersEndpoint ?? COUNTERS_ENDPOINT,
        timersEndpoint: options.timersEndpoint ?? TIMERS_ENDPOINT,
      })
    );
    this.azureLoggingEnabled = true;
  };

  addConsoleLogging = () => {
    if (this.consoleLoggingEnabled) {
      this.logMessage({
        serviceName: "LOGGING_LIB",
        environment: process.env.NODE_ENV ?? "N/A",
        timestamp: new Date().toISOString(),
        severity: LOG_SEVERITY.ERROR,
        functionName: this.addAzureLogging.name,
        exception: "none",
        message:
          "consoleLogger is already enabled, only one logger should be initialised",
      });
      return; //No reason to add multiple consoles
    }

    this.transports.push(new ConsoleTransport());
    this.consoleLoggingEnabled = true;
  };

  headers: HeadersInit;
  transports: ILoggingTransport[];

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

export default LoggerV2;
