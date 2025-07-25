import { useState } from 'react';
import './App.css'

const App: React.FC = () => {

  const inventory = [
    { name: 'bacon', unitPrice: 10.99, quantity: 2 },
    { name: 'eggs', unitPrice: 3.99, quantity: 10 },
    { name: 'cheese', unitPrice: 6.99, quantity: 10 },
    { name: 'chives', unitPrice: 1.00, quantity: 10 },
    { name: 'wine', unitPrice: 11.99, quantity: 10 },
    { name: 'brandy', unitPrice: 17.55, quantity: 10 },
    { name: 'bananas', unitPrice: 0.69, quantity: 10 },
    { name: 'ham', unitPrice: 2.69, quantity: 10 },
    { name: 'tomatoes', unitPrice: 3.26, quantity: 10 },
    { name: 'tissue', unitPrice: 8.45, quantity: 10 },
  ];


  const [cart, setCart] = useState<{ name: string; unitPrice: number; quantity: number }[]>([]);
  const [openCart, setOpenCart] = useState(false);
  // const [updateInventory, setUpdateInventory] = useState(inventory);

 
  const addToCart = (item: { name: string; unitPrice: number; quantity: number }) => {
    console.log(`Added ${item.name} to cart at $${item.unitPrice.toFixed(2)} each.`);
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.name === item.name);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    console.log("Current cart:", cart);
  }

  return (
    <>
      <div>
        <h1>Inventory Management</h1>
        <div className='flex justify-center items-center'>
        <button className='bg-blue-400 mt-3 p-4' onClick={() => setOpenCart(!openCart)}>Cart View</button>
        </div>
       <div className='flex justify-center items-center mt-4'>
          {openCart && (
            <div className='cart w-[300px] shadow-md p-4 relative'>
              <button className='bg-red-400 mt-3 p-2 absolute top-0 right-[8px] rounded-full' onClick={() => setOpenCart(false)}>X</button>
              <h2>Shopping Cart</h2>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div>
                  {cart.map(item => (
                    <div className='flex justify-between'>
                      <div key={item.name}>
                        <h3>{item.name}</h3>
                        <p>Unit Price: ${item.unitPrice.toFixed(2)}</p>
                        <p>Quantity: {item.quantity}</p>
                        {/* <input type="number" min="1" max={item.quantity} defaultValue={item.quantity} /> */}
                        <p>Total: ${(item.unitPrice * item.quantity).toFixed(2)}</p>

                      </div>
                      <button className='bg-red-400 mt-3 p-2' onClick={() => {
                        setCart(prevCart => prevCart.filter(cartItem => cartItem.name !== item.name));
                        console.log(`Removed ${item.name} from cart.`);
                      }}>Remove</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
       </div>
        <div className='grid grid-cols-3'>
          {inventory.map(item => (
            <div className='border p-4 m-2' key={item.name}>
              <h2>{item.name}</h2>
              <p>Unit Price: ${item.unitPrice.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
              <input type="number" min="1" max={item.quantity} defaultValue="1" />
              <button className='bg-blue-400 mt-3 p-4' onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </div>
        
      </div>
    </>
  )
}

export default App
