export type SessionStackParamList = {
  SignUpScreen: undefined;
  SignInScreen: undefined;
  SendVerificationCodeScreen: undefined;
  ResetPasswordScreen: {email: string; code: string;};
};

export type AppStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  BooksScreen: {
    title?: string;
    params: {
      category_ids?: string;
      sort_by?: string;
      query?: string;
      free?: boolean;
    }
  };
  BookScreen: {
    title?: string;
    book_id: number;
  };
  ReadingScreen: {
    title?: string;
    book_id: number;
    chapter_id: number;
  };
  SearchingScreen: undefined;
  ChangePasswordScreen: undefined;
  ChangeInfoScreen: undefined;
  FavoritedBooksScreen: undefined;
  PlansScreen: undefined;
  CardPaymentScreen: { plan_id: number };
  NotificationScreen: undefined;
  PurchaseHistoryScreen: undefined;
  FeedbackScreen: undefined;
  PolicyAndTermScreen: undefined;
  IntroductionScreen: undefined;
  ReadingOptionScreen: undefined;
};
