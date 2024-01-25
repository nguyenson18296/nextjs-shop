export const formatVndCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
