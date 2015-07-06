/**
 * Created by jose on 1/04/15.
 */
define(function (require) {
    "use strict";

    var $scope = require('test-helpers/Scope').getStub();

    return {
        exerciseCreate : function (View) {
            var instance = View.newInstance({$scope: $scope});
            expect(instance).toBeDefined();
            return instance;
        },
        testShowCallsPresenterShow: function (getSut) {
            describe("show", function () {
                describe("when new instance is used", function () {
                    it("should let the presenter do the bindings", function () {
                        var sut = getSut();
                        spyOn(sut.di.presenter, 'show');
                        sut.show();
                        expect(sut.di.presenter.show).toHaveBeenCalled();
                    });
                });
            });
        },
        testShowMethodsAreDefined: function (getSut) {
            var methodProvider = ["show", "showError"];
            methodProvider.forEach(function (method) {
                describe(method, function () {
                    it("should be the same as the base view", function () {
                        var sut = getSut();
                        expect(sut[method]).toBeDefined();
                    });
                });
            });
        }
    };
});