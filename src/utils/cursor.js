const encodeCursor = (updatedAt, id) => {
    return Buffer.from(`${updatedAt},${id}`).toString("base64");
};

const decodeCursor = (cursor) => {
    if (!cursor) return null;

    const decoded = Buffer.from(cursor, "base64").toString("utf8");
    const [updatedAt, id] = decoded.split(",");

    return {
        updatedAt,
        id: Number(id)
    };
};

module.exports = {
    encodeCursor,
    decodeCursor
};