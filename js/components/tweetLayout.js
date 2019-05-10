Vue.component("twitter-layout",{
    data(){
        return {
            componentName: ""
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
            html2canvas(document.querySelector("#twitter"))
            .then(canvas => {
            var myImage = canvas.toDataURL();
            canvas.toBlob(function(blob) {
                var newImg = document.createElement('img'),
                    url = URL.createObjectURL(blob);
                newImg.onload = function() {
                  // no longer need to read the blob so it's revoked
                  URL.revokeObjectURL(url);
                };
                Canvas2Image.saveAsPNG(canvas)
                Swal.fire({
                    title: 'Sweet!',
                    text: 'Modal with a custom image.',
                    imageUrl: url,
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                    animation: false
                })
            })
        })
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
                            <component :is='tweetobj.componentName' @click="change"></component>
                            <i class="fa fa-chevron-down" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="row tweet-content">
                            <p>{{ tweetobj.tweet_content }}</p>
                            <div class="tweet-date">
                                {{ tweetobj.time }} - {{ tweetobj.date }}
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
                <input  type="button" class="btn btn-success" value="Save PNG" @click="saveAsPNG"/>
                <div id="img-out">
                    
                </div>
                </div>

            </div>
        </div>
    </div>`
})