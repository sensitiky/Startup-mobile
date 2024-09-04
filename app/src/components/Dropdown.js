import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const transactions = [
  { id: "1", description: "Compra en tienda", amount: "-$20.00" },
  { id: "2", description: "Depósito", amount: "+$100.00" },
  { id: "3", description: "Pago de servicio", amount: "-$50.00" },
];

const data = transactions.map((transaction) => ({
  label: transaction.description,
  value: transaction.amount,
}));

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>Saldo: $500.00</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && styles.dropdownFocus]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Seleccione su transacción" : "..."}
        searchPlaceholder="Filtrar.."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "col",
    width: "100%",
  },
  dropdown: {
    height: 50,
  },
  dropdownFocus: {
    width: "100%",
    borderColor: "blue",
    height: "100%",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  filter: {
    width: 20,
    height: 20,
    margin: 5,
  },
  balanceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
});
