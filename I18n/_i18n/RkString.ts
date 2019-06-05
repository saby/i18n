const RkString = function RkString(value: string, resolver: Function): void {
   Object.defineProperties(this, {
      translatedValue: {
         enumerable: true,
         get(): string {
            return String(resolver(value) || value);
         }
      },
      length: {
         enumerable: true,
         get(): number {
            return this.translatedValue.length;
         }
      }
   });
};

RkString.prototype = Object.create(String.prototype);

RkString.prototype.toString = RkString.prototype.toJSON = RkString.prototype.valueOf = function(): string {
   return this.translatedValue;
};

export default RkString;
