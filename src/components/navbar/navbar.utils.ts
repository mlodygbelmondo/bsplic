export const formatBalance = (money: number) => {
  const formatter = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  });

  return formatter.format(money);
};
