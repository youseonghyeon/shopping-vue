export function goToProductDetail(router, productId) {
    router.push({name: "ProductDetail", params: {id: productId}});
}
