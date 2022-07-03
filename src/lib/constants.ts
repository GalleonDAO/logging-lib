export const LOG_SEVERITY = {
  DEBUG: "Debug",
  INFO: "Info",
  WARN: "Warn",
  ERROR: "Error",
  FATAL: "Fatal",
};

export const KNOWN_SERVICES = {
  GALLEON_UI: "GALLEON_UI",
  GALLEON_DAPP: "GALLEON_DAPP",
  CURSED_PIRATES_UI: "CURSED_PIRATES_UI",
  FDC_UI: "FDC_UI",
  POWDER_MONKEY: "POWDER_MONKEY",
};

export const KNOWN_LABELS = {
  VISIT: "VISIT",
  SUBMIT_PITCH: "SUBMIT PITCH",
  CONTACT_US: "CONTACT US",
  WALLET_CONNECT: "WALLET CONNECT",
  NETWORK_CHANGE: "NETWORK CHANGE",
  PRODUCT_SELECT: "PRODUCT SELECT",
  DOWNLOAD_CSV: "DOWNLOAD CSV",
  QUOTE_TIMER: "QUOTE TIMER",
  QUOTE_GENERATED: "QUOTE GENERATED",
  TRADE_TRANSACTION_SENT: "TRADE TRANSACTION SENT",
  NAVIGATED: "NAVIGATED",
};

export const SUBSCRIPTION_HEADER_KEY = "Ocp-Apim-Subscription-Key";
export const TRACE_KEY = "Ocp-Apim-Trace";
export const BASE_URL = "https://galleon-apim-us.azure-api.net/Monitoring/V1"; //TODO: this shouldn't stay here
export const LOGS_ENDPOINT = "/Logs";
export const COUNTERS_ENDPOINT = "/Metrics/Counters";
export const TIMERS_ENDPOINT = "/Metrics/Timers";
