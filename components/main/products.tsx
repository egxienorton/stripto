import React, { useState } from 'react';
import { ConnectWallet, Web3Button, useAddress, useContract } from "@thirdweb-dev/react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps extends Product {
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, addToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden z-[40]">
      <img src={image} alt={name} className="w-full h-48 object-cover z-[40]" />
      <div className="p-4 z-[40]">
        <h3 className="text-lg font-semibold z-[40]">{name}</h3>
        <p className="text-gray-600 z-[40]">${price.toFixed(2)}</p>
        <button
          onClick={() => addToCart({ id, name, price, image })}
          className="mt-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 z-[40]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

interface CheckoutDialogProps {
  cart: Product[];
  total: number;
  onClose: () => void;
  onPay: () => void;
}

const CheckoutDialog: React.FC<CheckoutDialogProps> = ({ cart, total, onClose, onPay }) => {
  const [depositAmount, setDepositAmount] = useState<number>(total);
  const address = useAddress();
  const { contract } = useContract("0x86CC05211800DdDB37E0f4fC93fCb7e8Fd0f14ae");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[40]">
      <div className="bg-white p-6 rounded-lg max-w-md w-full z-[40]">
        <h2 className="text-2xl font-bold mb-4 z-[30]">Checkout</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-2 z-[40]">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-2 mt-2 z-[40]">
          <div className="flex justify-between font-bold z-[40]">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-4 z-[40]">
          <ConnectWallet />
        </div>
        {address && (
          <div className="mt-4 z-[40]">
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
              className="w-full p-2 border rounded mb-2 z-[40]"
            />
            <Web3Button
              contractAddress="0x86CC05211800DdDB37E0f4fC93fCb7e8Fd0f14ae"
              action={(contract) => {
                return contract.call("deposit", [], { value: depositAmount });
              }}
              onSuccess={() => {
                alert("Payment successful!");
                onPay();
              }}
              onError={(error) => alert("Error: " + error.message)}
            >
              Pay
            </Web3Button>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const SimpleEcommerce: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  const products: Product[] = [
    { id: 1, name: 'Men shirt XL', price: 10.99, image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/58/4386053/1.jpg?6254' },
    { id: 2, name: 'Nike Snickers', price: 29.99, image: 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/54/8271091/1.jpg?6617' },
    { id: 3, name: 'Smart Watch', price: 39.99, image: 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/14/9127862/1.jpg?8444' },
    { id: 4, name: 'Rich Dad Poor Dad', price: 49.99, image: 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/67/9565123/1.jpg?2160' },
    { id: 5, name: 'Tecno Pova', price: 49.99, image: 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/42/9786053/1.jpg?9070' },
    { id: 6, name: 'Ladies Bag', price: 45.99, image: 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/57/173689/1.jpg?0464' },
    { id: 7, name: 'Smart Tv', price: 498.99, image: 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/94/5031362/1.jpg?0002' },
    { id: 8, name: 'Hp Envy 15 2024', price: 29.99, image: 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/22/631119/1.jpg?8000' },
  ];

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePay = () => {
    setCart([]);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 z-[40]">
      <h1 className="text-3xl font-bold mb-6 center text-white">A Demo</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 z-[40]">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} addToCart={addToCart} />
        ))}
      </div>
      {cart.length > 0 && (
        <div className="mt-8 text-center z-[50]">
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="px-6 py-3 rounded bg-green-500 text-white hover:bg-green-600 z-[50]"
          >
            Checkout ({cart.length} items)
          </button>
        </div>
      )}
      {isCheckoutOpen && (
        <CheckoutDialog
          cart={cart}
          total={total}
          onClose={() => setIsCheckoutOpen(false)}
          onPay={handlePay}
        />
      )}
    </div>
  );
};

export default SimpleEcommerce;