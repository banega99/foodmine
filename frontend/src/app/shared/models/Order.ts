import { LatLng } from 'leaflet';
import { CartItem } from './CartItem';

export class Order {
  id!: number;
  items!: CartItem[];
  total_price!: number;
  name!: string;
  address!: string;
  addressLatLng?: LatLng;
  payment_id!: string;
  createdAt!: string;
  status!: string;
  userId!: string;
}
