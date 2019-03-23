/**
 * Ensures just one SIGINT listener is active
 */

import { Server } from "net";
import { print } from "./log";

let unregisterSigint: Function;

export default (server: Server) => {
  if (unregisterSigint) {
    unregisterSigint();
  }

  unregisterSigint = handleSigint(server);
};

const handleSigint = (server: Server): Function => {
  const onExit = function() {
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
