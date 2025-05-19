"use client";

import { useState } from "react";
import { Button } from "@heroui/button";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export const AddToCartButton = ({
  product,
  className = "",
}: AddToCartButtonProps) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, 1);

    // Animation effect
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  // Disable button if product is out of stock
  const isDisabled = !product.inStock;

  return (
    <Button
      className={`w-full py-3 ${className}`}
      color={isDisabled ? "default" : "primary"}
      disabled={isDisabled}
      variant="solid"
      onClick={handleAddToCart}
    >
      {isAdding ? "Added!" : isDisabled ? "Sold Out" : "Add to Cart"}
    </Button>
  );
};
