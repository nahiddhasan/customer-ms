import CustomerCard from "@/components/customerCard";
import { customers1 } from "@/constants/data";
import { Customer } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  customers: Customer[];
};

export default function CustomerList({ customers }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 px-4">
        <FlatList
          data={customers1}
          keyExtractor={(item) => item.uuid}
          renderItem={({ item }) => <CustomerCard customer={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        />

        {/* Floating Add Button */}
        <Pressable
          onPress={() => router.push("/(root)/customers/add-customer")}
          className="absolute bottom-6 right-6 bg-blue-600 w-16 h-16 rounded-full items-center justify-center shadow-lg"
        >
          <Ionicons name="add" size={28} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
