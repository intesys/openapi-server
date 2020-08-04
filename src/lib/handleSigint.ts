/**
 * Ensures just one SIGINT listener is active
 */

import { Server } from "net";
import { print } from "./log";

let unregisterSigint: () => void;

export default (server: Server): void => {
  if (unregisterSigint) {
    unregisterSigint();
  }

  unregisterSigint = handleSigint(server);
};

const handleSigint = (server: Server): (() => void) => {
  const onExit = function () {
    print("Bye");
    server.close(() => {
      process.exit(0);
    });
  };

  process.on("SIGINT", onExit);

  return function unregisterSigint() {
    process.off("SIGINT", onExit);
  };
};
