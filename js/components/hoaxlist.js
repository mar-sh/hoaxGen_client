Vue.component('hoaxlist', {
    props: ["hoax", "index"],
    methods:{
        showCard:function(){
            this.$emit('showcard', this.hoax.url)
        }
    },
    template: `
    <div>
        <div class=“card shadow list” style=“padding: 20px”>
            <div class=“card-body py-1”>
                <div class=“row ”  v-on:click=“showCard”>
                    <div class=“col-sm-8">
                    <h5>Real Tweet {{index}}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
 
 })