const pool = require("../db");
const { faker } = require("@faker-js/faker");

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 5000;

const categories = [
    "Electronics",
    "Fashion",
    "Books",
    "Home",
    "Sports",
    "Beauty",
    "Toys",
    "Furniture"
];

async function seedDatabase() {
    try {

        console.log("Dropping old table...");

        await pool.query(`
      DROP TABLE IF EXISTS products;
    `);

        console.log("Creating products table...");

        await pool.query(`
      CREATE TABLE products (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      );
    `);

        console.log("Generating products...");

        for (let i = 0; i < TOTAL_PRODUCTS; i += BATCH_SIZE) {

            const values = [];
            const placeholders = [];

            let param = 1;

            for (let j = 0; j < BATCH_SIZE && i + j < TOTAL_PRODUCTS; j++) {

                const createdAt = faker.date.past();

                const updatedAt = faker.date.between({
                    from: createdAt,
                    to: new Date()
                });

                values.push(
                    faker.commerce.productName(),
                    categories[Math.floor(Math.random() * categories.length)],
                    faker.commerce.price({
                        min: 100,
                        max: 50000
                    }),
                    createdAt,
                    updatedAt
                );

                placeholders.push(
                    `($${param++},$${param++},$${param++},$${param++},$${param++})`
                );
            }

            await pool.query(
                `
        INSERT INTO products
        (name,category,price,created_at,updated_at)
        VALUES
        ${placeholders.join(",")}
        `,
                values
            );

            console.log(
                `Inserted ${Math.min(i + BATCH_SIZE, TOTAL_PRODUCTS)} / ${TOTAL_PRODUCTS}`
            );
        }

        console.log("Creating indexes...");

        await pool.query(`
      CREATE INDEX idx_products_updated
      ON products(updated_at DESC,id DESC);
    `);

        await pool.query(`
      CREATE INDEX idx_products_category
      ON products(category,updated_at DESC,id DESC);
    `);

        console.log("✅ Successfully inserted 200000 products.");

    } catch (err) {
        console.log(err);
    } finally {
        await pool.end();
    }
}

seedDatabase();