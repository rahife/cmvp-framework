test.registerHelper("Promise", function() {
    "use strict";

    var Q = app.getFunction('q');

    function Fake (result, error) {
        this.result = result;
        this.error = error;
    }

    Fake.newInstance = function (ok, error) {
        return new Fake(ok, error);
    };

    Fake.prototype.then = function (fOk, fError) {
        if (!this.error) {
            try {
                return this._thenOk(fOk);
            } catch (e) {
                this.error = e;
            }
        }
        return fError ? this.fail(fError) : this;
    };

    Fake.prototype._isPromise = function (promise) {
        return typeof promise === 'object' && (
            promise.constructor === Fake ||
            promise.constructor === Q);
    };

    Fake.prototype._thenOk = function (fOk) {
        var newResult = fOk(this.result);
        if (this._isPromise(newResult)) {
            return newResult;
        } else if (newResult) {
            this.result = newResult;
        }
        return this;
    };

    Fake.prototype.fail = function (fError) {
        try {
            this.error = fError(this.error);
        } catch (e) {
            this.error = e;
        }
        return this;
    };

    Fake.prototype.done = function () {
        if (!this.error) {
            return;
        }
        if (this.error instanceof Error) {
            throw this.error;
        }
        throw new Error(this.error);
    };

    Fake.prototype.catch = Fake.prototype.fail;

    Fake.prototype.getActualResult = function () {
        if (this.error) {
            throw this.error;
        }
        return this.result;
    };

    Fake.prototype.getActualError = function () {
        if (!this.error) {
            throw new Error("error is not registered!");
        }
        return this.error;
    };

    function makeExerciseFake (result, error) {
        return function () {
            return Fake.newInstance(result, error);
        }
    }

    return {
        fake: Fake.newInstance,
        makeExerciseFake: makeExerciseFake,
        exerciseFakeFail: makeExerciseFake(undefined, new Error("exerciseFakeFail error!")),
        exerciseFakeOk:   makeExerciseFake("exerciseFakeOk result!"),
        Q: Q
    }

});