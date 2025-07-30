import { useState } from 'react';
import toast from 'react-hot-toast';

interface Product {
    name: string;
    unitPrice: number;
    quantity: number;
}

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 1;
        setQuantity(Math.max(1, Math.min(value, product.quantity)));
    };

    const handleAddToCart = () => {
        onAddToCart(product, quantity);
        toast.success(`${quantity} ${product.name} added to cart!`, {
            position: 'bottom-right',
            duration: 3000,
            icon: '🛒',
            style: {
                background: '#4BB543',
                color: '#fff',
            },
        });
    };

    return (
        <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 ${product.quantity === 0 ? 'opacity-70' : ''
            }`}>
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-gray-800 capitalize">{product.name}</h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        ${product.unitPrice.toFixed(2)}
                    </span>
                </div>

                <div className="mt-4">
                    <p className="text-gray-600">
                        <span className="font-medium">In Stock:</span> {product.quantity}
                    </p>
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                    </label>
                    <input
                        type="number"
                        min="1"
                        max={product.quantity}
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={product.quantity === 0}
                    className={`w-full mt-4 py-2 px-4 rounded-md font-medium ${product.quantity === 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                >
                    {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;