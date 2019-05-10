Vue.component('statusunfollow', {
    template:`
        <button 
            @click="statusFollowing"
            class="follow-btn">follow
        </button>
    `,
    methods:{
        statusFollowing(){
            this.$emit('change', 'statusfollowing')
        },
    },
})

Vue.component('statusfollowing',{
    template: `
        <button 
            @click="statusUnfollow"
            class="follow-btn following">following
        </button>
    `,
    methods:{
        statusUnfollow(){
            this.$emit('change', 'statusunfollow')
        }
    }
})