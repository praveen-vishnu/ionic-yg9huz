import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { WpApiPosts, WpApiMedia, WpApiUsers, WpApiTerms } from 'wp-api-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';

export class Post {
    public media_url: Observable<string>;
    constructor(public authorId: number, public id: number, public title: string, public content: string,
                public excerpt: string, public date: string, public url: string, public mediaId?: number) { }
}

export class User {
    constructor(public id: number, public name: string, public userImageUrl: string) { }
}

/*
 Generated class for the WordPressProvider provider.
 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class WordPressProvider {

    users: User[];
    private base_url: string = 'https://coinpedia.org/wp-json/wp/v2/';    


    constructor(private loadingCtrl: LoadingController,public http:HttpClient,public wpApiTerms:WpApiTerms,public wpApiPosts: WpApiPosts, public wpApiMedia: WpApiMedia, public wpApiUsers: WpApiUsers) {

        /*
         Grab the list of users from WordPress so we can easily show an avatar for each user at the post list later.
         Otherwise, we would have to make the call to retrieve user information over and over, so this saves us some
         http calls.
         */

        this.wpApiUsers.getList()
            .map(res => res.json())
            .subscribe(data => {
                //console.log(data);
                this.users = [];
                for (let user of data) {
                    let oneUser = new User(user[ 'id' ], user[ 'name' ], user[ 'avatar_urls' ][ '96' ]);
                    this.users.push(oneUser);
                }
            })
    }

    /*
     To get a list of posts we use the getList function which will return as an array of objects. For each of those
     objects we create a new Post object, and to get the image of each post we get a bit freaky: We assign an Observable
     to the media_url property which will also use the wp-api and load the link to the image.
     */
    getPosts(): Observable<Post[]> {
        return this.wpApiPosts.getList()
            .map(res => res.json())
            .map(data => {
                var posts = [];
                console.log(data)
                for (let post of data) {
                    let onePost = new Post(post[ 'author' ], post[ 'id' ], post[ 'title' ][ 'rendered' ], post[ 'content' ][ 'rendered' ], post[ 'excerpt' ][ 'rendered' ], post[ 'date' ], post[ 'link' ], post[ 'featured_media' ]);
                    onePost.media_url = this.getMedia(onePost.mediaId);
                    posts.push(onePost);

                }
                return posts;
            });
    }

    getMedia(id: number): Observable<string> {
        return this.wpApiMedia.get(id)
            .map(res => res.json())
            .map(data => {
                return data[ 'source_url' ];
            });
    }

    getUserImage(userId: number) {
        for (let usr of this.users) {
            if (usr.id === userId) {
                return usr.userImageUrl;
            }
        }
    }

    getUserName(userId: number) {
        for (let usr of this.users) {
            if (usr.id === userId) {
                return usr.name;
            }
        }
    }


    getPostCategory(category, page): Observable<any> {
        return this.http.get(this.base_url + 'posts?_embed&per_page=20&page=' + page + '&categories=' + category)
    }

    search(key: Observable<string>, page) {
        return key.debounceTime(700).distinctUntilChanged().switchMap(
            val => this.searchPost(val, page)
        )
    }

    searchPost(key, page): Observable<any> {
        let loader = this.loadingCtrl.create()
        loader.present()
        let result = this.http.get(this.base_url + 'posts?_embed&per_page=20&page=' + page + '&search=' + key)
        if (result) {
            loader.dismiss()
            return result
        }
    }
    getCategory(): Observable<any> {
            return this.http.get(this.base_url + 'categories?orderby=count&order=desc&per_page=50&exclude=1&parent=37249')
        }
}