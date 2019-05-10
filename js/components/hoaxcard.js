Vue.component('hoaxcard', {
    props:["hoax"],
    template: `
    <div class="card" style="width: 18rem;">
    <figure class="imghvr-fade">
        <img class="card-img-top" src="#" alt="Card image cap">
    </figure>
    <div class="card-body">
        <p class="card-text">{{hoax.url}} quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    </div>
    `,
    
})