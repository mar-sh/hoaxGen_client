const base_url = 'http://hoaxgen-api.marasis.xyz'
const app = new Vue({
    el: '#app',
    data: {
        email: '',
        password: '',
        islogin: false,
        hoaxes: [],
        page_input: false,
        tweetObj: {
            name: 'dion',
            user_name: '@dionmichael',
            tweet_content: 'lorem ipsum',
            verified_user: '',
            following: '123352',
            time: '11.32',
            status_follow: false,
            date: new Date().toDateString(),
            replies: '4',
            retweet: '45632',
            likes: '78456',
            componentName: 'statusunfollow'
        },
        beforeloginpage: 1,
        page: 3,
        currentCard: ''
    },
    watch: {
        likes(value) {
            this.checkLikes(value)
        }
    },
    methods: {
        tes: function (payload) {
            console.log(payload)
            this.currentCard = payload
        },
        changepage: function (newPage) {
            this.page = newPage
        },
        beforelogin: function (newpage) {
            this.beforeloginpage = newpage
        },
        login: function () {
            // axios({
            //     method:'post',
            //     url:"http://api-hoaxgen.demarsh.dev/login",
            //     data:{
            //         email:this.email,
            //         password:this.password
            //     }
            // })
            axios
                .post(`${base_url}/login`, {
                    email: this.email,
                    password: this.password
                })
                .then(({ data }) => {
                    this.hoaxes = []
                    localStorage.setItem('token', data.token)
                    this.showhide()
                    if (this.islogin === true) {
                        this.page = 3
                    }
                    this.getHoaxes()
                    console.log(data)
                })
                .catch((err) => {
                    console.log(err)
                })

        },
        getHoaxes: function () {
            axios({
                method: 'get',
                url: `${base_url}/hoaxes`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({ data }) => {
                    console.log(data)
                    for (let i = 0; i < data.hoaxes.length; i++) {
                        this.hoaxes.push(data.hoaxes[i])
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        register: function () {
            axios({
                method: 'post',
                url: `${base_url}/register`,
                data: {
                    email: this.email,
                    password: this.password
                }
            })
                .then(({ data }) => {
                    localStorage.setItem('token', data.token)
                    this.showhide()
                    console.log(data)
                })
                .catch(({ err }) => {
                    console.log(err)
                })

        },
        logout: function () {
            localStorage.removeItem('token')
            this.showhide()
        },
        showhide: function () {
            if (localStorage.getItem('token')) {
                this.registerpage = false
                this.loginpage = false
                this.landingpage = false
                this.islogin = true
            } else {
                this.landingpage = true
                this.registerpage = false
                this.loginpage = false
                this.islogin = false
                this.page = ''
            }
        },
        checkLikes(value) {
            if (value > 1e9) {
            }
        },

    },
    created() {
        this.showhide()
        if (this.islogin === true) {
            this.page = 3
            axios({
                method: 'get',
                url: `${base_url}/hoaxes`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({ data }) => {
                    console.log(data)
                    for (let i = 0; i < data.hoaxes.length; i++) {
                        this.hoaxes.push(data.hoaxes[i])
                    }
                })
                .catch(({ err }) => {
                    console.log(err)
                })
        } else {
            this.islogin = false
            this.beforeloginpage = 1
        }
    }
})