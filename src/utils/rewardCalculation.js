export const calculateRewardPoints = (price) => {
  price = Math.round(price);
  if(price <=50) return 0;
  if(price <=100) return price-50;
  return 50+2*(price-100);
};