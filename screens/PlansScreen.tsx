import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ScrollView, Text, View, StyleSheet} from "react-native"
import {Button, ErrorScreen, LoadingScreen, RatioList} from "@components";
import {ColorScheme} from "@constants";
import {PaymentMethod, Plan, PlanService} from '@services'
import {initStripe} from '@stripe/stripe-react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppStackParamList} from '@navigation';
import {useQuery} from '@tanstack/react-query';

export default function PlanScreen() {
  const [selectedPlan, setSelectedPlan] = useState<Plan>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>();

  const [processStatus, setProcessStatus] = useState<{isLoading: boolean, isError: boolean, error?: Error}>({isLoading: false, isError: false});

  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();

  const paymentMethods = useMemo(PlanService.getAllPaymentMethods, []);

  useEffect(() => {
    setProcessStatus({isLoading: true, isError: false});
    PlanService.getStripeKeyAsync()
      .then((data) => {
        initStripe({publishableKey: data.key});
        setProcessStatus({isLoading: false, isError: false});
      })
      .catch((error) => {
        setProcessStatus({isLoading: false, isError: true, error});
      });
  }, []);

  const planQuery = useQuery({
    queryKey: ['plans'],
    queryFn: PlanService.getAllAsync
  });

  if (planQuery.isLoading || processStatus.isLoading) {
    return (
      <LoadingScreen />
    )
  }

  if (planQuery.isError || processStatus.isError) {
    return (
      <ErrorScreen />
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: ColorScheme.primaryColor}}>
      <ScrollView style={styles.container}>
        <View style={{margin: 8}}>
          <Text style={styles.title}>Các gói</Text>
          <RatioList
            data={planQuery.data.plans}
            style={{marginTop: 8}}
            tintColor={ColorScheme.themeColor}
            itemContent={({item}) => (
              <>
                <Text style={styles.label}>{item.name}</Text>
                <Text style={styles.text}>{`Giá: ${item.price}đ`}</Text>
                <Text style={styles.text}>{item.description}</Text>
              </>
            )}
            onSelectionChanged={({item}) => {
              setSelectedPlan(item);
            }}
          />
        </View>
        <View style={{margin: 8}}>
          <Text style={styles.title}>Phương thức thanh toán</Text>
          <RatioList
            data={paymentMethods}
            style={{marginTop: 8}}
            tintColor={ColorScheme.themeColor}
            itemContent={({item}) => (
              <>
                <Text style={styles.label}>{item.name}</Text>
              </>
            )}
            onSelectionChanged={({item}) => {
              setSelectedPaymentMethod(item);
            }}
          />
        </View>
      </ScrollView>
      <View style={{padding: 8}}>
        <Button
          style={{marginVertical: 2, backgroundColor: ColorScheme.themeColor}}
          onPress={() => selectedPlan ? navigation.navigate("CardPaymentScreen", { plan_id: selectedPlan.id }) : null}
          title={'Đến thanh toán'}
          titleStyle={{fontWeight: 'bold'}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorScheme.primaryColor
  },
  card: {
    marginVertical: 4,
    padding: 8,
    borderRadius: 8,
    backgroundColor: ColorScheme.secondaryColor,
    flexDirection: 'row'
  },
  title: {
    color: ColorScheme.textColor,
    fontSize: 18,
    fontWeight: 'bold'
  },
  label: {
    color: ColorScheme.textColor,
    fontSize: 16,
    fontWeight: 'bold'
  },
  text: {
    color: ColorScheme.textColor
  }
})
