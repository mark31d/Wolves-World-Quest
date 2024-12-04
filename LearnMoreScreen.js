import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { WolfDataContext } from './WolfDataContext';

const { width, height } = Dimensions.get('window');

const LearnMoreScreen = ({ route, navigation }) => {
  const { breed } = route.params;
  const { wolfData, updateWolfData } = useContext(WolfDataContext);
  const breedInfo = wolfData.find((b) => b.name === breed);

  const [isEditing, setIsEditing] = useState(false);
  const [localBreedInfo, setLocalBreedInfo] = useState(breedInfo);

  if (!localBreedInfo) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Breed not found.</Text>
      </View>
    );
  }

  const addPhoto = async () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
      if (!response.didCancel && !response.errorMessage && response.assets) {
        const newPhotoUri = response.assets[0].uri;
        const updatedPhotoAlbum = [...(localBreedInfo.photoAlbum || []), newPhotoUri];
        const updatedBreedInfo = { ...localBreedInfo, photoAlbum: updatedPhotoAlbum };

        setLocalBreedInfo(updatedBreedInfo); 
        updateWolfData(updatedBreedInfo.name, updatedBreedInfo); 
      }
    });
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        ...localBreedInfo,
        name: localBreedInfo.name.trim(), 
      };
      setLocalBreedInfo(updatedData); 
      await updateWolfData(breed, updatedData); 
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving breed changes:', error);
    }
  };
  return (
    <ImageBackground source={require('./Background.png')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.contentContainer}>
          <TouchableOpacity style={styles.exitButton} onPress={() => navigation.goBack()}>
            <Text style={styles.exitButtonText}>✖️</Text>
          </TouchableOpacity>

          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
  {localBreedInfo.photoAlbum && localBreedInfo.photoAlbum.length > 0 ? (
    localBreedInfo.photoAlbum.map((uri, index) => (
      <Image
        key={index}
        source={typeof uri === 'string' ? { uri } : uri}
        style={styles.mainImage}
      />
    ))
  ) : (
    <Text style={styles.noPhotosText}>No photos available</Text>
  )}
</ScrollView>

          {isEditing ? (
            <TextInput
              style={styles.nameInput}
              value={localBreedInfo.name}
              onChangeText={(text) =>
                setLocalBreedInfo((prev) => ({ ...prev, name: text }))
              }
            />
          ) : (
            <Text style={styles.breedName}>{localBreedInfo.name}</Text>
          )}

          {isEditing ? (
            <TextInput
              style={styles.detailsInput}
              multiline
              value={localBreedInfo.details}
              onChangeText={(text) =>
                setLocalBreedInfo((prev) => ({ ...prev, details: text }))
              }
            />
          ) : (
            <Text style={styles.details}>{localBreedInfo.details}</Text>
          )}

          <TouchableOpacity style={styles.addPhotoButton} onPress={addPhoto}>
            <Text style={styles.addPhotoButtonText}>Add Photo</Text>
          </TouchableOpacity>

          {/* Кнопка Edit только для пользовательских пород */}
          {!localBreedInfo.isStock && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
            >
              <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
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
  contentContainer: {
    padding: 20,
  },
  exitButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#F8BBD0',   
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderColor: '#4A148C',
    borderWidth: 2,
    marginBottom: 10,
  },
  exitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mainImage: {
    width: width * 0.8,
    height: height * 0.3,
    marginRight: 10,
    borderRadius: 10,
  },
  noPhotosText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
  },
  breedName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    marginVertical: 10,
  },
  nameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginVertical: 10,
  },
  details: {
    fontWeight:'bold',
    fontSize: 17,
    color: '#4A148C',
    marginVertical: 20,
  },
  detailsInput: {
    fontSize: 16,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginVertical: 10,
  },
  addPhotoButton: {
    backgroundColor: '#4A148C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addPhotoButtonText: {
    color: '#F8BBD0',
    fontWeight: 'bold',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#4A148C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  editButtonText: {
    color: '#F8BBD0',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 20,
    color: 'red',
  },
});

export default LearnMoreScreen;