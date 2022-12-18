package ru.geekbrains.march.market.entities;

import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Data
public class Basket {
    private List<BasketItem> items;
    private BigDecimal totalPrice;

    public List<BasketItem> getItems() {
        return Collections.unmodifiableList(items);
    }

    public Basket() {
        this.items = new ArrayList<>();
    }

    public void add(Product product) {
        for (BasketItem item : items) {
            if (item.getProductId().equals(product.getId())) {
                item.incrementQuantity();
                recalculate();
                return;
            }
        }
        BasketItem cartItem = new BasketItem(product.getId(), product.getTitle(), 1, product.getPrice(), product.getPrice());
        items.add(cartItem);
        recalculate();
    }

    public void clear() {
        items.clear();
        totalPrice = BigDecimal.ZERO;
    }

    private void recalculate() {
        totalPrice = BigDecimal.ZERO;
        items.forEach(i -> totalPrice = totalPrice.add(i.getPrice()));
    }
}
