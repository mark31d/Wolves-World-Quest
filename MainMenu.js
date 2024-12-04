import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WolfDataContext } from './WolfDataContext';

const { width, height } = Dimensions.get('window');
const defaultProfilePhoto = require('./user_17740838.png'); 
const background = require('./Background.png'); 

const MainMenu = ({ navigation }) => {
  const [profilePhoto, setProfilePhoto] = useState(null); 
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const scrollViewRef = useRef(null);
  const { wolfData } = useContext(WolfDataContext);


  useEffect(() => {
    const loadProfilePhoto = async () => {
      try {
        const storedPhoto = await AsyncStorage.getItem('profilePhoto');
        if (storedPhoto) {
          console.log('Loaded profile photo URI:', storedPhoto); // Лог URI
          setProfilePhoto(storedPhoto);
        } else {
          console.log('No profile photo found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error loading profile photo:', error);
      }
    };
  
    loadProfilePhoto();
  }, []);

 
  useEffect(() => {
    setFilteredData(wolfData);
  }, [wolfData]);

  const handleSearch = (text) => {
    setSearchText(text);
    if (!text) {
      setFilteredData(wolfData);  
    } else {
      const matchedWolf = wolfData.find((wolf) =>
        wolf.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(matchedWolf ? [matchedWolf] : []);
    }
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView ref={scrollViewRef} style={styles.feed}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.wolfButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Image
                source={profilePhoto ? { uri: profilePhoto } : defaultProfilePhoto}
                style={styles.wolfImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
          </View>

          {/* Main wolf image */}
          <Image source={require('./wolfface.png')} style={styles.mainWolfImage} />

          {/* Quiz button */}
          <TouchableOpacity
            style={styles.quizButton}
            onPress={() => navigation.navigate('QuizScreen')}
          >
            <Text style={styles.quizButtonText}>Test your knowledge</Text>
          </TouchableOpacity>

          {/* Search bar */}
          <TextInput
            placeholder="Search for breeds..."
            style={styles.searchBar}
            placeholderTextColor="white"
            value={searchText}
            onChangeText={handleSearch}
          />

          {/* Feed with wolf breeds */}
          {filteredData.map((item, index) => (
            <View key={index} style={styles.feedItem}>
              <Image
                source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                style={styles.feedImage}
              />
              <View style={styles.feedText}>
                <Text style={styles.feedTitle}>{item.name}</Text>
                <TouchableOpacity
                  style={styles.learnMoreButton}
                  onPress={() =>
                    navigation.navigate('LearnMoreScreen', {
                      breed: item.name,
                    })
                  }
                >
                  <Text style={styles.learnMoreText}>Learn More</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('AddArticle')}
          >
            <Text style={styles.actionButtonText}>Add New Article</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Progress')}
          >
            <Text style={styles.actionButtonText}>ScoreBoard</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
      
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  wolfButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A148C', // Глубокий фиолетовый
    borderRadius: width * 0.1,
    width: width * 0.2,
    height: width * 0.2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  wolfImage: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.1,
  },
  settingsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A148C', 
    borderRadius: width * 0.1,
    width: width * 0.2,
    height: width * 0.2,
    borderColor: '#F8BBD0', 
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF', 
  },
  mainWolfImage: {
    zIndex: -1,
    width: width * 1,
    height: width * 1,
    alignSelf: 'center',
    marginBottom: -60,
    marginTop: -40,
    borderRadius: 100,
  },
  quizButton: {
    backgroundColor: '#4A148C', 
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '85%',
    marginBottom: 10,
    borderColor: '#F8BBD0',
    borderWidth: 2,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  quizButtonText: {
    fontSize: 20,
    color: '#FFFFFF', 
    fontWeight: 'bold',
  },
  searchBar: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 30,
    backgroundColor: '#4A148C',
    
    textAlign: 'center',
    width: '85%',
    fontSize: 20,
    marginBottom: 10,
    color: '#4A148C', 
    borderColor: '#F8BBD0', 
    borderWidth: 3,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  feed: {
    flex: 1,
    width: '100%',
    padding: 5,
  },
  feedItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F8BBD0', 
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#4A148C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  feedImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  feedText: {
    flex: 1,
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', 
  },
  learnMoreButton: {
    backgroundColor: '#F8BBD0', 
    marginTop: 5,
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  learnMoreText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4A148C', 
  },
  actionButton: {
    padding: 15,
    backgroundColor: '#4A148C', 
    alignItems: 'center',
    borderRadius: 30,
    width: '85%',
    alignSelf: 'center',
    marginVertical: 10,
    borderColor: '#F8BBD0', 
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // Чистый белый
  },
});

export default MainMenu;