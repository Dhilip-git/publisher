import React, {useState, createRef, useContext} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';

import {showMessage} from 'react-native-flash-message';
import {StateContext} from '../Context/state-context.js';

const Home = props => {
  const [state, dispatch] = useContext(StateContext);
  const [publisher, setPublisher] = useState('');
  const [location, setLocation] = useState('');
  const [visible, setVisible] = useState(false);
  const [actionType, setActionType] = useState('edit');
  const [editIndex, setEditIndex] = useState('');
  const [editPublisher, setEditPublisher] = useState('');
  const [editLocation, setEditLocation] = useState('');

  const publisherInputRef = createRef();
  const locationInputRef = createRef();

  const toggle = () => {
    setVisible(!visible);
    setPublisher('');
    setLocation('');
  };

  const onSubmit = (publisher, location) => {
    console.log('val', publisher, location);
    if (!publisher) {
      showMessage({
        message: 'Please Enter the Publisher Name',
        type: 'danger',
        icon: 'danger',
        duration: 3500,
      });
      return;
    } else if (!location) {
      showMessage({
        message: 'Please Enter the Location',
        type: 'danger',
        icon: 'danger',
        duration: 3500,
      });
      return;
    } else {
      dispatch({
        type: 'ADD_ITEM',
        payload: {publisher: publisher, location: location},
      });
      setPublisher('');
      setLocation('');
    }
  };

  const onDelete = (id, actionType) => {
    console.log('ondelete', id, actionType);
    if (actionType == 'save') {
      setActionType('edit');
      setEditIndex('');
    }
    dispatch({
      type: 'DELETE_ITEM',
      payload: id,
    });
  };

  const onEdit = (id, status) => {
    setActionType('save');
    setEditIndex(id);
  };

  const onSave = (id, status, arr) => {
    setActionType('edit');
    setEditIndex(id);

    dispatch({
      type: 'UPDATE_ITEM',
      payload: {updatedArray: arr},
    });
  };

  const onEditPublisher = (value, arr, index) => {
    console.log('values', value);
    setEditPublisher(value);
    arr[index].name = value;
  };

  const onEditLocation = (value, arr, index) => {
    setEditLocation(value);
    arr[index].location = value;
  };

  const renderCreate = () => {
    return (
      <TouchableOpacity style={styles.buttonStyle} onPress={() => toggle()}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    );
  };

  const renderInputDetails = () => {
    return (
      <>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              onChangeText={publisher => setPublisher(publisher)}
              underlineColorAndroid="#f000"
              placeholder="Publisher Name"
              placeholderTextColor="grey"
              ref={publisherInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              value={publisher}
              style={{width: '100%'}}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              onChangeText={location => setLocation(location)}
              underlineColorAndroid="#f000"
              placeholder="Location"
              placeholderTextColor="grey"
              ref={locationInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              value={location}
              style={{width: '100%'}}
            />
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => onSubmit(publisher, location)}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.titleHeader}>
        <Text style={[styles.headerTextStyle, {width: '30%'}]}>
          {' '}
          Publisher{' '}
        </Text>
        <Text style={[styles.headerTextStyle, {width: '50%', paddingLeft: 5}]}>
          {' '}
          Location{' '}
        </Text>
        <Text style={[styles.headerTextStyle, {width: '20%'}]}> Actions </Text>
      </View>
    );
  };

  const renderData = (item, index) => {
    return (
      <View style={styles.titleHeader} key={index}>
        {actionType == 'edit' ? (
          <View style={{flexDirection: 'row'}}>
            <Text style={{width: '40%', fontSize: 20}}> {item.name} </Text>
            <Text style={{width: '40%', fontSize: 20}}> {item.location} </Text>
          </View>
        ) : actionType == 'save' && editIndex == index ? (
          <View style={{flexDirection: 'row'}}>
            <TextInput
              onChangeText={editPublisher =>
                onEditPublisher(editPublisher, state.publisherDetail, index)
              }
              underlineColorAndroid="#f000"
              placeholder="Publisher Name"
              placeholderTextColor="grey"
              ref={publisherInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              value={item.name}
              style={styles.editInputStyle}
            />
            <TextInput
              onChangeText={editLocation =>
                onEditLocation(editLocation, state.publisherDetail, index)
              }
              underlineColorAndroid="#f000"
              placeholder="Publisher Name"
              placeholderTextColor="grey"
              ref={locationInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              value={item.location}
              style={styles.editInputStyle}
            />
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <Text style={{width: '40%', fontSize: 20}}> {item.name} </Text>
            <Text style={{width: '40%', fontSize: 20}}> {item.location} </Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.editButtonStyle}
          onPress={() =>
            actionType != 'edit'
              ? editIndex != index
                ? onEdit(index, actionType)
                : onSave(index, actionType, state.publisherDetail)
              : onEdit(index, actionType)
          }>
          <Text style={{textAlign: 'center', color: 'white'}}>
            {actionType != 'edit'
              ? editIndex != index
                ? 'Edit'
                : 'Save'
              : 'Edit'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButtonStyle}
          onPress={() => onDelete(index, actionType)}>
          <Text style={{textAlign: 'center', color: 'white'}}>delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'grey'}}>
      <View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View style={{alignItems: 'center', marginTop: '5%'}}>
            {renderCreate()}
          </View>
          {visible ? renderInputDetails() : null}
        </ScrollView>
      </View>
      <KeyboardAvoidingView style={{flex: 2, marginTop: '5%'}}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View>
            {state.publisherDetail && state.publisherDetail.length > 0 ? (
              <View>
                {renderHeader()}
                <FlatList
                  data={state.publisherDetail}
                  renderItem={({item, index}) =>
                    renderData(item, index)
                  }></FlatList>
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '20%',
                }}>
                <Text style={styles.buttonText}>No Publisher Found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: '25%',
    width: '80%',
    marginTop: 10,
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
    alignSelf: 'center',
  },
  bottomContainer: {
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    height: 50,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E90FF',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    marginBottom: 5,
  },
  editInputStyle: {
    width: '38%',
    height: 30,
    borderRadius: 5,
    borderWidth: 2,
    marginRight: '2%',
    fontSize: 20,
    padding: 5,
  },
  titleHeader: {
    flexDirection: 'row',
    width: '100%',
    padding: 5,
  },
  editButtonStyle: {
    width: '9%',
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#1E90FF',
    marginRight: 3,
    justifyContent: 'center',
  },
  deleteButtonStyle: {
    width: '11%',
    backgroundColor: 'red',
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
  },
  headerTextStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Home;
