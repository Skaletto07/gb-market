package ru.geekbrains.march.market.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.geekbrains.march.market.model.Basket;
import ru.geekbrains.march.market.services.BasketService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/basket")
public class BasketController {

    private final BasketService basketService;

    @GetMapping
    public Basket getBasket() {
        return basketService.getBasket();
    }

    @GetMapping("/add/{productID}")
    public void addProductToBasket(@PathVariable long productID) {
        basketService.addToCart(productID);
    }

    @GetMapping("/clear")
    public void clearBasket() {
        basketService.clear();
    }

    @GetMapping("/remove/{id}")
    public void removeBasket(@PathVariable long id) {
        basketService.remove(id);
    }
}
