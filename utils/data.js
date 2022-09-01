import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Temidayo',
            email: 'themydee@icloud.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        
        {
            name: 'Nifemi',
            email: 'nifetemiboy@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        },

    ],

    products: [
        {
            name: 'Apple Macbook',
            slug: 'apple-macbook',
            category: 'Laptops',
            image: '/images/macbook.jpg',
            price: 7000,
            brand: 'Apple',
            rating: 5.0,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt',
        },
        {
            name: 'Fit Shirt',
            slug: 'fit-shirt',
            category: 'Shirts',
            image: '/images/shirt2.jpg',
            price: 80,
            brand: 'Adidas',
            rating: 4.2,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt',
        },
        {
            name: 'Slim Shirt',
            slug: 'slim-shirt',
            category: 'Shirts',
            image: '/images/shirt3.jpg',
            price: 90,
            brand: 'Raymond',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt',
        },
        {
            name: 'Golf Pants',
            slug: 'golf-pants',
            category: 'Pants',
            image: '/images/pants1.jpg',
            price: 90,
            brand: 'Oliver',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'Smart looking pants',
        },
        {
            name: 'Fit Pants',
            slug: 'fit-pants',
            category: 'Pants',
            image: '/images/pants2.jpg',
            price: 95,
            brand: 'Zara',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular pants',
          },
          {
            name: 'Classic Pants',
            slug: 'classic-pants',
            category: 'Pants',
            image: '/images/pants3.jpg',
            price: 75,
            brand: 'Casely',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular pants',
          }, 

    ]
}

export default data;