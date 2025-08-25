import { PrismaClient } from "@prisma/client/extension";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

    const categorias =await prisma.categoria.createMany({
        data: [
            {name: 'Ropa', description:'Prendas y accesorios'},
            {name: 'Calzado', description:'Zapatos y sandalias'},
            {name: 'Tecnologia', description:'Dispositivos electrónicos'}
        ]
    });

    const passwordHash = await bcrypt.hash("Admin123!", 10);   
    await prisma.usuario.create({
        data: {
            nombre: "Admin",
            email: "admin@admin.com",
            password: passwordHash,
            rol: "ADMIN"
        }
    });

    await prisma.producto.createMany({
        data: [
            { name: "Camiseta", description: "Camiseta de algodón", price: 19.99, stock:50, imageURL:'', categoryId:1},
            { name: "Pantalón", description: "Pantalón vaquero", price: 39.99, stock:30, imageURL:'', categoryId:4},
            { name: "Zapatillas", description: "Zapatillas deportivas", price: 59.99, stock:20, imageURL:'', categoryId:2},
            { name: "Smartphone", description: "Teléfono inteligente", price: 699.99, stock:10, imageURL:'', categoryId:3}
        ]
    });

    console.log({categorias});

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })

    .finally(async () => {
        await prisma.$disconnect();
    });