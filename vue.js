const app = new Vue({
    el: '#app',
    data:{
        email:'',
        password:'',
        registerpage:false,
        loginpage:false,
        landingpage:true,
        islogin:false

    },
    methods:{
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
                console.log(data)
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
                console.log(data)
            })
            .catch(({err})=>{
                console.log(err)
            })

        },
        logout:function(){
            localStorage.removeItem('token')
        }
        
    },
    computed:{
    },
    watch:{
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