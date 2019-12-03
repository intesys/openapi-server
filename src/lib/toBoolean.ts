export default function toBoolean(input: any): boolean {
  switch (input) {
    case "false":
    case "False":
    case "FALSE":
    case "no":
    case "No":
    case "NO":
    case "0":
    case 0:
    case false:
      return false;
    default:
      return true;
  }
}
// fixes boolean configs
export const fixBooleans = (input: Record<string, any>, booleans: string[]): Record<string, any> => {
  const output = { ...input };
  booleans.forEach(_var => {
    if (input[_var]) {
      output[_var] = toBoolean(input[_var]);
    }
  });
  return output;
};
