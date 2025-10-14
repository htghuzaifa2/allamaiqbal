"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, ShoppingCart } from 'lucide-react'
import products from '@/lib/products.json'
import { cn } from '@/lib/utils'

interface Product {
  id: number;
  slug: string;
  title: string;
  price: string;
  imageUrl: string;
}

const DISMISS_COOLDOWN = 60 * 1000; // 1 minute in milliseconds
const INITIAL_APPEAR_DELAY = 10 * 1000; // 10 seconds
const PRODUCT_ROTATION_INTERVAL = 20 * 1000; // 20 seconds

export function ProductPopup() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const getRandomProduct = () => {
    return products[Math.floor(Math.random() * products.length)];
  };

  useEffect(() => {
    // This effect runs only once on mount to schedule the initial appearance.
    if (typeof window === 'undefined') {
      return;
    }

    const showPopup = () => {
      setProduct(getRandomProduct());
      setIsVisible(true);
      setIsFading(false);
    };

    const dismissedUntil = localStorage.getItem('product-popup-dismissed-until');
    const now = Date.now();

    let initialTimeout: NodeJS.Timeout;

    if (dismissedUntil && now < parseInt(dismissedUntil, 10)) {
      // If we are in a cooldown period, set a timer to show it after the cooldown.
      const timeUntilShow = parseInt(dismissedUntil, 10) - now;
      initialTimeout = setTimeout(showPopup, timeUntilShow);
    } else {
      // Otherwise, show it after the initial delay.
      initialTimeout = setTimeout(showPopup, INITIAL_APPEAR_DELAY);
    }

    // Cleanup function to clear the timer if the component unmounts.
    return () => {
      clearTimeout(initialTimeout);
    };
  }, []); // Empty dependency array ensures this runs only once on mount.

  useEffect(() => {
    // This effect handles the product rotation ONLY when the popup is visible.
    if (!isVisible) {
      return;
    }

    const rotationInterval = setInterval(() => {
        setIsFading(true);
        setTimeout(() => {
          setProduct(prevProduct => {
            let newProduct = getRandomProduct();
            // Ensure we don't show the same product twice in a row
            while (newProduct.slug === prevProduct?.slug) {
              newProduct = getRandomProduct();
            }
            return newProduct;
          });
          setIsFading(false);
        }, 500); // fade duration
    }, PRODUCT_ROTATION_INTERVAL);

    // Cleanup function to clear the interval when the popup is hidden or unmounts.
    return () => {
      clearInterval(rotationInterval);
    };
  }, [isVisible]); // This effect re-runs whenever 'isVisible' changes.

  const handleDismiss = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
      const dismissedUntil = Date.now() + DISMISS_COOLDOWN;
      localStorage.setItem('product-popup-dismissed-until', dismissedUntil.toString());
    }, 500); // match fade duration
  };

  if (!product || !isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-4 left-4 z-50 w-80 transform transition-all duration-500 ease-in-out',
        isVisible && !isFading ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      )}
    >
      <Card className="overflow-hidden shadow-2xl border-primary/20">
        <CardContent className="p-4 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>

          <div className="flex gap-4">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-headline text-sm font-semibold line-clamp-2">
                {product.title}
              </h4>
              <p className="text-lg font-bold text-primary">PKR {product.price}</p>
              <Button asChild size="sm" className="mt-2">
                <Link href={`https://huzi.pk/product/${product.slug}`} target="_blank" rel="noopener noreferrer">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View Product
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
