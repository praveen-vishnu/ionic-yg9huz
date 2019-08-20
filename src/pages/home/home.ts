import { SettingsProvider } from '../../providers/settings/settings';
import { Component , ViewChild} from '@angular/core';
import { NavController,Slides, ToastController,LoadingController } from 'ionic-angular';
import { WordPressProvider, Post } from '../../providers/word-press/word-press';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('sliderOne') sliderOne: Slides;
  @ViewChild('sliderTwo') sliderTwo: Slides;
  selectedTheme: String;
  browser;
  titleBrowser:any;
  showHeader:boolean = false;
  browserURL:SafeUrl;
  shareLink:any;
  page: number = 1
  liked : boolean =false;
  loadingPosts=false;
  posts: any = [];
  categories:any = [];
  constructor(
    public loadingCtrl:LoadingController,
    private sanitizer: DomSanitizer,
    public wpProvider: WordPressProvider,
    public navCtrl: NavController,
    private socialSharing: SocialSharing,
    private toastCtrl: ToastController,
    private settings: SettingsProvider) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    // this.loadPosts();
  }

gotoSettings(){
  console.log('gotoSettings fn')
this.navCtrl.push('SettingsPage')
}
loadMorePosts(){
  this.page = +1;
  // this.ionViewDidLoad();
}
share(){
  this.socialSharing.share("message", "subject", 'https://via.placeholder.com/300x250.png?text=Image+Loading', "url")
    .then(() => {

    }).catch(() => {

  });
}

gotoFirstSlide(){
  this.sliderTwo.slideTo(0,500);
}
 ionViewDidLoad() {
    this.wpProvider.getCategory().subscribe(cats => {
    this.categories = cats
 
    });
        let loader = this.loadingCtrl.create()
        console.log(this.page)
        if (this.page < 2) {loader.present()}
        this.wpProvider.getPostCategory('37249', this.page).subscribe(data => {
            loader.dismiss()
            for (let i = 0; i < data.length; i++) {
                let image
                if (data[i]['_embedded']['wp:featuredmedia'] != undefined) {
                    image = data[i]['_embedded']['wp:featuredmedia'][0].source_url
                } else {
                    image = 'assets/imgs/not-available.jpg'
                }
                this.posts.push({
                    title: data[i].title.rendered,
                    date: data[i].date,
                    image: image,
                    link:data[i].link,
                    content: data[i].content.rendered,
                    author: data[i]._embedded.author[0].name,
                    avatar: data[i]._embedded.author[0].avatar_urls['48']
                })
            }

        },  error => {
            console.log(error)
            loader.dismiss()
        })
    }

  async loadPosts(){
     this.posts = await this.wpProvider.getPosts();
     this.posts.subscribe(res=>{
       console.log(res)
       if(res){
         this.loadingPosts = true;
     }
      })
     
   
  }
  
  slideChanged(e){
    console.log(e)
    if(this.sliderTwo.isBeginning()){
   //   this.presentToast('feeds up to date');
    }
  }

  gotoFeed(){

        this.sliderOne.slideTo(1,500);   
  }

getUserImage(id: number) {
        return this.wpProvider.getUserImage(id);
    }

    getUserName(id: number) {
        return this.wpProvider.getUserName(id);
    }

  toggleAppTheme() {
    if (this.selectedTheme === 'dark-theme') {
      this.settings.setActiveTheme('light-theme');
    } else {
      this.settings.setActiveTheme('dark-theme');
    }
  }

   swipeAll(event: any): any {
        console.log('Swipe All', event);
    }

    swipeLeft(event: any,post): any {
        console.log(post.title);
        this.showHeader = false;
        this.titleBrowser = post.title;
        this.browserURL = this.sanitizer.bypassSecurityTrustResourceUrl(post.link);
        console.log(this.browserURL);
        this.sliderOne.slideTo(1,500);  
    }

    swipeRight(event: any): any {
        console.log('Swipe Right', event);
        this.sliderOne.slideTo(0,500);  
    }

    swipeUp(event: any,i): any {
        console.log('Swipe Up', event);

    }

    swipeEvent($e,i) {
        console.log($e.direction,i);
         if($e.direction == 16 && i == 0){
        }
    }
    swipeDown(event: any,i?): any {
        console.log('Swipe Down', event); 
       
    }

     doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}


closeBrowser(){
  this.sliderOne.slideTo(0,500)
  this.browserURL = this.sanitizer.bypassSecurityTrustResourceUrl('');
}

like(){
this.liked = !this.liked;
}
}
