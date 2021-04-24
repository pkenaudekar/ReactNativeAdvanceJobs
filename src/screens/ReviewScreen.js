import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitleAlign: 'center',
    headerRight: () => (
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
        type="clear"
      >
        Go Right
      </Button>
    ),

    style: {
      marginTop: Platform.OS === 'android' ? 24 : 0,
    },
  });

  renderLikedJobs() {
    return this.props.likedJobs.map((job) => {
      const {
        company,
        formattedRelativeTime,
        url,
        longitude,
        latitude,
        jobtitle,
        jobkey,
      } = job;
      const initialRegion = {
        longitude,
        latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02,
      };

      return (
        <Card key={jobkey}>
          <Card.Title>{jobtitle}</Card.Title>
          <Card.Divider />
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              scrollEnabled={false}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply Now!"
              buttonStyle={{ backgroundColor: '#03A9F4' }}
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return <ScrollView>{this.renderLikedJobs()}</ScrollView>;
  }
}

const styles = {
  italics: {
    fontStyle: 'italic',
  },
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
};

const mapStateToProps = (state) => {
  return { likedJobs: state.likedJobs };
};

export default connect(mapStateToProps)(ReviewScreen);
