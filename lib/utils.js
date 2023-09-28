export const currencyFormatter = (amount) => {
    const formatter = new Intl.NumberFormat("pt-BR", {
        currency: "BRL",
        style: "currency"
    });

    return formatter.format(amount);
};
