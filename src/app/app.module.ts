import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { Http, HttpModule } from '@angular/http';
import {  HttpClientModule } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingsProvider } from '../providers/settings/settings';
import { WordPressProvider } from '../providers/word-press/word-press';
import { WpApiModule, WpApiLoader, WpApiStaticLoader} from 'wp-api-angular'
import { TruncateModule } from '@yellowspot/ng-truncate';

export function WpApiLoaderFactory(http) {
    return new WpApiStaticLoader(http, 'https://coinpedia.org/wp-json/');
}
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TruncateModule,
    IonicSwipeAllModule,
    WpApiModule.forRoot({
            provide: WpApiLoader,
            useFactory: (WpApiLoaderFactory),
            deps: [Http]
        }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingsProvider,
    WordPressProvider
  ]
})
export class AppModule {}
