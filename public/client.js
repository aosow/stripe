window.onload = () => {

    // Styles des elements du formulaires

    var styles = {

        base: {
            color: "#32325d",
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#32325d"
            }
        },

        invalid: {
            fontFamily: 'Arial, sans-serif',
            color: "#ff0000",
            iconColor: "#ff0000"
        }

    };

    var stripe = Stripe('pk_test_51H1rbWFKv2VKDCvPcwBB7WhE9K8lIIDrSEOpacsCRr2VSK8XiuGJKWSJZqrTt9cJ6xVZKLZvrB9GPEU2p31tIrVo00FtviO6QX');

    var elements = stripe.elements();

    var redirect = "/paiement-effectue";

    var cardButton = document.getElementById("card-button");
    var clientSecret = cardButton.dataset.secret;

    // Crée les éléments du formulaire de carte bancaire
    var card = elements.create("card", {
        hidePostalCode: true, 
        style: styles });

    card.mount("#card-elements");

    // On gère la saisie
    card.addEventListener("change", (event) => {
        var displayError = document.getElementById("card-errors");
        if(event.error){
            displayError.textContent = event.error.message;
            document.querySelector("button").disabled = true;
        }else{
            displayError.textContent = "";
            document.querySelector("button").disabled = false;
        }
    })


    var form = document.getElementById("payment-form");

    // On gère le paiement

    form.addEventListener("submit", function(event) {

    event.preventDefault();

    payWithCard(stripe, card, clientSecret);
      
    });

    var payWithCard = function(stripe, card, clientSecret) {

        loading(true);
        
        stripe.confirmCardPayment(clientSecret, {

        payment_method: {

            card: card,
            billing_details: {
                name: 'Jenny Rosen', //Nom du  client
              }
        }

        }).then((result) => {
            if(result.error){
                showError(result.error.message);
            }else{
                document.location.href = redirect
            }
        })
    
    };


    var showError = function(errorMsgText) {

        loading(false);
    
        var errorMsg = document.querySelector("#card-error");
    
        errorMsg.textContent = errorMsgText;
    
        setTimeout(function() {
    
        errorMsg.textContent = "";
    
        }, 4000);
    
    };


    var loading = function(isLoading) {

        if (isLoading) {
    
            document.querySelector("button").disabled = true;
        
            document.querySelector("#spinner").classList.remove("hidden");
        
            document.querySelector("#button-text").classList.add("hidden");
    
        } else {
    
            document.querySelector("button").disabled = false;
        
            document.querySelector("#spinner").classList.add("hidden");
        
            document.querySelector("#button-text").classList.remove("hidden");
    
        }
    
    }; 
}