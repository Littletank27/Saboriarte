import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { menuItems, categories, subcategories } from './data/menu';
import { useCartStore } from './store/cartStore';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const { addItem } = useCartStore();

  const categorySubcategories = subcategories.filter(
    (subcategory) =>
      menuItems.find((item) => item.subcategory === subcategory)?.category === selectedCategory
  );

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="relative h-[300px] rounded-lg overflow-hidden mb-8">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1000"
            alt="Restaurant banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Saboriarte</h1>
              <p className="text-gray-200">Sabores que inspiran, momentos que perduran</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-12">
          {categorySubcategories.map((subcategory) => (
            <section key={subcategory} className="space-y-6">
              <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">
                {subcategory}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems
                  .filter(
                    (item) =>
                      item.category === selectedCategory &&
                      item.subcategory === subcategory
                  )
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{item.name}</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-green-400">${item.price}</span>
                          <button
                            onClick={() => addItem(item)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                          >
                            Agregar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default App;