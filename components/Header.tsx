import React from "react";
import { View, Text, Button, TextInput, Modal } from "react-native";

import DataForm from "./DataForm";

export default function Header({ ...delegated }) {
  const [showModal, setShowModal] = React.useState(false);
  return showModal ? (
    <Modal>
      <DataForm {...delegated} />
      <Button onPress={() => setShowModal(false)} title="Hide data form" />
    </Modal>
  ) : (
    <View>
      <Button onPress={() => setShowModal(true)} title="Show data form" />
    </View>
  );
}
