const pool = require("../db");
const { encodeCursor, decodeCursor } = require("../utils/cursor");

const getProducts = async(req, res, next) => {
    try {
        let { limit, cursor, category } = req.query;

        limit = parseInt(limit) || 20;

        let query = `
      SELECT
        id,
        name,
        category,
        price,
        created_at,
        updated_at
      FROM products
    `;

        const values = [];
        const conditions = [];

        if (category) {
            values.push(category);
            conditions.push(`category = $${values.length}`);
        }

        if (cursor) {
            const decoded = decodeCursor(cursor);

            values.push(decoded.updatedAt);
            values.push(decoded.id);

            conditions.push(`
        (
          updated_at < $${values.length - 1}
          OR
          (
            updated_at = $${values.length - 1}
            AND
            id < $${values.length}
          )
        )
      `);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        query += `
      ORDER BY updated_at DESC, id DESC
      LIMIT ${limit + 1}
    `;

        const result = await pool.query(query, values);

        let products = result.rows;
        let nextCursor = null;

        if (products.length > limit) {
            const lastProduct = products[limit - 1];

            nextCursor = encodeCursor(
                lastProduct.updated_at.toISOString(),
                lastProduct.id
            );

            products = products.slice(0, limit);
        }

        res.status(200).json({
            success: true,
            count: products.length,
            nextCursor,
            products
        });
    } catch (error) {
        next(error);
    }
};

const getCategories = async(req, res, next) => {
    try {
        const result = await pool.query(`
      SELECT DISTINCT category
      FROM products
      ORDER BY category
    `);

        res.status(200).json({
            success: true,
            categories: result.rows.map(item => item.category)
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getCategories
};