package ru.geekbrains.march.market.services;

import org.springframework.stereotype.Service;
import ru.geekbrains.march.market.model.Basket;
import ru.geekbrains.march.market.entities.Product;

import javax.annotation.PostConstruct;

@Service
public class BasketService {
    private Basket basket;
    private final ProductService service;

    public BasketService(ProductService service) {
        this.service = service;
    }

    @PostConstruct
    public void init() {
        basket = new Basket();
    }

    public Basket getBasket() {
        return basket;
    }

    public void addToCart(Long productId) {
        Product product = service.findById(productId).orElseThrow(() -> new RuntimeException("Не удается добавать в корзину"));
        basket.add(product);
    }

    public void remove(long id) {
        basket.remove(id);
    }
    public void clear() {
        basket.clear();
    }
}