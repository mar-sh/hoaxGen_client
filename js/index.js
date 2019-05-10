$(function() { 
    $("#btnSave").click(function() { 
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
    })
})
