import React, { useEffect, useRef } from 'react'; 
import { View, Animated, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';

const Loader = ({ onEnd }) => {
  const appearingAnim = useRef(new Animated.Value(0)).current; 
  const disappearingAnim = useRef(new Animated.Value(1)).current; 
  const { width } = Dimensions.get('window'); 

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(disappearingAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => onEnd()); 
    }, 8000);
  }, []);

  return (
    <ImageBackground
      source={require('./Background.png')} 
      style={styles.backgroundImage}
    >
      <Animated.View
        style={[
          styles.loaderContainer,
          { opacity: disappearingAnim }, 
        ]}
      >
        <Animated.Image
          source={require('./wolfface.png')} 
          style={[
            styles.logoImage,
            { width: width * 1.3, height: width * 1.3, opacity: appearingAnim }, 
          ]}
        />
        <Animated.Text
          style={[
            styles.loaderText,
            { opacity: appearingAnim }, 
          ]}
        >
          Wolves World Quest
        </Animated.Text>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  loaderContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Сделали фон чуть более контрастным
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderText: {
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40,
    color: '#F8BBD0', 
    textShadowColor: 'rgba(0, 0, 0, 0.8)', 
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 10,
  },
  logoImage: {
    alignSelf: 'center',
    marginBottom: -60,
    borderRadius: 200,
    
  },
});

export default Loader;
