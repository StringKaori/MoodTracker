import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground, Dimensions, TouchableOpacity, Text, ViewStyle } from 'react-native';
import { MoodTypes, MoodTypesColor, MoodTypesString } from '../../Helpers/Enums/MoodTypes';
import { BarChart, barDataItem, stackDataItem } from "react-native-gifted-charts";
import { useState } from 'react';
import MoodIconBuilder from '../../Helpers/MoodIconBuilder';
import { generateRandomString } from '../../Helpers/ConvenienceFunctions/GenerateRandomString';

const screenWidth = Dimensions.get('window').width

export default function Dashboard() {
  const barWidth = (screenWidth * 0.5) / 3.2

  const activeButton: ViewStyle = {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderBottomColor: `transparent`
  }

  const inactiveButton: ViewStyle = {
    borderWidth: 0
  }

  const [weeklyBorderWidth, setWeeklyBorderWidth] = useState<ViewStyle>(activeButton)
  const [monthlyBorderWidth, setMonthlyBorderWidth] = useState<ViewStyle>(inactiveButton)

  const [shouldShowWeeklyChart, setShouldShowWeeklyChart] = useState<boolean>(true)
  const [shouldShowMonthlyChart, setShouldShowMonthlyChart] = useState<boolean>(false)

  const handlePress = (didPressWeekly: boolean) => {
    const weeklyState = didPressWeekly ? activeButton : inactiveButton
    const monthlyState = !didPressWeekly ? activeButton : inactiveButton

    setWeeklyBorderWidth(weeklyState)
    setMonthlyBorderWidth(monthlyState)

    setShouldShowWeeklyChart(didPressWeekly)
    setShouldShowMonthlyChart(!didPressWeekly)
  }
  
  // request enviando o username
  // retorna um array assim do top 4 moods mais utilizados:
  let weeklyMoodsMock = [
    {
      "id": 1,
      "quantity": 15 
    },
    {
      "id": 8,
      "quantity": 10 
    },
    {
      "id": 10,
      "quantity": 40 
    },
    {
      "id": 25,
      "quantity": 50 
    },
  ]

  let monthlyMoodsMock = [
    {
      "stack": [
        {
          "id": 1,
          "quantity": 15
        },
        {
          "id": 8,
          "quantity": 5
        },
      ],
      "label": 'Jan',
    },
    {
      "stack": [
        {
          "id": 10,
          "quantity": 15
        },
        {
          "id": 25,
          "quantity": 15
        },
      ],
      "label": 'Fev', 
    },
    {
      "stack": [
        {
          "id": 35,
          "quantity": 15
        },
        {
          "id": 1,
          "quantity": 15
        },
      ],
      "label": 'Mar',
    },
    {
      "stack": [
        {
          "id": 8,
          "quantity": 15
        },
        {
          "id": 10,
          "quantity": 15
        },
      ],
      "label": 'Apr',
    },
    {
      "stack": [
        {
          "id": 25,
          "quantity": 15
        },
        {
          "id": 30,
          "quantity": 15
        },
      ],
      "label": 'May',
    },
    {
      "stack": [
        {
          "id": 0,
          "quantity": 15
        },
        {
          "id": 27,
          "quantity": 15
        },
      ],
      "label": 'Jun',
    },
  ]

  var barData: barDataItem[] = []
  var stackBarData: stackDataItem[] = []
  var differentMoods: MoodTypes[] = []
  const moodCounts: { [key: string]: number } = {}

  weeklyMoodsMock.forEach(mood => {
    barData.push({ 
      value: mood.quantity,
      label: MoodTypes[mood.id] as MoodTypesString,
      frontColor: MoodTypesColor[MoodTypes[mood.id] as keyof typeof MoodTypesColor]
    })
  })

  monthlyMoodsMock.forEach(mood => {
    const stacks = mood["stack"].map(stack => {
      const moodString = MoodTypes[stack.id] as MoodTypesString
      if (!moodCounts[moodString]) {
        moodCounts[moodString] = 0;
      }
      moodCounts[moodString] += stack.quantity;

      if (!differentMoods.includes(stack.id)) {
        differentMoods.push(stack.id);
      }
      
      return {
          value: stack.quantity,
          color: MoodTypesColor[MoodTypes[stack.id] as keyof typeof MoodTypesColor],
          marginBottom: 2
      };
  });
    stackBarData.push(
      {
        stacks: stacks,
        label: mood["label"]
      }
    )
  })

  return (
    <ImageBackground 
     source={require("../../../assets/Images/AppBackground.png")}
     resizeMode="cover"
     style={styles.background}>
      <StatusBar style="auto" />
      <View style={styles.container}>

        <View style={styles.chartTypeSelectionContainer}>
          <TouchableOpacity 
           style={weeklyBorderWidth}
           onPress={() => handlePress(true)}>
            <Text style={styles.buttonText}>
              Weekly
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
           style={monthlyBorderWidth}
           onPress={() => handlePress(false)}>
            <Text style={styles.buttonText}>
              Monthly
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chartView}>
          { shouldShowWeeklyChart &&
            <View>
              <Text>Most frequent moods in the past week</Text>
              <BarChart 
               barWidth={barWidth}
               noOfSections={3}
               barBorderRadius={4}
               frontColor="lightgray"
               data={barData}
               yAxisThickness={0}
               xAxisThickness={0}/>
            </View>
          }

          { shouldShowMonthlyChart &&
            <View>
              <Text>Most frequent moods in the past 6 months</Text>
              <BarChart
               width={340}
               barWidth={12}
               spacing={35}
               noOfSections={4}
               barBorderRadius={4}
               stackData={stackBarData}/>

              <View style = { styles.recentMoodsContainer }>
                {
                  differentMoods.map(mood=>(
                    <View
                     style = {styles.recentMoodItem}
                     key = { generateRandomString({ length: 16 }) }>
                      <MoodIconBuilder 
                        moodName={MoodTypes[mood] as MoodTypesString} 
                        iconBorderStyle={{borderWidth: 3}}
                        buttonSize={50}
                        backgroundColor = {"#EEEEEE"}/>

                      <Text style={{textAlign: `center`}}>
                        {moodCounts[MoodTypes[mood] as MoodTypesString]}
                      </Text>

                      <Text style = { [styles.recentMoodsLabel, {backgroundColor: MoodTypesColor[MoodTypes[mood] as keyof typeof MoodTypesColor]}] }>
                        {MoodTypes[mood]}
                      </Text>
                    </View>
                  )) 
                }
              </View>
            </View>
          }
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  chartView: {
    width: screenWidth,
    backgroundColor: `#F7FAF8`,
    borderWidth: 1,
    padding: 5
  },
  chartTypeSelectionContainer: {
    width: 120,
    flexDirection: `row`,
    justifyContent: `space-evenly`,
  },
  buttonText: {
    paddingHorizontal: 3,
    textAlign: `center`
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  recentMoodsContainer: {
    marginTop: 8,
    flexDirection: `row`,
    justifyContent: `center`,
    flexWrap: `wrap`
  },

  recentMoodsItemText: {
    textAlign: `center`,
  },

  recentMoodItem: {
    marginHorizontal: 10
  },

  recentMoodsLabel: {
    marginTop: 6,
    marginBottom: 20,
    textAlign: `center`,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 2,
    fontWeight: `500`
  }
});
