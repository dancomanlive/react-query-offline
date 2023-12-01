import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Mutation } from "../shared-types";
import MutationInfo from "./MutationInfo";

interface MutationListProps {
  mutations: Mutation[];
}

const MutationsList = ({ mutations }: MutationListProps) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {mutations.map((mutation, index) => (
          <View key={index} style={styles.mutationItem}>
            <MutationInfo mutation={mutation} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  mutationItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
  },
});

export default MutationsList;
