import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import { SvgUri } from 'react-native-svg';

const link = "https://cors-anywhere.herokuapp.com/https://api.hgbrasil.com/weather?key=96ec0872&city_name=Recife,PE";

export default function App() {
  const [weatherInfo, setWeatherInfo] = useState('');

  useEffect(() => {    
    axios.get(link)
    .then(response => setWeatherInfo(response.data))
    .catch(error => console.error('API Error', error));
  }, []);
  
  const { results } = weatherInfo;
  const forecastDays = 8;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}> 
        <Text style={styles.city}>{results?.city}</Text>
        {results?.forecast.slice(0, 1).map((day, i) =>
          <SvgUri
            key={i}
            uri={`https://cors-anywhere.herokuapp.com/https://assets.hgbrasil.com/weather/icons/conditions/${day.condition}.svg`}
          />  
        )}
        <Text style={styles.date}>{results?.date}</Text>
      </View>

      <View style={styles.main}>
        <Text style={styles.temp}>{results?.temp}°C</Text>
        <Text style={styles.rainLabel}>precipitações</Text>
        <Text style={styles.tempRange}>max: {results?.forecast[0].max}°C, min: {results?.forecast[0].min}°C </Text>
      </View>

      <View style={styles.stats}>
        <Text style={styles.stat}>umidade: {results?.humidity}%</Text>
        <Text style={styles.stat}>Chuva: {results?.forecast[0].rain_probability} %</Text>
        <Text style={styles.stat}>Vento: {results?.wind_speedy}</Text>
      </View>

      <View style={styles.extraInfo}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Fase da Lua: {results?.moon_phase}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>direção do vento: {results?.wind_direction}°</Text>
          <Text style={styles.infoText}>description: {results?.description}</Text>
        </View>
      </View>
      
      <ScrollView style={styles.forecastScroll}>
        {results?.forecast.slice(0, forecastDays).map((day, i) => (
          <View key={i} style={styles.forecastBox}>
            <SvgUri
              uri={`https://cors-anywhere.herokuapp.com/https://assets.hgbrasil.com/weather/icons/conditions/${day.condition}.svg`}
            />   
            <Text style={styles.forecastDate}>{day.date}</Text>
            <Text style={styles.forecastTemp}>max: {day.max}°C</Text>
            <Text style={styles.forecastTemp}>min: {day.min}°C</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1B33', // Deep space blue
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center'
  },
  city: {
    color: '#2A9D8F', // Teal
    fontSize: 24,
    fontWeight: '600',
  },
  date: {
    color: '#E9C46A', // Golden yellow
    fontSize: 16,
  },
  main: {
    alignItems: 'center',
    marginBottom: 20,
  },
  temp: {
    fontSize: 60,
    color: '#FFFFFF', // White
    fontWeight: 'bold',
  },
  rainLabel: {
    color: '#F4A261', // Sandy brown
    fontSize: 18,
  },
  tempRange: {
    color: '#E9C46A', // Golden yellow
    fontSize: 16,
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: '#152642', // Navy blue
    borderRadius: 12,
    padding: 10,
    marginTop: 15,
    width: '90%',
    justifyContent: 'space-between',
  },
  stat: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  extraInfo: {
    marginTop: 20,
    width: '100%',
    paddingLeft: 20,
  },
  infoBox: {
    backgroundColor: '#2A9D8F', // Teal
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  forecastScroll: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  forecastBox: {
    backgroundColor: '#264653', // Dark teal
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  forecastDate: {
    color: '#E9C46A', // Golden yellow
    fontSize: 16,
    marginTop: 5,
  },
  forecastTemp: {
    color: '#FFFFFF',
    fontSize: 14,
    marginVertical: 2,
  },
});