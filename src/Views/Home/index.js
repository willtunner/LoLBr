import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, FlatList } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Appbar,
  IconButton,
  Searchbar,
} from "react-native-paper";
import axios from "axios";

import api from "../../services/api";
const championsList = require("../../jsons/champion.json");

import ChampionsRotation from '../../components/ChampionsRotations';

import { API_KEY } from "@env";

export default function Home({ route, navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const [freeChampionIds, setFreeChampionIds] = useState([]);
  const [
    freeChampionIdsForNewPlayers,
    setFreeChampionIdsForNewPlayers,
  ] = useState([]);
  const [championRotation, setChampionRotation] = useState([]);
  const [championRotationNewPlayer, setChampionRotationNewPlayer] = useState(
    []
  );

  const asArray = Object.entries(championsList.data);

  useEffect(() => {
    // Pega Rotação de Champions
    api
      .get(
        `https://br1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-14ee9d9d-ff64-4d91-a053-ce94f26b99d0`
      )
      .then((response) => {
        setFreeChampionIds(response.data.freeChampionIds);
        setFreeChampionIdsForNewPlayers(
          response.data.freeChampionIdsForNewPlayers
        );
      });

    // Pega hero lv30+
    var champRotation = freeChampionIds.map((res) => {
      const champ = asArray.find((el) => {
        if (res == el[1].key) return el;
      });
      return champ;
    });

    setChampionRotation(champRotation);

    // Pega hero low lv
    var champRotationLowLv = freeChampionIdsForNewPlayers.map((res) => {
      const champ = asArray.find((el) => {
        if (res == el[1].key) return el;
      });
      return champ;
    });

    setChampionRotationNewPlayer(champRotationLowLv);

    console.log(championRotationNewPlayer);
  }, []);

  return (
    <View>
      <Appbar.Header>
        <Searchbar
          placeholder="Find your Hero!"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </Appbar.Header>

      <FlatList
        horizontal
        data={championRotation}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChampionsRotation navigation={navigation} data={item} />
        )}
      />

      <View style={styles.container}>
        <View elevation={5} style={styles.buttonContainer}>
          <Text style={styles.textStyle}>Shadow Applied</Text>
          <Text style={styles.textStyle}>Name:{API_KEY}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 20,
  },
  textStyle: {
    color: "#FFFFFF",
  },
  buttonContainer: {
    backgroundColor: "#2E9298",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    marginTop: 150,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    height: 150,
    width: 200,
    alignItems: "center",
    marginLeft: 20,
  },
});
