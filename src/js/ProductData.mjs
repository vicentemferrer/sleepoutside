const { VITE_SERVER_URL: baseUrl } = import.meta.env;

function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad Response");
    }
}

export default class ProductData {
    async getData(category) {
        const res = await fetch(`${baseUrl}products/search/${category}`);
        const data = await convertToJson(res);

        return data.Result;
    }
    async findProductById(id) {
        const res = await fetch(`${baseUrl}product/${id}`);
        const data = await convertToJson(res);

        return data.Result;
    }
}
