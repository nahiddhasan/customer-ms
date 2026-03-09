import { CustomerRepository } from "@/repositories/customer.repository";
import { useSessionStore } from "@/stores/session.store";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function CreateCustomer() {
  const session = useSessionStore((s) => s.currentSession);

  const [form, setForm] = useState({
    customer_name: "",
    customer_village: "",
    phone: "",
    image: "",
    total_land: "",
    total_cost: "",
    paid: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    if (!form.customer_name) {
      Alert.alert("Validation", "Customer name required");
      return;
    }

    try {
      await CustomerRepository.create(session.id, {
        ...form,
        total_land: Number(form.total_land) || 0,
        total_cost: Number(form.total_cost) || 0,
        paid: Number(form.paid) || 0,
      });

      Alert.alert("Success", "Customer created");

      setForm({
        customer_name: "",
        customer_village: "",
        phone: "",
        image: "",
        total_land: "",
        total_cost: "",
        paid: "",
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to create customer");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold mb-6">Create Customer</Text>

      {/* Customer Name */}
      <View className="mb-4">
        <Text className="mb-1 text-gray-600">Customer Name</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3"
          placeholder="Enter name"
          value={form.customer_name}
          onChangeText={(v) => handleChange("customer_name", v)}
        />
      </View>

      {/* Village */}
      <View className="mb-4">
        <Text className="mb-1 text-gray-600">Village</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3"
          placeholder="Village"
          value={form.customer_village}
          onChangeText={(v) => handleChange("customer_village", v)}
        />
      </View>

      {/* Phone */}
      <View className="mb-4">
        <Text className="mb-1 text-gray-600">Phone</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3"
          placeholder="Phone number"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(v) => handleChange("phone", v)}
        />
      </View>

      {/* Total Land */}
      <View className="mb-4">
        <Text className="mb-1 text-gray-600">Total Land</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3"
          placeholder="0"
          keyboardType="numeric"
          value={form.total_land}
          onChangeText={(v) => handleChange("total_land", v)}
        />
      </View>

      {/* Total Cost */}
      <View className="mb-4">
        <Text className="mb-1 text-gray-600">Total Cost</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3"
          placeholder="0"
          keyboardType="numeric"
          value={form.total_cost}
          onChangeText={(v) => handleChange("total_cost", v)}
        />
      </View>

      {/* Paid */}
      <View className="mb-6">
        <Text className="mb-1 text-gray-600">Paid</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3"
          placeholder="0"
          keyboardType="numeric"
          value={form.paid}
          onChangeText={(v) => handleChange("paid", v)}
        />
      </View>

      {/* Button */}
      <Pressable
        onPress={handleSubmit}
        className="bg-blue-600 p-4 rounded-xl items-center"
      >
        <Text className="text-white font-semibold text-lg">Save Customer</Text>
      </Pressable>
    </ScrollView>
  );
}
