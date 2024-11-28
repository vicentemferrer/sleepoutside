const { VITE_SERVER_URL: baseUrl } = import.meta.env;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
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

  async searchProducts(query, categories) {
    try {
      // // Ensure categories is a valid array
      // if (!Array.isArray(categories) || categories.length === 0) {
      //     throw new Error("Categories array is required and cannot be empty.");
      // }

      // Use Promise.all to handle multiple API requests concurrently
      const results = await Promise.all(
        categories.map(async (category) => {
          const res = await fetch(`${baseUrl}products/search/${category}`);
          if (!res.ok) {
            throw new Error(
              `API Error in category "${category}": ${res.statusText}`,
            );
          }
          let data = await convertToJson(res);
          return (data = data.Result || []);
        }),
      );

      // Combine results from all categories into a single array
      const combinedResults = results.flat();

      // Filter products by the search query (case-insensitive)
      const found = combinedResults.filter((product) =>
        product.Name.toLowerCase().includes(query.toLowerCase()),
      );

      return found; // Return filtered results
    } catch (error) {
      alert("Failed to fetch search results.");
      return []; // Return an empty array as fallback
    }
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const res = await fetch(`${baseUrl}checkout`, options);
    const data = await convertToJson(res);
    return data;
  }
}
