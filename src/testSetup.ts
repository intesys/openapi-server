// Polyfill TextEncoder/TextDecoder for Jest when not provided by Node runtime
import { TextDecoder, TextEncoder } from "util";

if (typeof (global as any).TextEncoder === "undefined") {
  (global as any).TextEncoder = TextEncoder;
}

if (typeof (global as any).TextDecoder === "undefined") {
  (global as any).TextDecoder = TextDecoder as any;
}
