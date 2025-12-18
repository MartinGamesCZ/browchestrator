export class Fmt {
  static f(template: string, args: Record<string, any>) {
    return template.replace(/{([^}]+)}/g, (_, k) => {
      const [key, length, padchar] = k.split(":");

      if (!key) return "";

      const v = args[key];
      if (!length || !padchar) return v;

      return (v.toString() as string).padEnd(length, padchar);
    });
  }
}
