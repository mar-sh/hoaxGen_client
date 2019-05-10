const app = new Vue({
    el:'#app',
    data:{
        name:'',
        user_name:'',
        tweet_content:'',
        verified_user:'',
        following:'',
        time:'',
        status_follow:false,
        date:new Date().toDateString(),
        replies:'',
        retweet:'',
        likes:'',
        componentName:'statusunfollow'
    },
    watch: {
        likes(value){
            this.checkLikes(value)
        }
    },
    methods: {
        checkLikes(value){
            if(value > 1e9){
                
            }
        },
        change(newComponent){
            this.componentName = newComponent 
        },
        numConvert(input){
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
})