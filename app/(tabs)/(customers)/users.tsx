import React, { useEffect, useState } from "react";
import { Alert, Button, FlatList, Text, TextInput, View } from "react-native";
import { UserRepository } from "../../../repositories/user.repository";

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  const loadUsers = () => {
    const data = UserRepository.findAll();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = () => {
    if (!name || !email) {
      Alert.alert("Error", "Name and Email required");
      return;
    }

    try {
      if (editingId) {
        UserRepository.update(editingId, { name, email });
        setEditingId(null);
      } else {
        UserRepository.create({ name, email });
      }

      setName("");
      setEmail("");
      loadUsers();
    } catch (error) {
      Alert.alert("Database Error", error.message);
    }
  };

  const handleDelete = (id) => {
    UserRepository.delete(id);
    loadUsers();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button
        title={editingId ? "Update User" : "Create User"}
        onPress={handleSubmit}
      />

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{ marginTop: 15, borderBottomWidth: 1, paddingBottom: 10 }}
          >
            <Text>Name: {item.name}</Text>
            <Text>Email: {item.email}</Text>

            <Button
              title="Edit"
              onPress={() => {
                setName(item.name);
                setEmail(item.email);
                setEditingId(item.id);
              }}
            />

            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
