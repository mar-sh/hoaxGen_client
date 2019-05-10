const app = new Vue({
    el:'#app',
    data:{
        email:'',
        password:'',
        registerpage:false,
        loginpage:false,
        landingpage:true,
        islogin:false,
        hoaxes:[],
        page_input:false,
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

        tologinpage:function(){
            this.registerpage = false,
            this.loginpage=true,
            this.landingpage=false
        },
        toregisterpage:function(){
            this.registerpage=true,
            this.loginpage=false,
            this.landingpage=true
        },
        login:function(){
            axios({
                method:'post',
                url:"http://localhost:3000/login",
                data:{
                    email:this.email,
                    password:this.password
                }
            })
            .then(({data})=>{
                localStorage.setItem('token',data.token)
                this.showhide()
                this.getHoaxes()
                console.log(data)
            })
            .catch(({err})=>{
                console.log(err)
            })

        },
        getHoaxes:function(){
            axios({
                method:'get',
                url:"http://localhost:3000/hoaxes",
                headers:{
                    token:localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                console.log(data)
                for(let i = 0 ; i < data.hoaxes.length; i++){
                    this.hoaxes.push(data.hoaxes[i])
                }
            })
            .catch(({err})=>{
                console.log(err)
            })
        },
        register:function(){
            axios({
                method:'post',
                url:"http://localhost:3000/register",
                data:{
                    email:this.email,
                    password:this.password
                }
            })
            .then(({data})=>{
                localStorage.setItem('token',data.token)
                this.showhide()

                console.log(data)
            })
            .catch(({err})=>{
                console.log(err)
            })

        },
        logout:function(){
            localStorage.removeItem('token')
            this.registerpage = false
            this.loginpage = false
            this.landingpage =true
            this.islogin = false
        },
        showhide:function(){
            if(localStorage.getItem('token')){
                this.registerpage = false
                this.loginpage = false
                this.landingpage = false
                this.islogin = true
            }
        },
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
    created(){
        if(localStorage.getItem('token')){
            this.registerpage = false
            this.loginpage = false
            this.landingpage = false
            this.islogin = true
        }
        axios({
            method:'',
            url:''
        })
        .then(()=>{
        })
        .catch(()=>{
        })
    }
})