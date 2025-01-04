import React from "react";
import { View, Text, Button, TextInput, Modal } from "react-native";

import AccountForm from "./AccountForm";

export default function Header({ ...delegated }) {
  const [showModal, setShowModal] = React.useState(false);
  return showModal ? (
    <Modal>
      <AccountForm {...delegated} />
      <Button onPress={() => setShowModal(false)} title="Hide account form" />
    </Modal>
  ) : (
    <View>
      <Button onPress={() => setShowModal(true)} title="Show account form" />
    </View>
  );
}
