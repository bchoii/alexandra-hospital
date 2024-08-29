export const sitename_ = (host: string): string =>
  ({
    "ah.bchoii.com": "Aleandra Hospital",
  })[host] || host;
