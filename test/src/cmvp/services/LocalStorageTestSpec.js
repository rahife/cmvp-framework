/**
 * Created by jose on 4/03/15.
 */
define (function (require) {
    describe("cmvp/LocalStorage", function () {
        var LocalStorage = require("cmvp/services/LocalStorage");

        var sut;
        beforeEach(function () {
            window.localStorage.clear();
            sut = LocalStorage.newInstance();
        });

        var validValue = "valid_value";
        var validKey = "valid_key";

        it("should return the stored value", function () {
            var expected = validValue;

            sut.set(validKey, expected);
            var actual = sut.get(validKey);

            expect(actual).toBe(expected);
        });

        it("should return undefined when retrieving non stored key", function () {
            var actual = sut.get(validKey);
            expect(actual).toBe(undefined);
        });
    });
});

