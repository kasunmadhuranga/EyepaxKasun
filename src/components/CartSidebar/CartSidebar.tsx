interface CartItem {
    name: string;
    unitPrice: number;
    quantity: number;
}

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onRemoveItem: (item: CartItem) => void;
}

const CartSidebar = ({ isOpen, onClose, cartItems, onRemoveItem }: CartSidebarProps) => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-xl">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Your Shopping Cart</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">Your cart is empty</p>
                            <button
                                onClick={onClose}
                                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="divide-y divide-gray-200">
                                {cartItems.map(item => (
                                    <div key={item.name} className="py-4 flex justify-between">
                                        <div>
                                            <h3 className="font-medium text-gray-900 capitalize">{item.name}</h3>
                                            <p className="text-gray-600">
                                                ${item.unitPrice.toFixed(2)} × {item.quantity}
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-medium mr-4">
                                                ${(item.unitPrice * item.quantity).toFixed(2)}
                                            </span>
                                            <button
                                                onClick={() => onRemoveItem(item)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 mt-6 pt-6">
                                <div className="flex justify-between text-lg font-medium">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg shadow-md transition-colors">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartSidebar;