import { useState } from 'react';
import CartSidebar from './components/CartSidebar/CartSidebar';
import ProductCard from './components/ProductCard/ProductCard';
import { Toaster } from 'react-hot-toast';
// import ProductCard from './ProductCard';
// import CartSidebar from './CartSidebar';

interface Product {
  name: string;
  unitPrice: number;
  quantity: number;
}

const App = () => {
  const [inventory, setInventory] = useState<Product[]>([
    { name: 'bacon', unitPrice: 10.99, quantity: 10 },
    { name: 'eggs', unitPrice: 3.99, quantity: 10 },
    { name: 'cheese', unitPrice: 6.99, quantity: 10 },
    { name: 'chives', unitPrice: 1.00, quantity: 10 },
    { name: 'wine', unitPrice: 11.99, quantity: 10 },
    { name: 'brandy', unitPrice: 17.55, quantity: 10 },
    { name: 'bananas', unitPrice: 0.69, quantity: 10 },
    { name: 'ham', unitPrice: 2.69, quantity: 10 },
    { name: 'tomatoes', unitPrice: 3.26, quantity: 10 },
    { name: 'tissue', unitPrice: 8.45, quantity: 10 },
  ]);

  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product, quantity: number) => {
    const itemInInventory = inventory.find(item => item.name === product.name);

    if (!itemInInventory || itemInInventory.quantity < quantity) {
      alert(`Not enough ${product.name} in stock. Only ${itemInInventory?.quantity || 0} available.`);
      return;
    }

    // Update inventory
    setInventory(prev =>
      prev.map(item =>
        item.name === product.name
          ? { ...item, quantity: item.quantity - quantity }
          : item
      )
    );

    // Update cart
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.name === product.name);
      if (existingItem) {
        return prevCart.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const handleRemoveFromCart = (item: Product) => {
    setCart(prev => prev.filter(cartItem => cartItem.name !== item.name));
    // Restock inventory
    setInventory(prev =>
      prev.map(invItem =>
        invItem.name === item.name
          ? { ...invItem, quantity: invItem.quantity + item.quantity }
          : invItem
      )
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Grocery Store Inventory</h1>
          <div className="flex justify-end">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors"
            >
              🛒 View Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </header>

        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cart}
          onRemoveItem={handleRemoveFromCart}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {inventory.map(product => (
            <ProductCard
              key={product.name}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default App;