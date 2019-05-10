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
        tweetObj: {
            name:'dion',
            user_name:'@dionmichael',
            tweet_content:'lorem ipsum',
            verified_user:'',
            following:'123352',
            time:'11.32',
            status_follow:false,
            date:new Date().toDateString(),
            replies:'4',
            retweet:'45632',
            likes:'78456',
            componentName:'statusunfollow'
        }
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
                this.page_input = true

            }
        },
        checkLikes(value){
            if(value > 1e9){
                
            }
        },

    },
    created(){
        this.showhide()
        // if(localStorage.getItem('token')){
        //     this.registerpage = false
        //     this.loginpage = false
        //     this.landingpage = false
        //     this.islogin = true
        // }
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