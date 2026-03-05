import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const menuItems = [
    {
      name: "Espresso",
      description: "Strong and bold single shot.",
      price: 3,
      image: "/Espresso.jpg",
      category: "Hot Coffee",
    },
    {
      name: "Latte",
      description: "Espresso with silky steamed milk.",
      price: 4,
      image: "/latte.jpg",
      category: "Hot Coffee",
    },
    {
      name: "Cappuccino",
      description: "Rich espresso with thick foam.",
      price: 4.5,
      image: "/Cappuccino.jpg",
      category: "Hot Coffee",
    },
    {
      name: "Americano",
      description: "Espresso diluted with hot water.",
      price: 3.5,
      image: "/Americano.jpg",
      category: "Hot Coffee",
    },
    {
      name: "Mocha",
      description: "Chocolate, espresso & steamed milk.",
      price: 5,
      image: "/Mocha.jpg",
      category: "Hot Coffee",
    },
    {
      name: "Flat White",
      description: "Velvety microfoam & espresso.",
      price: 4.5,
      image: "/Flat White.jpg",
      category: "Hot Coffee",
    },
    {
      name: "Macchiato",
      description: "Espresso marked with foam.",
      price: 3.5,
      image: "/Macchiato.jpg",
      category: "Hot Coffee",
    },
    {
      name: "Iced Coffee",
      description: "Chilled brewed coffee over ice.",
      price: 4,
      image: "/Iced Coffee.jpg",
      category: "Cold Coffee",
    },
    {
      name: "Cold Brew",
      description: "Slow-steeped smooth cold coffee.",
      price: 4.5,
      image: "/Cold Brew.jpg",
      category: "Cold Coffee",
    },
    {
      name: "Caramel Latte",
      description: "Creamy latte with caramel.",
      price: 5,
      image: "/CaramelLatte.jpg",
      category: "Cold Coffee",
    },
    {
      name: "Matcha Latte",
      description: "Premium green tea & milk.",
      price: 5,
      image: "/Matcha Latte.jpg",
      category: "Specialty",
    },
    {
      name: "Chai Latte",
      description: "Spiced tea with steamed milk.",
      price: 4.5,
      image: "/Chai Latte.jpg",
      category: "Specialty",
    },
    {
      name: "Affogato",
      description: "Vanilla ice cream & espresso.",
      price: 6,
      image: "/Affogato.jpg",
      category: "Specialty",
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({ data: item });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
