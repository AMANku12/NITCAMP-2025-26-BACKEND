// transports/sqlTransport.ts
import Transport from "winston-transport";
import Log from "../models/logs.model";

interface SQLTransportOptions {
  level?: string;
}

class SQLTransport extends Transport {
  constructor(opts: SQLTransportOptions = {}) {
    super(opts);
  }

  async log(info: any, callback: () => void) {
    setImmediate(() => this.emit("logged", info));

    const { level, message, ...meta } = info;

    try {
      await Log.create({
        level,
        message,
        meta,
      });
    } catch (err) {
      console.error("SQL log transport failed:", err);
    }

    callback();
  }
}

export default SQLTransport;
