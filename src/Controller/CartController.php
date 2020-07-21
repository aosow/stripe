<?php

namespace App\Controller;

use Stripe\Stripe;
use App\Entity\Product;
use Stripe\PaymentIntent;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CartController extends AbstractController
{
    
    /**
     * @Route("/paiement/{id}", name="checkout")
     */
    public function checkout(Product $product) {

        // intention d'achat

        \Stripe\Stripe::setApiKey('sk_test_51H1rbWFKv2VKDCvPUQcAnFqq6Y6OUZdyiTYV66hGHPkLrUoCxUycGKwMhRYyjyTYWojnLvVrL7G5ziSxn1yN7R7L00gqGCQegA');

        $intent = \Stripe\PaymentIntent::create([
            'amount' => $product->getPrice()*100,
            'currency' => 'eur',
            'description' => $product->getTitle()
        ]);

        return $this->render('product/checkout.html.twig', [
            'product' => $product,
            'client_secret' => $intent['client_secret']
        ]);
    }

    /**
     * @Route("/paiement-effectue", name="checkout_success")
     */
    public function checkout_success() {

        return $this->render('product/checkout-success.html.twig');
    }

}
