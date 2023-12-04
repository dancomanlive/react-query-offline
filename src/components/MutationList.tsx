import React from "react";
import { ScrollView, View } from "react-native";
import { styles } from "../styles/MutationList.styles";
import { Mutation } from "../types";
import MutationInfo from "./MutationInfo";

interface MutationListProps {
  mutations: Mutation[]; // Array of mutations.
}

export default function MutationsList({ mutations }: MutationListProps) {
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
}
