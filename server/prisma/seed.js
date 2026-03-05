const { PrismaClient } = require('@prisma/client'); // always this
const prisma = new PrismaClient();

async function main() {
    await prisma.coffee.createMany({
        data: [
            { name: 'Espresso', price: 3.5 },
            { name: 'Latte', price: 4.5 },
        ],
    });

    console.log('Seed data inserted!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });