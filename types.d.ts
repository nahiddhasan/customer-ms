export type Customer = {
  id: number;
  uuid: string;
  customer_name: string;
  customer_village?: string;
  phone?: string;
  image?: string;

  total_land: number;
  total_cost: number;
  paid: number;
};
