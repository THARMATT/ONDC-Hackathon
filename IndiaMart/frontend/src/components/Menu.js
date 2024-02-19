import React from 'react';

const products = [
    {
        name: 'Apples (per kg)',
        price: 50
    },
    {
        name: 'Bananas (per dozen)',
        price: 40
    },
    {
        name: 'Oranges (per kg)',
        price: 60
    },
    {
        name: 'Potatoes (per kg)',
        price: 30
    },
    {
        name: 'Onions (per kg)',
        price: 40
    },
    {
        name: 'Tomatoes (per kg)',
        price: 45
    },
    {
        name: 'Rice (per kg)',
        price: 80
    },
    {
        name: 'Wheat Flour (per kg)',
        price: 35
    },
    {
        name: 'Sugar (per kg)',
        price: 50
    },
    {
        name: 'Oil (per litre)',
        price: 100
    }
];

function Menu() {
  return (
    <div>
      <table className="tab">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Menu;
