class Utils {
  public testRegex(value: string, regexp: RegExp): boolean {
    return regexp.test(value);
  }

  public isArrayEquals(first: any[], second: any[]): boolean {
    return Array.isArray(first) &&
      Array.isArray(second) &&
      first.length === second.length &&
      first.every((val, index) => val === second[index]);
  }
}

export default new Utils();
