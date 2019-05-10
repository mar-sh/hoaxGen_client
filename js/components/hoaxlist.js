Vue.component('hoaxlist', {
    props: ["hoax"],
    methods:{
        showCard:function(){
            this.$emit('showcard', 'hello')
        }
    },
    template: `
    <div>
        <div class="card shadow list" style="padding: 20px">
            <div class="card-body py-1">
                <div class="row "  v-on:click="showCard">
                    <div class="col-sm-8">
                    <h5>DONALD TRUMP</h5>
                    </div>    
                    <div class="col-sm-4 text-muted">
                    May 10, 2019
                    </div>    
                    <div class="col-sm-6">
                    <p class = 'text-truncate'>{{hoax.url}}</p>
                    </div>    
                </div>
            </div>
        </div>
    </div>
    `

})