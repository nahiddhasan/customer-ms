import { Customer } from "@/types";
import { Image, Text, View } from "react-native";

type Props = {
  customer: Customer;
};

export default function CustomerCard({ customer }: Props) {
  const due = customer.total_cost - customer.paid;

  return (
    <View className="bg-white p-4 mb-3 rounded-xl shadow border border-gray-100">
      <View className="flex-row items-center gap-3">
        {customer.image ? (
          <Image
            source={{ uri: customer.image }}
            className="w-14 h-14 rounded-full"
          />
        ) : (
          <View className="w-14 h-14 rounded-full bg-gray-200 items-center justify-center">
            <Text className="text-lg font-bold">
              {customer.customer_name.charAt(0)}
            </Text>
          </View>
        )}

        <View className="flex-1">
          <Text className="text-lg font-semibold">
            {customer.customer_name}
          </Text>

          {customer.customer_village && (
            <Text className="text-gray-500 text-sm">
              {customer.customer_village}
            </Text>
          )}

          {customer.phone && (
            <Text className="text-gray-500 text-sm">{customer.phone}</Text>
          )}
        </View>
      </View>

      <View className="flex-row justify-between mt-3">
        <Text className="text-sm">Land: {customer.total_land}</Text>
        <Text className="text-sm">Cost: {customer.total_cost}</Text>
        <Text className="text-sm text-red-500">Due: {due}</Text>
      </View>
    </View>
  );
}
