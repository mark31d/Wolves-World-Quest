import React from 'react';
import { 
  View, 
  Text, 
  Switch, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  ImageBackground, 
  SafeAreaView 
} from 'react-native';

import { useAudio } from './Audio';
import { useVibration } from './VibrationContext';

const { width, height } = Dimensions.get('window');

const SettingsScreen = ({ navigation }) => {
  const { isMusicPlaying, setIsMusicPlaying, volume, setVolume } = useAudio();
  const { vibrationOn, setVibrationOn } = useVibration();

  const handleVolumeChange = (change) => {
    const newVolume = Math.max(0, Math.min(1, volume + change));
    setVolume(newVolume);
  };

  return (
    <ImageBackground source={require('./Background.png')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Settings</Text>

         
          <View style={styles.setting}>
            <Text style={styles.settingText}>Vibration</Text>
            <Switch
  value={vibrationOn}
  onValueChange={setVibrationOn}
  trackColor={{ false: '#D32F2F', true: '#388E3C' }}
  thumbColor={vibrationOn ? '#8BC34A' : '#F8BBD0'}
/>
          </View>

        
          <View style={styles.setting}>
            <Text style={styles.settingText}>Music Volume: {Math.round(volume * 100)}%</Text>
            <View style={styles.volumeControls}>
              <TouchableOpacity onPress={() => handleVolumeChange(-0.1)} style={styles.button}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleVolumeChange(0.1)} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          
          <View style={styles.setting}>
            <Text style={styles.settingText}>Turn Music On/Off</Text>
            <Switch
  value={isMusicPlaying}
  onValueChange={setIsMusicPlaying}
  trackColor={{ false: '#D32F2F', true: '#388E3C' }}
  thumbColor={isMusicPlaying ? '#8BC34A' : '#F8BBD0'}
/>
          </View>

          
          <TouchableOpacity  style={styles.exitButton} onPress={() => navigation.navigate('MainMenu')}>
            <Text style={styles.exitButtonText}>Return to Main Menu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: width * 0.05,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    color: '#4A148C', 
    textAlign: 'center',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: height * 0.02,
    padding: height * 0.025,
    borderRadius: 20,
    backgroundColor: '#4A148C', 
    borderColor: '#F8BBD0', 
    borderWidth: 2,
    opacity:0.9,
  },
  settingText: {
    fontSize: width * 0.05,
    color: '#FFFFFF',
    flex: 1,
  },
  volumeControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: width * 0.12,
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8BBD0',
    borderRadius: 20,
    marginHorizontal: width * 0.03,
    
  },
  buttonText: {
    fontSize: width * 0.06,
    color: '#333',
    fontWeight: 'bold',
  },
 
  exitButton: {
    marginTop: height * 0.05,
    backgroundColor: '#4A148C', 
    borderRadius: 50,
    paddingVertical: height * 0.025,
    paddingHorizontal: width * 0.2,
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth:1.5,
    borderColor:'#F8BBD0',
  },
  exitButtonText: {
    fontWeight: 'bold',
    fontSize: width * 0.05,
    color: '#FFFFFF',
  },
});

export default SettingsScreen;