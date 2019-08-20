var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { SettingsProvider } from '../../providers/settings/settings';
import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, settings) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.settings = settings;
        this.settings.getActiveTheme().subscribe(function (val) { return _this.selectedTheme = val; });
    }
    HomePage.prototype.toggleAppTheme = function () {
        if (this.selectedTheme === 'dark-theme') {
            this.settings.setActiveTheme('light-theme');
        }
        else {
            this.settings.setActiveTheme('dark-theme');
        }
    };
    HomePage.prototype.swipeAll = function (event) {
        console.log('Swipe All', event);
    };
    HomePage.prototype.swipeLeft = function (event) {
        console.log('Swipe Left', event);
    };
    HomePage.prototype.swipeRight = function (event) {
        console.log('Swipe Right', event);
        this.sliderOne.slideTo(0, 500);
    };
    HomePage.prototype.swipeUp = function (event) {
        console.log('Swipe Up', event);
    };
    HomePage.prototype.swipeDown = function (event) {
        console.log('Swipe Down', event);
    };
    __decorate([
        ViewChild('sliderOne'),
        __metadata("design:type", Slides)
    ], HomePage.prototype, "sliderOne", void 0);
    __decorate([
        ViewChild('sliderTwo'),
        __metadata("design:type", Slides)
    ], HomePage.prototype, "sliderTwo", void 0);
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            SettingsProvider])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map