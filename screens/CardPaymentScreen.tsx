import {CardField, useStripe} from '@stripe/stripe-react-native';
import {View} from 'react-native';
import {Button, LoadingScreen} from '@components';
import {useState} from 'react';
import {ColorScheme} from '@constants';
import {PlanService} from '@services';
import {RouteProp, StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {AppStackParamList} from '@navigation';

export default function PaymentScreen() {
  const stripe = useStripe();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<AppStackParamList, 'CardPaymentScreen'>>();

  const {plan_id} = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const payment = async () => {
    setIsLoading(true);

    let resp = await stripe.createToken({type: 'Card'});

    if (!resp.token) {
      setIsLoading(false);
      alert(resp.error.message);
      return;
    }
    
    try {
      await PlanService.paymentByCardAsync({ plan_id: plan_id, token: resp.token.id})
    } catch (error) {
      setIsLoading(false);
      alert('Thanh toán không thành công! Vui lòng thử lại');
      return
    }


    setIsLoading(false);
    alert('Thanh toán thành công!');
    navigation.dispatch(StackActions.pop(2));
  }

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

  return (
      <View style={{flex: 1, backgroundColor: ColorScheme.primaryColor}}>
        <View style={{flex: 1}}>
          <CardField
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: ColorScheme.secondaryColor,
              textColor: ColorScheme.textColor,
              cursorColor: ColorScheme.themeColor,
              textErrorColor: ColorScheme.themeColor,
              placeholderColor: ColorScheme.placeHolderColor,
              borderRadius: 8,
            }}
            style={{
              height: 46,
              margin: 8,
              borderRadius: 8,
            }}
          />
        </View>
        <Button
          style={{margin: 8, backgroundColor: ColorScheme.themeColor}}
          onPress={payment}
          title={'Thanh toán'}
          titleStyle={{fontWeight: 'bold'}}
        />
      </View>
  );
}
