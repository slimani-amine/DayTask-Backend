import client from 'prom-client';
export declare const restResponseTimeHistogram: client.Histogram<"method" | "route" | "status_code">;
export declare const databaseResponseTimeHistogram: client.Histogram<"operation" | "success">;
export declare function startMetricsServer(): void;
