"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { useCart } from "@/context/CartContext";
import { CartIcon } from "@/components/icons";

export const CartButton = () => {
  const { getCartItemsCount, cart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    setItemCount(getCartItemsCount());
  }, []);

  // Monitor cart changes
  useEffect(() => {
    if (mounted) {
      setItemCount(getCartItemsCount());
    }
  }, [getCartItemsCount, mounted, cart]);

  return (
    <Button
      as={Link}
      className="text-sm font-normal text-default-600 bg-default-100 relative"
      href="/cart"
      variant="flat"
    >
      <CartIcon size={20} />
      {mounted && itemCount > 0 && (
        <span className=" ml-1 bg-red-500 text-white text-xs rounded-full min-h-5 min-w-5 px-1.5 flex items-center justify-center">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Button>
  );
};
