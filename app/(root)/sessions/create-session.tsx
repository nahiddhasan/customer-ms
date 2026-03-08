import { SessionRepository } from "@/repositories/session.repository";
import { useAuthStore } from "@/stores/auth.store";
import { useState } from "react";
import {
    Alert,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function CreateSessionScreen() {
  const [sessionName, setSessionName] = useState("");
  const [sessionYear, setSessionYear] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useAuthStore((state) => state.user);

  const handleSubmit = async () => {
    if (!sessionName || !sessionYear) {
      Alert.alert("Validation", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await SessionRepository.create(user.id, {
        session_name: sessionName,
        session_year: Number(sessionYear),
        is_current: isCurrent ? 1 : 0,
      });

      Alert.alert("Success", "Session created");

      setSessionName("");
      setSessionYear("");
      setIsCurrent(false);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to create session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold mb-6">Create Session</Text>

      {/* Session Name */}
      <View className="mb-4">
        <Text className="mb-1 text-gray-700">Session Name</Text>
        <TextInput
          value={sessionName}
          onChangeText={setSessionName}
          placeholder="Example: 2024-2025"
          className="border border-gray-300 rounded-lg p-3"
        />
      </View>

      {/* Session Year */}
      <View className="mb-4">
        <Text className="mb-1 text-gray-700">Session Year</Text>
        <TextInput
          value={sessionYear}
          onChangeText={setSessionYear}
          keyboardType="numeric"
          placeholder="Example: 2024"
          className="border border-gray-300 rounded-lg p-3"
        />
      </View>

      {/* Current Session */}
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-gray-700">Current Session</Text>
        <Switch value={isCurrent} onValueChange={setIsCurrent} />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        className="bg-blue-600 p-4 rounded-lg"
      >
        <Text className="text-white text-center font-semibold">
          {loading ? "Saving..." : "Create Session"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
