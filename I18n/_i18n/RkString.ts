/// <amd-module name="I18n/_i18n/RkString" />
const RkString = function RkString(value, resolver) {
   Object.defineProperties(this, {
      translatedValue: {
         enumerable: true,
         get() {
            return String(resolver(value) || value);
         }
      },
      length: {
         enumerable: true,
         get() {
            return this.translatedValue.length;
         }
      }
   });
};

RkString.prototype = Object.create(String.prototype);

RkString.prototype.toString = RkString.prototype.toJSON = RkString.prototype.valueOf = function () {
   return this.translatedValue;
};

export default RkString;
