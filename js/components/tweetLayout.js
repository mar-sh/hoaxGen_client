Vue.component("twitter-layout",{
    data(){
        return {
            page_following:true,
            page_unfollow:false,
        }
    },
    props: [
        'tweetobj'
    ],
    created(){
        console.log(this.tweetobj)
    },
    methods: {
        saveAsPNG: function(){
            let tweet = document.querySelector("#twitter")
            this.sendConvertedHtml(tweet)
        },
        sendConvertedHtml(tweet) {
            html2canvas(tweet)
              .then((canvas) => {
          
                const dataUri = canvas.toDataURL();
          
                return new Promise((resolve) => {
                  this.dataURLtoBlob(dataUri, (blob) => {
                    resolve(blob);
                  });
                }); 
              })
              .then((blob) => {
                const data = new FormData();
                
                data.append('file', blob);
                return axios({
                  method: 'POST',
                  url: 'http://localhost:3000/hoaxes',
                  data,
                  headers: {
                    token: localStorage.getItem("token"),
                  }
                });
              })
              .then(({ data }) => {
                    this.imageUrl = data.hoax.url
                    Swal.fire({
                        title: 'Share your Hoax!',
                        text: "share",
                        type: null,
                        imageUrl: this.imageUrl,
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                        html: 
                            ` <a id="facebook-share" href="https://www.facebook.com/sharer/sharer.php?u=${this.imageUrl}" target="_blank" style="background-color: #3b5998; color: white; margin: 5px; padding: 10px 20px; border-radius: 5px;" >Facebook</a>
                            <a id="twitter-share" class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Tweet+ini+nyata&amp;url=${this.imageUrl}" target="_blank" style="background-color: #1da1f2; color: white; margin: 5px; padding: 10px 20px; border-radius: 5px;"></i>Twitter</a>`,
                        animation: false,
                    })
                // console.log(time);
              })
              .catch((error) => {
                console.log(error);
              });   
        },
        dataURLtoBlob( dataUrl, callback ) {
            const req = new XMLHttpRequest;
        
            req.open( 'GET', dataUrl );
            req.responseType = 'arraybuffer'; 
            req.onload = function fileLoaded(event) {
                const mime = this.getResponseHeader('content-type');
            callback( new Blob([this.response], { type:mime }));
            };
            req.send();  
        },
        dateFormat(value){
            let newDate = new Date(value).toDateString()
            return newDate
        },
        change(newComponent){
            console.log(newComponent)
            this.componentName = newComponent 
        },
        numconvert(input){
            let result = 0
            if (input > 1e9){
                result = Math.floor(input / 1e9)
                return `${result}B`
            }else
            if (input > 1e6){
                result = Math.floor(input / 1e6)
                return `${result}M`
            }else
            if(input > 1000){
                result = Math.floor(input / 1000)
                return `${result}K`    
            }else{
                return input
            }
        }
    },
    template: 
    `<div>
        <div class="container d-flex justify-content-center" style="flex-direction: row">
            <div class="col-11">
                <div class="row">
                    <div class="card shadow" id="twitter">
                        <div class="row tweet-head align-items-center">
                            <div class="col-sm-2 profile-container">
                                <img id="image-preview" class="profile-picture center-block" src="./res/default_profile.png">
                            </div>
                            <div class="col">
                                <h5 style="margin-bottom: 0">{{ tweetobj.name }}</h5>
                                @{{ tweetobj.user_name }}
                            </div>
                            <div class="col follow-container">
                            <button 
                                v-if="page_following"
                                @click.prevent="page_unfollow=true, page_following=false"
                                class="follow-btn">follow
                            </button>
                            <button 
                                v-if="page_unfollow"
                                @click="page_following=true, page_unfollow=false"
                                class="follow-btn following">following
                            </button>
                            <i class="fa fa-chevron-down" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="row tweet-content">
                            <p>{{ tweetobj.tweet_content }}</p>
                            <div class="tweet-date">
                                {{ tweetobj.time }} - {{ dateFormat(tweetobj.date) }}
                            </div>
                        </div>
                        <div class="row tweet-like-container border-top border-bottom align-items-center" style="margin: 0 10px 10px 10px; padding: 10px 0">
                            <div class="tweet-like">
                                <ul>
                                    <li><span>{{ tweetobj.retweet }}</span> Retweets</li>
                                    <li><span>{{ tweetobj.likes }}</span> Likes</li>
                                </ul>
                            </div>
                        </div>

                        <div class="row tweet-actions">
                            <ul>
                                <li><a href="#"><img src="./res/twitter-icons/twitter-reply-outline.svg" alt="" class="src"> {{ numconvert(tweetobj.replies) }} </a></li>
                                <li><a href="#"><img src="./res/twitter-icons/twitter-retweet.svg" alt="" class="src"> {{ numconvert(tweetobj.retweet) }} </a></li>
                                <li><a href="#"><img src="./res/twitter-icons/twitter-like-outline.svg" alt="" class="src"> {{ numconvert(tweetobj.likes) }}</a></li>
                                <li><a href="#"><img src="./res/twitter-icons/twitter-message.svg" alt="" class="src"></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="col" style="text-align: center">
                <input id="generate-hoax" type="button" class="btn btn-success" value="Generate Hoax" @click="saveAsPNG"/>
                <div id="img-out">
                    
                </div>
                </div>

            </div>
        </div>
    </div>`
})