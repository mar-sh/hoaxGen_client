Vue.component("twitter-layout",{
    data(){
        return {
            name: "",
            account: "",
            body: "",
            hour: "",
            minute: "",
            ampm: "",
            day: "",
            month: "",
            year: ""
        }
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
        }
    },
    template: 
    `<div>
        <div class="container d-flex justify-content-center" style="flex-direction: row">
            <div class="row">
                <div class="card shadow" id="twitter">
                    <div class="row tweet-head align-items-center">
                        <div class="col-sm-2 profile-container">
                            <img class="profile-picture center-block" src="./res/default_profile.png">
                        </div>
                        <div class="col">
                            <h5 style="margin-bottom: 0">{{name}}</h5>
                            @{{account}}
                        </div>
                        <div class="col follow-container">
                            <button class="follow-btn">follow</button>
                            <i class="fa fa-chevron-down" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="row tweet-content">
                        <p>{{body}}</p>
                        <div class="tweet-date">
                            {{hour}}.{{minute}} {{ampm}} - {{date}} {{month}} {{year}}
                        </div>
                    </div>
                    <div class="row tweet-like-container border-top border-bottom align-items-center" style="margin: 0 10px 10px 10px; padding: 10px 0">
                        <div class="tweet-like">
                            <ul>
                                <li><span>145,235</span> Retweets</li>
                                <li><span>23,490</span> Likes</li>
                            </ul>
                        </div>
                    </div>

                    <div class="row tweet-actions">
                        <ul>
                            <li><a href="#"><img src="./res/twitter-icons/twitter-reply-outline.svg" alt="" class="src"> 24K </a></li>
                            <li><a href="#"><img src="./res/twitter-icons/twitter-retweet.svg" alt="" class="src"> 953K </a></li>
                            <li><a href="#"><img src="./res/twitter-icons/twitter-like-outline.svg" alt="" class="src">341K</a></li>
                            <li><a href="#"><img src="./res/twitter-icons/twitter-message.svg" alt="" class="src"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" style="text-align: center">
            <input type="button" id="btnSave" value="Save PNG" @click="saveAsPNG"/>
            <div id="img-out"></div>
        </div>
        <div class="container">
            <label for="name">Name</label>
            <input type="text" v-model="name" name="name">

            <label for="account">Account</label>
            <input type="text" v-model="account" name="account">

            <label for="body">body</label>
            <input type="text" v-model="body" name="body">

            <label for="hour">hour</label>
            <input type="text" v-model="hour" name="hour">

            <label for="minute">minute</label>
            <input type="text" v-model="minute" name="minute">

            <label for="ampm">ampm</label>
            <select name="ampm" v-model="ampm">
                <option>AM</option>
                <option>PM</option>
            </select>

            <label for="day">day</label>
            <input type="text" v-model="day" name="day">

            <label for="month">month</label>
            <input type="text" v-model="month" name="month">

            <label for="year">year</label>
            <input type="text" v-model="year" name="year">

        </div>
    </div>`
})