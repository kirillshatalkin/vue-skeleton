const priceFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' });

export const formatPrice = (price: number) => priceFormat.format(price);
