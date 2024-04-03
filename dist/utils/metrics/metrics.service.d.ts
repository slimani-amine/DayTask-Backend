import client from 'prom-client';
export declare const restResponseTimeHistogram: client.Histogram<"method" | "route" | "status_code">;
export declare const databaseResponseTimeHistogram: client.Histogram<"success" | "operation">;
export declare function startMetricsServer(): void;
